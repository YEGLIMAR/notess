// src/componentes/Modal.jsx
import React from 'react';
import '../estilos/Modal.css';

const Modal = ({ show, onClose, note, onSave, onChangeTitle, onChangeContent }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ backgroundColor: note.color }}>
        <h2>Edit Note</h2>
        <input
          type="text"
          value={note.title}
          onChange={(e) => onChangeTitle(e.target.value)}
        />
        <textarea
          value={note.content}
          onChange={(e) => onChangeContent(e.target.value)}
        />
        <button onClick={onSave}>Save</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;