import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function Resultado() {
    const { idQuiz } = useParams();
    const [pontuacao, setPontuacao] = useState(0);

    useEffect(() => {
        const carregarResultado = async () => {
            try {
                const response = await api.get(`/quiz/resultado/${idQuiz}`);
                setPontuacao(response.data.pontuacao);
            } catch (error) {
                console.error('Erro ao buscar resultado:', error);
            }
        };
        carregarResultado();
    }, [idQuiz]);

    return (
        <div className="container mt-5">
            <h1>Resultado Final</h1>
            <p>Sua pontuação: {pontuacao}</p>
        </div>
    );
}

export default Resultado;