import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiLogIn} from 'react-icons/fi'; // icon como componente

// usar o axios
import api from '../../services/api';

import './styles.css';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import { useState } from 'react';

export default function Logon(){
    // usando Estados
    // no change de cada input, uma arrow function altera o valor das variáveis
    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try {
            const response = await api.post('sessions', {id});
            
            // salvar dados da ONG no local storage do navegador
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (error) {
            alert('Erro no login, tente novamente.')
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>
                    <input type="text" placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/> 
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}