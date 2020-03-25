import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import './styles.css'
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';

function Profile() {
    const history = useHistory();
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');
    const [incidents, setIncidents] = useState([]);

    useEffect(() => {
        if(!localStorage.getItem('ongId')) {
            history.push('/');
        }
    },[history]);

    useEffect(() => {
        async function loadIncidents() {
            const response = await api.get('/profile', {
                headers: {
                    Authorization: ongId
                }
            })
            setIncidents(response.data);
        }
        loadIncidents();
    },[ongId]);

    async function handleDelete(id) {
        if(window.confirm("Tem certeza que deseja deletar o caso?")) {
            try {
                api.delete(`/incidents/${id}`, {
                    headers: {
                        Authorization: ongId
                    }
                })
                setIncidents(incidents.filter(incident => incident.id !== id));
            } catch(err) {
                alert('Erro ao Deletar caso');
            }
        }
    }

    function handleLogout() {
        localStorage.clear();

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="BeTheHero" />
                <span>Bem vinda, <strong>{ongName}</strong></span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>
            <h1>Casos cadastrados</h1>
            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>CASO:</strong>
                        <p>{incident.title}</p>
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                        <button onClick={() => handleDelete(incident.id)} type="button">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Profile;