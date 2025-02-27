import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import '../estilos/Bloc.css';
import Modal from './Modal';
import logo from '../assets/logito.png';
import { Button, IconButton, Typography, AppBar, Toolbar, Container, Card, CardContent, CardActions, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Grid2 } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';


export const Bloc = ({ usuario }) => {
  const [notas, setNotas] = useState([]);
  const [notasEliminadas, setNotasEliminadas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [showTrash, setShowTrash] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [viewMode, setViewMode] = useState('list');
  const [showViewOptions, setShowViewOptions] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();
  const colors = ['#ffcc80', '#80deea', '#a5d6a7', '#ffab91', '#ce93d8', '#fff59d'];

  // Función para guardar las notas en el localStorage
  const guardarNotasEnLocalStorage = (notasActuales) => {
    const usuarioActual = auth.currentUser;
    if (usuarioActual) {
      const notasString = JSON.stringify(notasActuales);
      localStorage.setItem(`notas_${usuarioActual.email}`, notasString);
      console.log('Notas guardadas en localStorage para el usuario:', usuarioActual.email);
    }
  };

  // Función para cargar las notas desde el localStorage
  const cargarNotasDesdeLocalStorage = () => {
    const usuarioActual = auth.currentUser;
    if (usuarioActual) {
      const notasGuardadas = localStorage.getItem(`notas_${usuarioActual.email}`);
      if (notasGuardadas) {
        setNotas(JSON.parse(notasGuardadas));  // Cargar las notas en el estado
        console.log('Notas cargadas desde localStorage para el usuario:', usuarioActual.email);
      }
    }
  };

  // Cargar las notas cuando el usuario esté autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        cargarNotasDesdeLocalStorage();  // Cargar las notas del localStorage al iniciar sesión
      } else {
        setIsAuthenticated(false);
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  // Función para añadir nuevas notas
  const addNotes = () => {
    const newNote = {
      id: notas.length + 1,
      title: `Nota ${notas.length + 1}`,
      content: `Contenido de la nota ${notas.length + 1}`,
      color: colors[notas.length % colors.length],
    };
    const nuevasNotas = [...notas, newNote];
    setNotas(nuevasNotas);
    guardarNotasEnLocalStorage(nuevasNotas);  // Guardar las notas actualizadas en localStorage
  };

  const toggleViewOptions = () => {
    setShowViewOptions(!showViewOptions);
  };
  

  const openModal = (note) => {
    setCurrentNote(note);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentNote(null);
  };

  const saveNote = () => {
    const notasActualizadas = notas.map((nota) => (nota.id === currentNote.id ? currentNote : nota));
    setNotas(notasActualizadas);
    guardarNotasEnLocalStorage(notasActualizadas);  // Guardar las notas actualizadas
    closeModal();
  };

  const handleTitleChange = (title) => {
    setCurrentNote({
      ...currentNote,
      title,
    });
  };

  const handleContentChange = (content) => {
    setCurrentNote({
      ...currentNote,
      content,
    });
  };

  const handleViewChange = (mode) => {
    setViewMode(mode); // Cambia la vista
    setShowViewOptions(false); // Cierra el menú
  };
  

  const deleteNote = (id) => {
    const noteToDelete = notas.find((nota) => nota.id === id);
    setNotasEliminadas([...notasEliminadas, noteToDelete]);
    const notasRestantes = notas.filter((nota) => nota.id !== id);
    setNotas(notasRestantes);
    guardarNotasEnLocalStorage(notasRestantes);  // Guardar las notas después de eliminar
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/login');
    }).catch((error) => {
      alert('Error al cerrar sesión. Por favor, intenta nuevamente.');
    });
  };

  const handleShowTrash = () => {
    setShowTrash(true);
  };

  const handleShowNotes = () => {
    setShowTrash(false);
  };

  if (!isAuthenticated) {
    return null; // O un mensaje de carga
  }

  return (
    <div className='bloc-container'>
      <div className='bloc-sidebar'>
        <div className='logo-container'>
          <img src={logo} alt="Logo" className= "logo"/>
        </div>
        <h3>Menú</h3>
        <ul>
          <li onClick={handleShowNotes}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368">
              <path d="M120-240v-80h480v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z"/>
            </svg>
            All notes
          </li>
          <li onClick={handleShowTrash}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" fill="#5f6368">
              <path d="M3 6h18v2H3V6zm0 4h18v12c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V10zm6 0v10h6V10H9z" />
            </svg>
            Trash
          </li>
          <li onClick={handleLogout}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" fill="#5f6368">
              <path d="M10 17l5-5-5-5v3H4v4h6v3z" />
              <path d="M20 4h-4v2h4v12h-4v2h4c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" />
            </svg>
            Log out
          </li>
        </ul>
        <Button variant="contained" color= "inherit" startIcon={<AddIcon />} onClick={addNotes}> Add Note
        </Button>
        </div>

      <div className='main-content'>
        <header className='header'>
          <div className='logo'>

            <h1>My Notes</h1>
          </div>
          <div className='view-dropdown'>
            <button onClick={toggleViewOptions}> View v</button>

            {showViewOptions && (
              <div className='view-options'>
                <button onClick={() => setViewMode('list')}> Lista</button>
                <button onClick={() => setViewMode('grid')}> Tarjetas</button>
                <button onClick={() => setViewMode('mini')}> Miniaturas</button>
              
              </div>
              )}
            </div>
    
              
              <div className='user-info'>
                  {usuario ? <p>Bienvenido/a, {usuario.email}</p> : null}
                </div>
        </header>

        <div className= {`notes ${viewMode}`}>
      
      <Grid2 container spacing={2}>
        {showTrash ? (
          notasEliminadas.map((nota) => (
            <Grid2 item xs={15} sm={3} md={4} key={nota.id}>
              <Card style={{ backgroundColor: nota.color }}>
                <CardContent>
                  <Typography variant="h6">{nota.title}</Typography>
                  <Typography variant="body2">{nota.content}</Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))
        ) : (
          notas.map((nota) => (
            <Grid2 item xs={12} sm={6} md={4} key={nota.id}>
              <Card style={{ backgroundColor: nota.color }}>
                <CardContent>
                  <Typography variant="h6">{nota.title}</Typography>
                  <Typography variant="body2">{nota.content}</Typography>
                </CardContent>
                <CardActions>
                  <IconButton onClick={() => deleteNote(nota.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid2>
          ))
        )}
          </Grid2>
        </div>
      </div>

      {currentNote && (
        <Modal
          open={showModal}
          onClose={closeModal}
          note={currentNote}
          onSave={saveNote}
          onChangeTitle={handleTitleChange}
          onChangeContent={handleContentChange}
        />
      )}  
    </div>
  );
}


export default Bloc;
