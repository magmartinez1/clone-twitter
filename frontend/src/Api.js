const API_URL = 'http://localhost:3000';

const token = localStorage.getItem('token');

export const login = async (user_name, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ user_name, password }),
        });
        if (!response.ok) {
            throw new Error('Error al iniciar sesión');
        }

        const data = await response.json();
        console.log(data);
        if(data.token){
          localStorage.setItem('token', data.token);
          console.log('Token guardado:', data.token);
        } else{
            console.error('Error al guardar el token');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};

export const register = async (userData) => {
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });
        if (!response.ok) {
            throw new Error('Error en el registro');
        }

        const data = await response.json();
        if(data.token){
          localStorage.setItem('token', data.token);
          console.log('Token guardado:', data.token);
        } else{
            console.error('Error al guardar el token');
        }
        console.log('Registro completado:', data);
        return data;
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        throw error;
    }
};

export const createTweet = async (tweet) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/tweets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ tweet }),
      });
      const data = await response.json();
      // TODO verificar que devuelve el servidor antes de usar el dato.
      console.log(data);
      const newTweetId = data.tweet.id_tweet;
      const newTweetResponse = await fetch(`${API_URL}/tweets/${newTweetId}`);
      const newTweetData = await newTweetResponse.json();

      console.log('Tweet recién creado:', newTweetData);

        return data;
    } catch (error) {
      console.error('Error al crear el tweet:', error);
      throw error;
    }
  };

  export const createComment = async (comment) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ comment }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al crear el comentario:', error);
      throw error;
    }
  };

