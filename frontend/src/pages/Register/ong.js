import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';

import logoImg from '../../assets/logo.png';
import './style.css';

const CreateOng = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');

  const[selectedUf, setSelectedUf] = useState('0');
  const[selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    axios.get('http://www.geonames.org/childrenJSON?geonameId=3469034').then(response => {
      const ufs = response.data.map(uf => uf.SO3166_2);
  
      setUf(ufs);
    })
  }, []);

  useEffect(() => {
    if(selectedUf === '0') return;

    axios.get(`http://www.geonames.org/childrenJSON?geonameId=3469034`)
  })
}



export default function RegisterHero() {
  return(
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG</p>

          <Link className="back-link" to="">
          <FiArrowLeft size={16} color="#F9A826"/>
            Entrar na plataforma
          </Link>
        </section>

        <form>
          <input type="text" placeholder="Nome da ONG"/>
          <input type="email" placeholder="E-mail"/>
          <input placeholder="WhatsApp" />

          <div className="input-group">
            
            <input placeholder="Cidade" />
          </div>
        </form>
      </div>
    </div>  
  );
}