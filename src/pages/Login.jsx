import React, { useState } from 'react';
import { Col, Container, Row, Button, Form, Image, FormGroup, FormLabel, InputGroup, FormControl, Alert } from "react-bootstrap"
import image from "../assets/images/image.png"
import "../assets/css/Login.css"

const Login = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação simples
        if (!username || !email) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        // Aqui você pode adicionar a lógica para autenticar o usuário
        console.log('Nome do usuário:', username);
        console.log('Email:', email);

        // Limpar os campos após o envio
        setUsername('');
        setEmail('');
        setError('');
    };

    return (
     <div className={"login-container"}>        
        <Container>
            <Row style={{ marginTop: "13%" }}>
                <Col md={1}></Col>
                <Col md={10}>
                    <Row>
                        <Col md={6} className={"mt-5 login-form box"} style={{ padding: "0%" }}>
                            <Image className='image'
                                src={image}
                                width="100%"
                                height="100%"
                            />
                        </Col>
                        <Col md={6} className={"mt-5 login-form box"} >
                            <h2>Login Formulário Online</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formUsername" className="mb-3">
                                    <Form.Label>Nome do Usuário</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Digite seu nome de usuário"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formEmail" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Digite seu email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Iniciar
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    </div>
    );
};

export { Login }