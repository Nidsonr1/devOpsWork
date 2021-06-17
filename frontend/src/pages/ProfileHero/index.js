import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower } from 'react-icons/fi';

import api from '../../services/api';

import './style.css'

import logoImg from '../../assets/undraw_super_woman_dv0y.svg'; 

export default function ProfileOng() {
  const [ongs, setOngs] = useState([]);
  
  const heroName = localStorage.getItem('heroName')
  
  const history = useHistory();

  useEffect(() => {
    api.get('/ongs').then(response => {
      setOngs(response.data)
    })
  }, []);

  async function handleGoToOng(id, ongName) {
    localStorage.setItem('ongId', id);
    localStorage.setItem('ongName', ongName);

    history.push('/ong_cases')
  }

  async function handleLogout() {
    localStorage.clear();

    history.push('/');
  }

  return(
    <div className="profile-container">
      <header>
        <div className="welcome">
          <img src={logoImg} alt="BeTheHero"/>
          <span>Bem-vindo(a), {heroName}</span>
        </div>
       

      
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#F9A826" />
        </button>
      </header>
      
      <h1>Ongs Cadastradas na Aplicação</h1>

      <ul>
      
        {ongs.map(ongs => (
          <Link onClick={() => handleGoToOng(ongs.id, ongs.name)}>
           
            <li key={ongs.id}>
            <strong>ONG:</strong>
            <p>{ongs.name}</p>

            <div className="contatoOng">
              <div className="contatoEmail">
                <strong>Email</strong>
                <p>{ongs.email}</p>
            </div>
              
              <div className="contatoWhatsapp">
                <strong>Whatsapp</strong>
                <p>{ongs.whatsapp}</p>
              </div>
            </div>
              
            <strong>Endereço</strong>
            <p>{ongs.city} - {ongs.uf}</p>
         </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}