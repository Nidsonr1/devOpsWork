import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import api from '../../services/api';

import logoImg from '../../assets/undraw_be_the_hero_ssr2.svg';
import './style.css';

export default function RegisterHero() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  
  async function handleLogin(event) {
    event.preventDefault();

    const data = {
      email,
      password
    };

    try {
      const response = await api.post('user/login', data);
      console.log(response.data.name)
      localStorage.setItem('heroName', response.data.name)
      alert(`${response.data.msg}`);
      
      history.push('/homeHero');
    } catch (error) {
      const msg = error.response.data.error;
      alert(msg)
    }
  }

  return(
    <div className="register-container">
      <div className="content">
        <form onSubmit={handleLogin}>
          <h1>Login</h1>
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
          
          <section>
            <img src={logoImg} alt="" style={{ width: 220, marginLeft: 50, marginTop: 50 }}/>
            <p>Entre na aplicação e venha ajudar as ONGs que necessitam de um Héroi</p>

            <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#F9A826"/>
              Logar como ONG
            </Link>
          </section>
      </div>
    </div>  
  );
}