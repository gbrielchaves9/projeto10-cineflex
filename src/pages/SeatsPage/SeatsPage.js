import styled from "styled-components"
import { useEffect, useState } from "react"
import axios, { Axios } from "axios"
import { useParams } from "react-router-dom"
//import { Link } from "react-router-dom"

export default function SeatsPage() {
  const [cadeira, setCadeira] = useState([])
  const [posterURL, setPosterURL] = useState('')
  const [title, setTitle] = useState('')

  const { idSessao } = useParams()
  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${idSessao}/seats`
    const promise = axios.get(URL)
    promise.then(res => {
      setCadeira(res.data.seats)
      setTitle(res.data.movie.title)
      setPosterURL(res.data.movie.posterURL)
      console.log(res.data)
    })
    promise.catch(err => console.log(err.data))
  }, [idSessao])

  //espaço para pedidos :

  //const [ids, setIds] = useState('')
  const [name, setName] = useState('')
  const [cpf, setCpf] = useState('')

  function pedido() {
    alert("pedido ok")
    const urlPedido = "https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many"
    const informacoes = {  name, cpf }
    const promise = axios.post(urlPedido, informacoes)
  }
  return (
    <PageContainer>
      Selecione o(s) assento(s)

      <SeatsContainer>
        {cadeira.map(seat => (
          <SeatItem key={seat.id} isAvailable={seat.isAvailable} >
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
          <FormContainer htmlFor="Nome">
            Nome do Comprador:
            <input id="NomeUsuario" placeholder="Digite seu nome..." required
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </FormContainer>
          <FormContainer htmlFor="cpf">
            CPF do Comprador:
            <input id="Cpf" placeholder="Digite seu CPF..." required 
              value={cpf}
              onChange={e => setCpf(e.target.value)}
              />
          </FormContainer>
          <button type="submit">Reservar Assento(s)</button>
        </form>
      </FormContainer>

      <FooterContainer data-test="footer">
        <div>
          <img src={posterURL} alt="poster" />
        </div>
        <div>
          <p>{title}</p>
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
     // Essa cor deve mudar
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