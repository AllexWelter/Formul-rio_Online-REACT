import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Card, Button, Container } from 'react-bootstrap';
import '../styles/Quiz.css';

function Quiz() {
    const { idQuiz } = useParams();
    const [pergunta, setPergunta] = useState(null);
    const [alternativaSelecionada, setAlternativaSelecionada] = useState(null);
    const [numeroPergunta, setNumeroPergunta] = useState(1);
    const [totalPerguntas, setTotalPerguntas] = useState(0);
    const [respostas, setRespostas] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        carregarPergunta();
    }, [numeroPergunta]);

    const carregarPergunta = async () => {
        try {
            const response = await api.get(`/perguntas/${numeroPergunta}`);
            if (response.data && response.data.pergunta) {
                setPergunta({
                    ...response.data.pergunta,
                    alternativas: response.data.alternativas
                });
                setTotalPerguntas(response.data.totalPerguntas);
            }
        } catch (error) {
            console.error('Erro ao carregar pergunta:', error);
        }
    };

    const responder = async () => {
        if (!alternativaSelecionada) return;

        const novasRespostas = [...respostas, { id_pergunta: pergunta.id_pergunta, id_alternativa: alternativaSelecionada }];
        setRespostas(novasRespostas);

        if (numeroPergunta >= totalPerguntas) {
            try {
                await api.post('/enviar', { id_quiz: idQuiz, respostas: novasRespostas });
                navigate(`/resultado/${idQuiz}`);
            } catch (error) {
                console.error('Erro ao enviar respostas:', error);
            }
        } else {
            setNumeroPergunta(numeroPergunta + 1);
            setAlternativaSelecionada(null);
        }
    };

    return (
        <Container className="quiz-container">
            {pergunta ? (
                <Card className="quiz-card">
                    <Card.Header>
                        <h4>Pergunta {numeroPergunta} de {totalPerguntas}</h4>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{pergunta.texto}</Card.Title>
                        <div className="d-grid gap-2 mt-3">
                            {pergunta.alternativas.map(alt => (
                                <Button
                                    key={alt.id_alternativa}
                                    variant={alternativaSelecionada === alt.id_alternativa ? "success" : "outline-success"}
                                    onClick={() => setAlternativaSelecionada(alt.id_alternativa)}
                                >
                                    {alt.texto}
                                </Button>
                            ))}
                        </div>
                        <Button className="mt-4 w-100" onClick={responder} disabled={!alternativaSelecionada}>
                            {numeroPergunta === totalPerguntas ? 'Finalizar' : 'Próxima'}
                        </Button>
                    </Card.Body>
                </Card>
            ) : (
                <p>Carregando pergunta...</p>
            )}
        </Container>
    );
}

export default Quiz;