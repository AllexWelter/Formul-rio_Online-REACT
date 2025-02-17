import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

function Quiz() {
    const { idQuiz } = useParams();
    const [pergunta, setPergunta] = useState(null);
    const [alternativaSelecionada, setAlternativaSelecionada] = useState(null);
    const [numeroPergunta, setNumeroPergunta] = useState(1);
    const [totalPerguntas, setTotalPerguntas] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        carregarPergunta();
    }, [numeroPergunta]);

    const carregarPergunta = async () => {
        try {
            const response = await api.get(`/perguntas/${numeroPergunta}`);
            console.log('Resposta da API:', response.data); // Para depuração
    
            if (response.data && response.data.pergunta && Array.isArray(response.data.alternativas)) {
                setPergunta({
                    ...response.data.pergunta,
                    alternativas: response.data.alternativas
                });
                setTotalPerguntas(response.data.totalPerguntas);
            } else {
                console.error('Erro: Estrutura da resposta inesperada.', response.data);
            }
        } catch (error) {
            console.error('Erro ao carregar pergunta:', error);
        }
    };

    const responder = async () => {
        if (!alternativaSelecionada) return;
        try {
            await api.post('/enviar', {
                id_quiz: idQuiz,
                respostas: [{ id_pergunta: pergunta.id_pergunta, id_alternativa: alternativaSelecionada }]
            });
            if (numeroPergunta < totalPerguntas) {
                setNumeroPergunta(numeroPergunta + 1);
                setAlternativaSelecionada(null);
            } else {
                navigate(`/resultado/${idQuiz}`);
            }
        } catch (error) {
            console.error('Erro ao enviar resposta:', error);
        }
    };

    return (
        <div className="container mt-5">
            {pergunta ? (
                <div>
                    <h2>{pergunta.texto}</h2>
                    {Array.isArray(pergunta.alternativas) && pergunta.alternativas.length > 0 ? (
                        pergunta.alternativas.map(alt => (
                            <button key={alt.id_alternativa} onClick={() => setAlternativaSelecionada(alt.id_alternativa)}>
                                {alt.texto}
                            </button>
                        ))
                    ) : (
                        <p>Alternativas não disponíveis.</p>
                    )}
                    <button onClick={responder} disabled={!alternativaSelecionada}>Próxima</button>
                </div>
            ) : (
                <p>Carregando pergunta...</p>
            )}
        </div>
    );
}

export default Quiz;
