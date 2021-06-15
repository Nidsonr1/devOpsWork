import React from 'react';
import { FiArrowLeft } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import './style.css';

const Modal = ({ id = 'modal', onClose = () => {}, children }) => {
  const handleOutsideClick = (e) => {
    if(e.target.id === id) onClose();
  }

  return(
    <div className="modal" onClick={handleOutsideClick}>
      <div className="container">
        <button onClick={onClose} className="back-button" type="button">
            <FiArrowLeft size={20} color="#F9A826" />
        </button>
      
        <div className="container-register">
          <button className="button">
            <Link 
              to="/cadastrarOng"
              style={{ marginTop: 50 }}>
              <p>Cadastrar Nova ONG</p>
            </Link>
          </button>
        
          <button className="button">
            <Link 
              to="/cadastrarHeroi"
              style={{ marginTop: 50 }}>
              <p>Cadastrar Novo Herói</p>
            </Link>
          </button>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default Modal;