import React, { useState, useEffect } from 'react';

function UserProfile({ id_user }) {
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`/users/${id_user}`);
        if (!response.ok) {
          throw new Error('No se pudo obtener el perfil del usuario');
        }
        const userData = await response.json();
        setUserProfile(userData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserProfile();
  }, [id_user]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userProfile) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div>
      <h2>Perfil de Usuario</h2>
      <p>ID: {userProfile.id_user}</p>
      <p>Nombre de usuario: {userProfile.username}</p>
      <p>Nombre: {userProfile.name}</p>
      <p>Apellido: {userProfile.surname}</p>
      <p>Email: {userProfile.email}</p>
    </div>
  );
}

export default UserProfile;