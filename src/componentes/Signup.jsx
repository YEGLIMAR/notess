import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appFirebase from '../credenciales';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import '../estilos/Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(appFirebase);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/login');
    } catch (error) {
      setError(error.message);
      alert('Error al registrarse. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className='signup-container'>
      <h2>Registro</h2>
      {error && <p className='error'>{error}</p>}
      <form className='signup-form' onSubmit={handleSignup}>
        <div className='input-group'>
          <label htmlFor='email'>Correo electrónico</label>
          <input
            type='email'
            id='email'
            placeholder='Ingresa tu correo electrónico'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className='input-group'>
          <label htmlFor='password'>Contraseña</label>
          <input
            type='password'
            id='password'
            placeholder='Ingresa tu contraseña'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type='submit' className='signup-btn'>Registrarse</button>
      </form>
    </div>
  );
};

export default Signup;