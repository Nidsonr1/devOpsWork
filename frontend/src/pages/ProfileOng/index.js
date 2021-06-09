import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './style.css'

import logoImg from '../../assets/logo.png'; 

export default function ProfileOng() {
  const [cases, setCases] = useState([]);
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName')
  
  const history = useHistory();

  useEffect(() => {
    api.get('/ongs/cases', {
      headers: {
        Authorization: ongId,
      }
    }).then(response => {
      setCases(response.data)
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`case/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });
      setCases(cases.filter(cases => cases.id !== id));
    } catch (error) {
      alert(error.response.data.error);
    }
  }

  async function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="BeTheHero"/>
        <span>Bem vinda, {ongName}</span>

        <Link 
          className="button"
          to="/novoCaso"
          style={{ paddingTop: 10 }}>
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#F9A826" />
        </button>
      </header>
      
      <h1>Casos Cadastrados</h1>

      <ul>
        {cases.map(cases => (
          <li key={cases.id}>
          <strong>CASO:</strong>
          <p>{cases.title}</p>

          <strong>DESCRIÇÃO:</strong>
          <p>{cases.description}</p>

          <strong>VALOR:</strong>
          <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL'}).format(cases.value)}</p>

          <button data-cy="button-trash" onClick={() => handleDeleteIncident(cases.id)} type="button">
            <FiTrash2 size={20} color="#A8A8B3" />
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}