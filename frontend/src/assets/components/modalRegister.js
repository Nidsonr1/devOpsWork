import React from 'react';
import { FiX } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import './style.css';

const Modal = ({ id = 'modal', onClose = () => {}, children }) => {
  
  const handleOutsideClick = (e) => {
    if(e.target.id === id) window.location.href='/';
  }

  return(
    <div className="modal" onClick={handleOutsideClick}>
      <div className="container">

        <FiX size={36} color="#F9A826"  className="back-button" onClick={() => {window.location.href='/'}}/>
      
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