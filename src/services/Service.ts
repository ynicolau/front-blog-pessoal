import axios from 'axios';
import { url } from 'inspector';


export const api = axios.create({ 
    baseURL:'https://bp13.herokuapp.com/'})

    export const cadastroUsuario = async (url: any, dados: any, setDados: any) => {
        const resposta = await api.post(url, dados)
        setDados(resposta.data.token)
    }

    export const login = async (url: any, dados: any, setDados: any) => {
        const resposta = await api.post(url, dados)
        setDados(resposta.data.token)
    }