import styled from "styled-components"
import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"

export default function SeatsPage({setFinal}) {
    const [cadeira, setCadeira] = useState([])
    const [posterURL, setPosterURL] = useState('')
    const [title, setTitle] = useState('')
    const [escolheLugar, setEscolhe] = useState([]);
    const [dateTime, setDateTime] = useState('')


    function handleClick(seat) {
        if (seat.backgroundColor === "#FBE192") {
            alert("Esse assento não está disponível");
        } else if (seat.isAvailable) {
            const newEscolhe = [...escolheLugar];
            const index = newEscolhe.indexOf(seat.id);
            if (index > -1) {
                newEscolhe.splice(index, 1);
            } else {
                newEscolhe.push(seat.id);
            }
            setEscolhe(newEscolhe);
            setIds(newEscolhe);
        } else {
            alert("Esse assento não está disponível");
        }
    }


    const { idSessao } = useParams()
    useEffect(() => {
        const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
        const promise = axios.get(URL)
        promise.then(res => {
            setCadeira(res.data.seats)
            setTitle(res.data.movie.title)
            setPosterURL(res.data.movie.posterURL)
            setDateTime(res.data.day.weekday + ' - ' + res.data.name)
            console.log(res.data)
            console.log(res.data.movie.title)
        })
        promise.catch(err => console.log(err.data))
    }, [idSessao])
    console.log(title)
    //espaço para pedidos :
    const [ids, setIds] = useState([]);
    const [name, setName] = useState('')
    const [cpf, setCpf] = useState('')



    function pedido() {
        const urlPedido = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"
        const informacoes = { name, cpf, ids }
        axios.post(urlPedido, informacoes)
            .then(res => {
                alert("pedido enviado ")
                console.log(res.data)
                setFinal({
                    name:name,
                    cpf:cpf
                })
            })
            .catch(err => console.log(err))
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer >
                {cadeira.map(seat => (
                    <SeatItem
                        data-test="seat"
                        key={seat.id}
                        isAvailable={seat.isAvailable}
                        onClick={() => handleClick(seat)}
                        style={{
                            backgroundColor: escolheLugar.includes(seat.id) ? "#1AAE9E" : null,
                        }}
                    >
                        {seat.name}
                    </SeatItem>
                ))}
            </SeatsContainer>


            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle style={{ backgroundColor: "#1AAE9E", borderColor: "#0E7D71" }} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle isAvailable />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle style={{ backgroundColor: "#FBE192", borderColor: "#F7C52B" }} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                <form onSubmit={pedido}>
                    <FormContainer htmlFor="Nome" >
                        Nome do Comprador:
                        <input data-test="client-name" id="NomeUsuario" placeholder="Digite seu nome..." required
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </FormContainer>
                    <FormContainer htmlFor="cpf" >
                        CPF do Comprador:
                        <input data-test="client-cpf"
                            id="Cpf" placeholder="Digite seu CPF..." required
                            value={cpf}
                            onChange={e => setCpf(e.target.value)}
                        />
                    </FormContainer>
                    <Link to={`/sucesso`} >
                        <button data-test="book-seat-btn" type="button" onClick={pedido}>Reservar Assento(s)</button>
                    </Link>
                </form>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={posterURL} alt="poster" />
                </div>
                <div>
                    <p>{title}</p>
                    <p>{dateTime}</p>
                </div>
            </FooterContainer>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.label`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
   border: 1px solid ${({ isAvailable }) => isAvailable ? '#7B8B99' : 'gray'};
  background-color: ${({ isAvailable }) => isAvailable ? "#C3CFD9" : "#FBE192"};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`
const SeatItem = styled.div`
    border: 1px solid ${({ isAvailable }) => isAvailable ? '#808F9D' : '#F7C52B'};
  background-color: ${({ isAvailable }) => isAvailable ? "#C3CFD9" : "#FBE192"};
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`