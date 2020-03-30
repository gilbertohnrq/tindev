//importa o axios
import axios from "axios";

//cria uma variavel com uma função e dentro da função uma configuração p/ criação de uma baseURL
const api = axios.create({
  baseURL: "http://localhost:3333" //cria uma base para a URL já que sempre será utilizada essa base antes das rotas /main por ex.
});

//exporta a api daqui de dentro
export default api;
