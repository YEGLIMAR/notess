import { useState } from "react";  
import { Link, useNavigate } from "react-router-dom";
import '../estilos/Signup.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { updateProfile } from "firebase/auth";


export const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate= useNavigate();
    const auth = getAuth();


    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await updateProfile(user, { displayName: name });
            console.log('Registro exitoso:', { name, email, password });
            alert('Registro exitoso');
            navigate('/login');

        } catch (error) {
            setError(error.message);

        }
    };

return (
    <div className="signup-container">
        <div className="signup-form-container">
            <h2>Crea tu cuenta</h2>
            <form className="signup-form" onSubmit={handleSignup}>
                <div className="input-group">
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <small className="password-hint">La contraseña debe tener al menos 6 caracteres</small>
                </div>
                <div className="input-group">
                    <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirmar Contraseña"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
                <p>¿Ya tienes cuenta? <Link to="/login">Iniciar sesión</Link></p>
            </form>
        </div>
    </div>
);
}