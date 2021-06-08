import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import './style.css';

import logoImg from '../../assets/logo.png';
import heroesImg from '../../assets/LoginImage.png';
import api from '../../services/api';

export default function Logon() {

  const[id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try { 
      const response = await api.post('/ongs/login', {id});

      localStorage.setItem('ongId', response.data.id)
      localStorage.setItem('ongName', response.data.name)

      
      history.push('/homeOng');
    } catch (Error) {
      alert('Falha ao tentar Logar')
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>
          
          <input 
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button type="submit" className="button">Entrar</button>

          <Link className="back-link" to="">
          <FiLogIn size={16} color="#F9A826"/>
            Entrar como Herói
          </Link>

          <Link className="back-link" to="cadastrarOng">
            <FiLogIn size={16} color="#F9A826"/>
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="heroes" />
    </div>
  );
}

