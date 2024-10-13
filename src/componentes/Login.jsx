import React from 'react'

export const Login = () => {
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
            <button type='submit'>Login</button>
        </form>
</div>
</div>
  )
}
