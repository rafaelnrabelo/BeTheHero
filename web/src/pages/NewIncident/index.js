import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css'
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');
    const ongId = localStorage.getItem('ongId');
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('/incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })
            history.push('/profile');
        } catch(err) {
            alert('Erro no cadastro, tente novamente')
        }
    }

    return (
        <div className="new-incident">
            <div className="content">
                <section>
                        <img src={logoImg} alt="BeTheHero" />
                        <h1>Cadastrar novo caso</h1>
                        <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                        <Link className="link" to="/profile">
                            <FiArrowLeft size={16} color="#e02041" />
                            Voltar para Home
                        </Link>
                </section>
                <form onSubmit={handleSubmit}>
                    <input onChange={e => setTitle(e.target.value)} value={title} required placeholder="Título do caso" />
                    <textarea onChange={e => setDescription(e.target.value)} value={description} required placeholder="Descrição" />
                    <input onChange={e => setValue(e.target.value)} value={value} required placeholder="Valor em reais" />
                    
                    <button type="submit" className="button">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}

export default NewIncident;