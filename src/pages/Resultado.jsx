import { Button, Card, CardTitle, Container } from "react-bootstrap"
import { Questionario } from "./Questionario"


function Resultado({pontuacao}) {

    return(
        <Container className="d-flex justify-content-center align-items-center" style={{minHeight: "100vh"}}>
            <Card className="text-center" style={{width: "18rem"}}>
                <Card.Body>
                    <CardTitle>Parabéns</CardTitle>
                    <Card.Text>
                        Oi Fulano, seu resultado foi {pontuacao}/10 !
                    </Card.Text>
                    <Button variant="warning" onClick={() => {{/*//logica para enviar por email*/}}}> 
                        ENVIAR POR EMAIL    
                    </Button>
                </Card.Body>
            </Card>
        </Container>
    )
}

export {Resultado}