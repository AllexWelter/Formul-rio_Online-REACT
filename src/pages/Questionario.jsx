import { use, useState } from "react"
import { Button, Card, Container, Form } from "react-bootstrap"

function Questionario() {

    const [perguntaAtual, setPerguntaAtual] = useState(0)
    const [respostaSelecionada, setRespostaSelecionada] = useState()





    
    return(
        <Container className="mt-5">
            <Card>
                <Card.Body>
                    <Card.Title>
                        {}
                    </Card.Title>
                    <Form>

                    </Form>
                    <div className="mt-3">
                        <Button variant="secondary">
                          Anterior  
                        </Button>
                        <Button variant="primary">
                            Próxima
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}

export{Questionario}