const API_URL = 'http://localhost:3000';

export const login = async (username, password) => {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const data = await response.json();
        if(data.token){
          localStorage.setItem('token', data.token);
        } else{
            console.error('Error al guardar el token');
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};

export const register = async (completarVariables) => {
    alert(completarVariables);
};

export const createTweet = async (tweet) => {
    try {
      const response = await fetch(`${API_URL}/tweets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tweet }),
      });
      const data = await response.json();
      const newTweetId = data.tweet.id;
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
      const response = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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