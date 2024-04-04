import React, { useState } from 'react';
import { createComment } from '../../Api.js';

const CrearComentario = () => {
  const [comment, setComment] = useState('');

  const handleCrearComentario = async (event) => {
    event.preventDefault();
    try {
      const response = await createComment(comment);
      console.log('Respuesta del servidor (comentario):', response);
      
    } catch (error) {
      console.error('Error al crear el comentario:', error);
    }
  };

  return (
    <div>
      <h2>Crear Comentario</h2>
      <form onSubmit={handleCrearComentario}>
        <div>
          <label>Comentario:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            cols={50}
          />
        </div>
        <button type="submit">Crear Comentario</button>
      </form>
    </div>
  );
};

export default CrearComentario;