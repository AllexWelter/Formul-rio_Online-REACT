import { use, useState } from "react"
import { Button, Card, Container, Form } from "react-bootstrap"


const questao = [{
    questao: "Pergunta 1",
    alternativas: ["Alternativa 1", "Alternativa 2", "Alternartiva 3", "Alternativa 4"]
}]


function Questionario() {

    const [perguntaAtual, setPerguntaAtual] = useState(0)
    const [respostaSelecionada, setRespostaSelecionada] = useState()

    const irProxima = () => {
        if (perguntaAtual < questao.length - 1) {
            setPerguntaAtual(perguntaAtual + 1)
            setRespostaSelecionada(null)
        }
    }

    const irAnterior = () => {
        if (perguntaAtual > 0) {
            setPerguntaAtual(perguntaAtual - 1)
            setPerguntaAtual(null)
        }
    }

    
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