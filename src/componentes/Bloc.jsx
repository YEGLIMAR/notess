import React from 'react';
import '../estilos/Bloc.css';

export const Bloc = ({ usuario }) => {
  const [notas, setNotas] = React.useState([
     { id: 1, title: 'Test', content: 'Holaaaaaaaaaaaaa', color: '#ffeb3b', date: '12/12/2021' },
     { id: 2, title: 'Test', content: 'Holaaaaaaaaaaaaa', color: '#b39ddb', date: '12/12/2021' },
    { id: 3, title: 'Test', content: 'Holaaaaaaaaaaaaa', color: '#90caf9', date: '12/12/2021' },
  ]);

  const colors=['#']

  //metodo para agregar notas

  const addNotes = () => {
    const newNote = {
      id: notas.length + 1,
      title: `Nota ${notas.length + 1}`,
      content: 'Contenido de la nota ${notas.length + 1}',
      color: '#ffcc80',
    };
    setNotas([...notas, newNote]);
  };

  return (
    <div className='bloc-container'>
      <div className='bloc-sidebar'>
        <h3>Menú</h3>
        <ul>
          <li>All notes</li>
          <li>Trash</li>
          <li>Log out</li>
        </ul>
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
          <h2>My Notes</h2>
          <div className='notes-grid'>
            {notas.map((nota) => (
              <div key={nota.id} className='note' style={{ backgroundColor: nota.color }}>
                <div className="note-header">
                  <span className="note-date">{nota.date}</span>
                  <h3>{nota.title}</h3>
                  <span className="edit-icon">✏️</span>
                </div>
                <p>{nota.content}</p>
              </div>
            ))}
          </div>
          </div>
      </div>
    </div>
  );
};
