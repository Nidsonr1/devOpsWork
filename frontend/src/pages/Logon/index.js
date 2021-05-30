import React from 'react';
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

import './style.css';

import logoImg from '../../assets/logo.png';
import heroesImg from '../../assets/LoginImage.png';

export default function Logon() {
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="" />
        <form>
          <h1>Faça seu login</h1>
          <input placeholder="Entrar como ONG" />
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

