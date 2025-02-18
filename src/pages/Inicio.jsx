import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Container, Card, Form, Button } from 'react-bootstrap';
import '../styles/Inicio.css';


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
        <div className="inicio-container">
            
                <Card className="inicio-card">
                    <Card.Body>
                        <h1 className="text-center">Bem-vindo ao Quiz</h1>
                        <Form>
                            <Form.Group className="mb-3">
                                <Form.Control type="text" placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                            </Form.Group>
                            <Button className="w-100" onClick={iniciarQuiz}>Iniciar</Button>
                        </Form>
                    </Card.Body>
                </Card>
            
        </div>
    );
}

export default Inicio;