import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import api from '../../../services/api';

import logoImg from '../../../assets/undraw_super_woman_dv0y.svg';
import './style.css';

export default function RegisterHero() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  
  async function handleRegister(event) {
    event.preventDefault();

    const data = {
      name,
      email,
      password
    };

    try {
      const response = await api.post('user/register', data)
      alert(`${response.data.msg}`);
      
      // history.push('/');
    } catch (error) {
      const msg = error.response.data.error;
      alert(msg)
    }
  }

  return(
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="" style={{ width: 220, marginLeft: 50, marginTop: 50 }}/>
          <p>Faça seu cadastro, entre na plataforma e ajude ONG como um verdadeiro Héroi</p>

          <Link className="back-link" to="/">
          <FiArrowLeft size={16} color="#F9A826"/>
            Entrar na plataforma
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <h1>Cadastro um Héroi</h1>
          <input 
            type="text" 
            placeholder="Nome de Herói"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input 
            type="email" 
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input 
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="button"type="submit">Cadastrar</button>
        </form>
      </div>
    </div>  
  );
}