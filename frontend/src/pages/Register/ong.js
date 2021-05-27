import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import axios from 'axios';

import logoImg from '../../assets/logo.png';
import './style.css';

const CreateOng = () => {
  const[formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
});
  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);
  const[selectedUf, setSelectedUf] = useState('0');
  const[selectedCity, setSelectedCity] = useState('0');

  useEffect(() => {
    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/').then(response => {
        // const ufs = response.data;
        console.log(response.data.sigla)

        setUfs(ufs);
    })
}, []);
};

export default function RegisterHero() {
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

        <form>
          <input type="text" placeholder="Nome da ONG"/>
          <input type="email" placeholder="E-mail"/>
          <input placeholder="WhatsApp" />

          <div className="input-group">
            <select 
              name="uf" 
              id="uf" 
              style={{ width: 100, marginTop: 9, marginRight: 4 }}>
              <option value="0">UF</option>
            </select>
            <select name="" id="" style={{ marginTop: 9 }}>
              <option value="">Cidade</option>
            </select>
          </div>
        </form>
      </div>
    </div>  
  );
}