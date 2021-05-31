import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './style.css';

import logoImg from '../../../assets/logo.png';

export default function Profile() {
  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Logo"/>
        <span>Bem Vinda, APACMock</span>

        <Link className="button" to="/ong/newCase">Cadastrar novo Caso</Link>
        <button type="button">
          <FiPower size={18} color="#F9A826" />
        </button>

        <h1>Casos Cadastrados</h1>

        <ul>
          <li>
            <strong>CASO:</strong>
            <p>Title</p>
            
            <strong>DESCRIÇÃO:</strong>
            <p>description</p>

            <strong>VALOR:</strong>
            <p>value</p>

          <button>
            <FiTrash2 size={20} color="#A8A8B3" />
          </button>
          </li>
        </ul>
      </header>
    </div>
  );
}