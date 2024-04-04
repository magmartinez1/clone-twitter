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
        return data;
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        throw error;
    }
};

export const register = async (completarVariables) => {
    alert(completarVariables);
}