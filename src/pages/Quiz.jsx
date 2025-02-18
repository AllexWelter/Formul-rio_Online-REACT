import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Card, Button, Container } from 'react-bootstrap';

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

        // Adiciona a resposta ao array de respostas
        const novaResposta = {
            id_pergunta: pergunta.id_pergunta,
            id_alternativa: alternativaSelecionada
        };
        
        const novasRespostas = [...respostas, novaResposta];
        setRespostas(novasRespostas);

        // Se for a última pergunta, envia todas as respostas
        if (numeroPergunta >= totalPerguntas) {
            try {
                await api.post('/enviar', {
                    id_quiz: idQuiz,
                    respostas: novasRespostas
                });
                navigate(`/resultado/${idQuiz}`);
            } catch (error) {
                console.error('Erro ao enviar respostas:', error);
            }
        } else {
            // Se não for a última, avança para a próxima pergunta
            setNumeroPergunta(numeroPergunta + 1);
            setAlternativaSelecionada(null);
        }
    };

    return (
        <Container className="mt-5">
            {pergunta ? (
                <Card>
                    <Card.Header>
                        <h4>Pergunta {numeroPergunta} de {totalPerguntas}</h4>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{pergunta.texto}</Card.Title>
                        <div className="d-grid gap-2 mt-3">
                            {pergunta.alternativas.map(alt => (
                                <Button
                                    key={alt.id_alternativa}
                                    variant={alternativaSelecionada === alt.id_alternativa ? "primary" : "outline-primary"}
                                    onClick={() => setAlternativaSelecionada(alt.id_alternativa)}
                                    className="text-start"
                                >
                                    {alt.texto}
                                </Button>
                            ))}
                        </div>
                        <Button 
                            className="mt-4"
                            onClick={responder}
                            disabled={!alternativaSelecionada}
                        >
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
