import React, { useState } from 'react';
import { createTweet } from '../../Api.js'; 

const CrearTweet = () => {
  const [tweet, setTweet] = useState('');

  const handleCrearTweet = async (event) => {
    event.preventDefault();
    try {
      const response = await createTweet(tweet);
      console.log('Respuesta del servidor:', response);
    } catch (error) {
      console.error('Error al crear el tweet:', error);
    }
  };

  return (
    <div>
      <h2>Crear Tweet</h2>
      <form onSubmit={handleCrearTweet}>
        <div>
          <label>Tweet:</label>
          <textarea
            value={tweet}
            onChange={(e) => setTweet(e.target.value)}
            rows={4}
            cols={50}
          />
        </div>
        <button type="submit">Crear Tweet</button>
        <button type="submit">Crear Comentario</button>
      </form>
    </div>
  );
};

export default CrearTweet;