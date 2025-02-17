import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Inicio() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const iniciarQuiz = async () => {
        try {
            const response = await api.post('/iniciar', { nome, email });
            navigate(`/quiz/${response.data.id_quiz}`);
        } catch (error) {
            console.error('Erro ao iniciar quiz:', error);
        }
    };

    return (
        <div className="container mt-5">
            <h1>Bem-vindo ao Quiz</h1>
            <input type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={iniciarQuiz}>Iniciar</button>
        </div>
    );
}

export default Inicio;