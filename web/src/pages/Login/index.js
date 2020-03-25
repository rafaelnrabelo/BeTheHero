import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css'
import herosImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

function Login() {
    const [id, setId] = useState('');
    const history = useHistory();

    useEffect(() => {
        if(localStorage.getItem('ongId')) {
            history.push('/profile');
        }
    })

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await api.post('/sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        } catch(err) {
            alert('Falha no Login, tente novamente');
        }
    }

    return (
        <div className="login-container">
            <section className="form">
            <img src={logoImg} alt="BeTheHero" />
            <form onSubmit={handleLogin}>
                <h1>Faça seu login</h1>
                <input onChange={e => setId(e.target.value)} value={id} required placeholder="Sua ID" />
                <button className="button" type="submit">Entrar</button>

                <Link className="link" to="/register">
                    <FiLogIn size={16} color="#e02041" />
                    Não tenho cadastro
                </Link>
            </form>
            </section>

            <img src={herosImg} alt="Heroes" />
        </div>
    );
}

export default Login;