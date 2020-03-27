import React, { useState } from 'react';
import { Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident(){
    const ongId = localStorage.getItem('ongId');
    
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    async function handleNewIncident(e) {
        e.preventDefault(); // previne o comportamento padrão do submit form

        const data = {
            title, description, value
        };

        try {
            // envia a requisição com os dados
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId // passa o ongId no header (Authoriozation)
                }
            });

            // para usar uma template string (variável dentro do texto) ${} troca-se '' por ``
            alert('Caso cadastrado com sucesso');

            history.push('/profile'); // envia o usuário para a rota raiz
        } catch (error) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return(
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt=""/>
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolvê-lo.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041"/> 
                        Voltar para home
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)}/>
                    <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                    <input type="number" placeholder="Valor em R$" value={value} onChange={e => setValue(e.target.value)}/>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}