import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../../services/api';

import './style.css';

import logoImg from '../../../assets/logo.png'; 

export default function Profile() {
  const [incidents, setIncidents] = useState([]);
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const history = useHistory();

  useEffect(() => {
    api.get('profile', {
      headers: {
        Authorization: ongId,

      }
    }).then(response => {
      setIncidents(response.data)
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          Authorization: ongId,
        }
      });
      setIncidents(incidents.filter(incidents => incidents.id !== id));
    } catch (error) {
      alert('Error deleting case, try again.');
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

        <Link data-cy="button-newIncident" className="button" to="/novoCaso">Cadastrar novo caso</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#F9A826" />
        </button>
      </header>
      
      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map(incidents => (
          <li key={incidents.id}>
          <strong>CASO:</strong>
          <p>{incidents.title}</p>

          <strong>DESCRIÇÃO:</strong>
          <p>{incidents.description}</p>

          <strong>VALOR:</strong>
          <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL'}).format(incidents.value)}</p>

          <button data-cy="button-trash" onClick={() => handleDeleteIncident(incidents.id)} type="button">
            <FiTrash2 size={20} color="#A8A8B3" />
          </button>
        </li>
        ))}
      </ul>
    </div>
  );
}