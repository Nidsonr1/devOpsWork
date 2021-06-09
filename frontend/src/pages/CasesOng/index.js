import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './style.css'

import logoImg from '../../assets/logo.png'; 

export default function ProfileOng() {
  const [incidents, setIncidents] = useState([]);
  const ongId = localStorage.getItem('ongId');
  const ongName = localStorage.getItem('ongName');
  const heroName = localStorage.getItem('heroName');

  useEffect(() => {
    api.get(`/ong/${ongId}`).then(response => {
      setIncidents(response.data)
    });

  }, [ongId])

  return(
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="BeTheHero"/>
        <span>Bem-vindo(a), {heroName}</span>

        <Link to="/homeHero" type="button">
          <button type="button">
            <FiArrowLeft size={18} color="#F9A826" />
          </button>
        </Link>
         
        
      </header>
      
      <h1>Casos da {ongName}</h1>

      <ul>
        {incidents.map(incidents => (
          <li key={incidents.id}>
          <strong>CASO:</strong>
          <p>{incidents.title}</p>

          <strong>DESCRIÇÃO:</strong>
          <p>{incidents.description}</p>

          <strong>VALOR:</strong>
          <p>{Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL'}).format(incidents.value)}</p>

        </li>
        ))}
      </ul>
    </div>
  );
}