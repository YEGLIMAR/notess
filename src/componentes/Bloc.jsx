import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import '../estilos/Bloc.css';
import Modal from './Modal';

export const Bloc = ({ usuario }) => {
  const [notas, setNotas] = useState([]);
  const [notasEliminadas, setNotasEliminadas] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [showTrash, setShowTrash] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const colors = ['#ffcc80', '#80deea', '#a5d6a7', '#ffab91', '#ce93d8', '#fff59d'];

  useEffect(() => {
    const savedNotas = JSON.parse(localStorage.getItem('notas')) || [];
    const savedNotasEliminadas = JSON.parse(localStorage.getItem('notasEliminadas')) || [];
    setNotas(savedNotas);
    setNotasEliminadas(savedNotasEliminadas);
  }, []);

  useEffect(() => {
    localStorage.setItem('notas', JSON.stringify(notas));
  }, [notas]);

  useEffect(() => {
    localStorage.setItem('notasEliminadas', JSON.stringify(notasEliminadas));
  }, [notasEliminadas]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const addNotes = () => {
    const newNote = {
      id: notas.length + 1,
      title: `Nota ${notas.length + 1}`,
      content: `Contenido de la nota ${notas.length + 1}`,
      color: colors[notas.length % colors.length],
    };
    setNotas([...notas, newNote]);
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
    setNotas(notas.map(nota => nota.id === currentNote.id ? currentNote : nota));
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

  const deleteNote = (id) => {
    const noteToDelete = notas.find(nota => nota.id === id);
    setNotasEliminadas([...notasEliminadas, noteToDelete]);
    setNotas(notas.filter(nota => nota.id !== id));
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
        <h3>Menú</h3>
        <ul>
          <li onClick={handleShowNotes}>All notes</li>
          <li onClick={handleShowTrash}>Trash</li>
          <li onClick={handleLogout}>Log out</li>
        </ul>
        <button className='add-note' onClick={addNotes}>+ Add Notes</button>
      </div>

      <div className='main-content'>
        <header className='header'>
          <div className='logo'>
            <h1>My Notes</h1>
          </div>
          <div className='user-info'>
            {usuario ? <p>Bienvenido, {usuario.email}</p> : <p>Bienvenido, Invitado</p>}
          </div>
        </header>
        <div className='notes'>
          <div className='notes-grid'>
            {showTrash ? (
              notasEliminadas.map((nota) => (
                <div
                  key={nota.id}
                  className='note'
                  style={{ backgroundColor: nota.color }}
                >
                  <div className="note-header">
                    <h3>{nota.title}</h3>
                  </div>
                  <p>{nota.content}</p>
                </div>
              ))
            ) : (
              notas.map((nota) => (
                <div
                  key={nota.id}
                  className='note'
                  style={{ backgroundColor: nota.color }}
                  onDoubleClick={() => openModal(nota)}
                >
                  <div className="note-header">
                    <h3>{nota.title}</h3>
                    <div className="note-actions">
                      <button onClick={() => deleteNote(nota.id)}>🗑️</button>
                    </div>
                  </div>
                  <p>{nota.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      {currentNote && (
        <Modal
          show={showModal}
          onClose={closeModal}
          note={currentNote}
          onSave={saveNote}
          onChangeTitle={handleTitleChange}
          onChangeContent={handleContentChange}
        />
      )}
    </div>
  );
};