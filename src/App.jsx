import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './estilos/Login.css';
import './estilos/Signup.css';
import './estilos/Bloc.css';
import appFirebase from './credenciales';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import { Login } from './componentes/Login';
import Signup from './componentes/Signup';
import { Bloc } from './componentes/Bloc';

const auth = getAuth(appFirebase);

function App() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (usuario) => {
      if (usuario) {
        setUsuario(usuario);
      } else {
        setUsuario(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/bloc" element={usuario ? <Bloc usuario={usuario} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;