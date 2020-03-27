import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom'; // useHistory permite navegação entre urls
import {FiArrowLeft} from 'react-icons/fi'; // icon como componente

// usar o axios
import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register(){
    // usando Estados
    // no change de cada input, uma arrow function altera o valor das variáveis
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory();

    // await só pode ser usado com async
    async function handleRegister(e){
        e.preventDefault(); // previne o comportamento padrão do submit form

        const data = {
            name, email, whatsapp, city, uf
        };

        try {
            // envia a requisição com os dados
            const response = await api.post('ongs', data);

            // para usar uma template string (variável dentro do texto) ${} troca-se '' por ``
            alert(`Seu ID de acesso é ${response.data.id}`);

            history.push('/'); // envia o usuário para a rota raiz
        } catch (error) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt=""/>
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041"/> 
                        Já tenho cadastro
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Nome da ONG"/>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="E-mail"/>
                    <input type="text" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="WhatsApp"/>

                    <div className="input-group">
                        <input type="text" value={city} onChange={e => setCity(e.target.value)} placeholder="Cidade"/>
                        <input type="text" value={uf} onChange={e => setUf(e.target.value)} placeholder="UF" style={{width: 80}}/>
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}