import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { Card, Button, Container } from 'react-bootstrap';
import '../styles/Pergunta.css';

function Pergunta({ onResponder }) {
    const { idQuiz } = useParams();
    const [pergunta, setPergunta] = useState(null);
    const [alternativaSelecionada, setAlternativaSelecionada] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarPergunta();
    }, []);

    const carregarPergunta = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/perguntas/${idQuiz}`);
            if (response.data && response.data.pergunta) {
                setPergunta({
                    ...response.data.pergunta,
                    alternativas: response.data.alternativas
                });
            }
        } catch (error) {
            console.error('Erro ao carregar pergunta:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container className="pergunta-container">
            <Card className="pergunta-card">
                {loading ? (
                    <p>Carregando pergunta...</p>
                ) : (
                    <>
                        <Card.Header>
                            <h4>{pergunta.texto}</h4>
                        </Card.Header>
                        <Card.Body>
                            <div className="d-grid gap-2 mt-3">
                                {pergunta.alternativas.map(alt => (
                                    <Button
                                        key={alt.id_alternativa}
                                        variant={alternativaSelecionada === alt.id_alternativa ? "success" : "outline-primary"}
                                        onClick={() => setAlternativaSelecionada(alt.id_alternativa)}
                                    >
                                        {alt.texto}
                                    </Button>
                                ))}
                            </div>
                            <Button className="mt-4 w-100" onClick={() => onResponder(alternativaSelecionada)} disabled={!alternativaSelecionada}>
                                Responder
                            </Button>
                        </Card.Body>
                    </>
                )}
            </Card>
        </Container>
    );
}

export default Pergunta;