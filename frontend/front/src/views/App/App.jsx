
import './App.css'

export default function App() {
  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form>
        <div>
          <label>Nombre de usuario:</label>
          <input
            type="text"
          />
        </div>
        <div>
          <label>Contraseña:</label>
          <input
            type="password"
          />
        </div>
        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
}

