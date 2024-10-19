import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { appFirebase} from '../credenciales';
import '../estilos/Login.css';
import logo from '../assets/logito.png';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth(appFirebase);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/bloc');
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        setError('Usuario no encontrado');
        alert('Usuario no encontrado. Por favor, verifica tu correo electrónico.');
      } else if (error.code === 'auth/wrong-password') {
        setError('Contraseña incorrecta');
        alert('Contraseña incorrecta. Por favor, intenta nuevamente.');
      } else {
        setError('Error al iniciar sesión');
        alert('Error al iniciar sesión. Por favor, intenta nuevamente.');
      }
    }
  };

  return (
    <div className='login-container'>
      <div className='left-section'>
        <div className='logo-container'></div>
        <img src={logo} alt="Logo" className= "logo"/>
        <h2>La mejor aplicación para tus</h2>
        <h1>NOTAS</h1>
      </div>
      <div className='right-section'>
        <h2>¡Hola!<span>👋</span></h2>
        {error && <p className='error'>{error}</p>}
        <form className='login-form' onSubmit={handleLogin}>
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
          <button type='submit' className='login-btn'>Login</button>
        </form>
        <p>¿Aún no tienes cuenta? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};