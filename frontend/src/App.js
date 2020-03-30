//importa o react
import React from "react";

//importa o arquivo app.css para estilização do projeto
import "./App.css";

//importa as rotas do arquivo routes p/ acessar as paginas
import Routes from "./routes";

//é um componente (função) que retorna um conteúdo HTML
//aqui dentro pode ser colocado qualquer HTML que ele vai ser renderizado dentro da div id: root
//inclusive é possivel importar outros componentes aqui dentro
function App() {
  return <Routes />; //o componente é tratado como uma tag do html
}

export default App;
