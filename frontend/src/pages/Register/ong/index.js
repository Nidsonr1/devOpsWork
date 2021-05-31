import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';
import api from '../../../services/api';

import logoImg from '../../../assets/logo.png';
import './style.css';

export default function RegisterHero() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [city, setCity] = useState([]);
  const [uf, setUf] = useState([]);
  const [selectedUf, setSelectedUf] = useState('0');
  const [selectedCity, setSelectedCity] = useState('0');

  const history = useHistory();
  
  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
      const ufInitials = response.data.map(uf => uf.sigla)

      setUf(ufInitials)
    })
  }, []);

  useEffect(() => {
    if(selectedUf === '0') {
      return;
    }

    axios.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
      const cityNames = response.data.map(city => city.nome)

      setCity(cityNames);
    })
  }, [selectedUf])

  function handleselectedUf(event) {
    const uf = event.target.value;
    setSelectedUf(uf);
  } 

  function handleselectedCity(event) {
    const city = event.target.value;

    setSelectedCity(city);
  }
  async function handleRegister(event) {
    event.preventDefault();

    const uf = selectedUf;
    const city = selectedCity;

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };

    try {
      const response = await api.post('ongs/register', data);
      
      alert(`Seu ID de Acesso: ${response.data.id}`);
      

      history.push('/');
    } catch (error) {
      alert('Erro no cadastro, tente novamente.');
    }
  }

  return(
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="" />
          <h1>Cadastro</h1>
          <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos de sua ONG</p>

          <Link className="back-link" to="/">
          <FiArrowLeft size={16} color="#F9A826"/>
            Entrar na plataforma
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            type="text" 
            placeholder="Nome da ONG"
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
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <select 
              name="uf" 
              id="uf" 
              style={{ width: 100, marginTop: 9, marginRight: 4 }}
              value={selectedUf}
              onChange={handleselectedUf}
            >
              <option value="0">UF</option>
              {uf.map(uf => (
                <option key={uf} value={uf} >{uf}</option>
              ))}
            </select>
            <select 
              name="city" 
              id="city" 
              style={{ marginTop: 9 }}
              value={selectedCity}
              onChange={handleselectedCity}
            >
              <option value="">Cidade</option>
              {city.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <button className="button"type="submit">Cadastrar</button>
        </form>
      </div>
    </div>  
  );
}