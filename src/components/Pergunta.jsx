import { Card, Form } from 'react-bootstrap';

const Pergunta = ({ pergunta, onResponder }) => {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Card.Title>{pergunta.texto}</Card.Title>
                <Form>
                    {pergunta.alternativas.map((alt) => (
                        <Form.Check
                            key={alt.id_alternativa}
                            type="radio"
                            name={`pergunta-${pergunta.id_pergunta}`}
                            label={alt.texto}
                            onChange={() => onResponder(pergunta.id_pergunta, alt.id_alternativa)}
                        />
                    ))}
                </Form>
            </Card.Body>
        </Card>
    );
};

export default Pergunta;