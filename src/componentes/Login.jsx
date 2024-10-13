import React from 'react'
import { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom'
import appFirebase from '../credenciales';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import '../estilos/Login.css';




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
            if(error.code=== 'auth/user-not-found'){
                setError('Usuario no encontrado');
            }else if(error.code=== 'auth/wrong-password'){
                setError('Contraseña incorrecta');
        }else{
            setError('Error al iniciar sesión');
            alert('Error al iniciar sesión');
        }
    }
};


  return (
    <div className='login-container'>
        <div className='left-section'>
            <h2>La mejor aplicación para tus</h2>
            <h1>NOTAS</h1>
    </div>
    <div className='right-section'>
        <h2>¡Hola!<span>👋</span></h2>
        <form className='login-form'>
            <div className='input-group'>
                <label htmlFor='email'>Correo electrónico</label>
                <input type='email' id='email' placeholder='Ingresa tu correo electrónico' required/>
            </div>
            <div className='input-group'>
                <label htmlFor='password'>Contraseña</label>
                <input type='password' id='password' placeholder='Ingresa tu contraseña' required/>
            </div>
            <button type='submit' className='login-btn'>Login</button>
        </form>
        <p>¿Aún no tienes cuenta? <Link to="/signup">Sign Up</Link></p>
    </div>
</div>
);
};
