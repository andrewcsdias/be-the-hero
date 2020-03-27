// useEffect dispara uma função em um determinado "momento" da vida do componente
import React, {useState, useEffect} from 'react';
import { Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Profile(){
    // acessar os dados da ONG no local storage do navegador
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    // objeto de incidents
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    // 1º paramêtro: função a ser executada
    // 2º paramêtro: array de dependência da execução, [] para executar apenas uma vez
    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId // passa o ongId no header (Authoriozation)
            }
        }).then(response =>{
            setIncidents(response.data.incidents); // preenche o objeto com o resultado da requisição
        })
    }, [ongId]); // é recomendado colocar as varíaveis usadas no useEffect como dependência

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId 
                }
            }).then(response => {
                alert('Caso deletado.')
            });

            // atualiza o objeto removendo o caso deletado
            setIncidents(incidents.filter(incident => incident.id !== id));
        } catch (error) {
            alert('Erro ao deletar incidente.');
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo"/>
                <span>Bem vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
                {
                    incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>Caso:</strong>
                            <p>{incident.title}</p>
                            <strong>Descrição:</strong>
                            <p>{incident.description}</p>
                            <strong>Valor</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                                <FiTrash2 size={20} color="a8a8b3" />
                            </button>
                        </li>
                    )) // percorrer o array
                }
            </ul>
        </div>
    );
}