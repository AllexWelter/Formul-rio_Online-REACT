import { use, useState } from "react"
import { Button, Card, Container, Form, FormCheck } from "react-bootstrap"
import { Resultado } from "./Resultado"


const questoes = [{
    questao: "Pergunta 1",
    alternativas: ["Alternativa 1", "Alternativa 2", "Alternartiva 3", "Alternativa 4"],
    respostaCorreta: 0
},
{
    questao: "Pergunta 2",
    alternativas: ["Alternativa 1", "Alternativa 2", "Alternartiva 3", "Alternativa 4"],
    respostaCorreta: 1
},
{
    questao: "Pergunta 3",
    alternativas: ["Alternativa 1", "Alternativa 2", "Alternartiva 3", "Alternativa 4"],
    respostaCorreta: 2
},
{
    questao: "Pergunta 4",
    alternativas: ["Alternativa 1", "Alternativa 2", "Alternartiva 3", "Alternativa 4"],
    respostaCorreta: 3
},
{
    questao: "Pergunta 5",
    alternativas: ["Alternativa 1", "Alternativa 2", "Alternartiva 3", "Alternativa 4"],
    respostaCorreta: 4
},


]

function Questionario() {

    const [perguntaAtual, setPerguntaAtual] = useState(0)
    const [respostaSelecionada, setRespostaSelecionada] = useState(null)
    const [pontuacao, setPontuacao] = useState(null)
    const [respostas, setRespostas] = useState([])

    const irProxima = () => {
        if (perguntaAtual < questoes.length - 1) {
            setPerguntaAtual(perguntaAtual + 1)
            setRespostaSelecionada(null)
        }
    }

    const irAnterior = () => {
        if (perguntaAtual > 0) {
            setPerguntaAtual(perguntaAtual - 1)
            setRespostaSelecionada(null)
        }
    }

    const finalizarQuestionario = () => {
        let pontuacaoFinal = 0
        respostas.forEach((resposta, index) => {
            if (resposta === questoes[index].respostaCorreta) {
                pontuacaoFinal += 1
            }
        })
        setPontuacao(pontuacaoFinal)
    }

    //merda está aqui!
    const handleResposta = (index) => {
        setRespostaSelecionada(index)
        const novasRespostas = [...respostas]
        novasRespostas[perguntaAtual] = index
        setRespostas(novasRespostas)
    }

    if (pontuacao !== null) {
        return <Resultado pontuacao={pontuacao} />
    }


    return (
        <Container className="mt-5">
            <Card>
                <Card.Body>
                    <Card.Title>
                        {questoes[perguntaAtual].questao}
                    </Card.Title>
                    <Form>
                        {questoes[perguntaAtual].alternativas.map((alt, index) => (
                            <FormCheck
                                key={index}
                                type="radio"
                                id={`alternativa-${index}`}
                                label={alt}
                                name="alternativas"
                                checked={respostaSelecionada === index}
                                onChange={() => setRespostaSelecionada(index)}
                            />
                        ))}
                    </Form>
                    <div className="mt-3">
                        <Button variant="secondary"
                            onClick={irAnterior}
                            disabled={perguntaAtual === 0}>
                            Anterior
                        </Button>
                        {perguntaAtual < questoes.length - 1 ? (
                            <Button variant="warning"
                                onClick={irProxima}
                                disabled={perguntaAtual === questoes.length - 1}>
                                Próxima
                            </Button>
                        ) : (
                            <Button variant="success"
                                onClick={finalizarQuestionario}>
                                Finalizar
                            </Button>
                        )}
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}

export { Questionario }