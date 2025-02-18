import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { buscarResultado, enviarEmailResultado } from '../services/api';
import { Container, Card, Button, Alert } from 'react-bootstrap';

function Resultado() {
    const { idQuiz } = useParams();
    const [pontuacao, setPontuacao] = useState(0);
    const [error, setError] = useState(null);
    const [emailEnviado, setEmailEnviado] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarResultado();
    }, [idQuiz]);

    const carregarResultado = async () => {
        try {
            setLoading(true);
            const response = await buscarResultado(idQuiz);
            setPontuacao(response.pontuacao);
            setError(null);
        } catch (error) {
            setError('Erro ao carregar resultado. Por favor, tente novamente.');
            console.error('Erro ao buscar resultado:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEnviarEmail = async () => {
        try {
            await enviarEmailResultado(idQuiz);
            setEmailEnviado(true);
        } catch (error) {
            setError('Erro ao enviar email. Por favor, tente novamente.');
            console.error('Erro ao enviar email:', error);
        }
    };

    if (loading) {
        return (
            <Container className="mt-5">
                <p>Carregando resultado...</p>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <Card>
                <Card.Header>
                    <h2>Resultado Final</h2>
                </Card.Header>
                <Card.Body>
                    {error ? (
                        <Alert variant="danger">{error}</Alert>
                    ) : (
                        <>
                            <h3>Sua pontuação: {pontuacao}</h3>
                            <div className="mt-4">
                                <Button 
                                    onClick={handleEnviarEmail}
                                    disabled={emailEnviado}
                                    variant="primary"
                                >
                                    {emailEnviado ? 'Email Enviado!' : 'Enviar resultado por email'}
                                </Button>
                            </div>
                            {emailEnviado && (
                                <Alert variant="success" className="mt-3">
                                    Resultado enviado com sucesso para seu email!
                                </Alert>
                            )}
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
}

export default Resultado;