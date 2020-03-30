//importa a biblioteca do react
import React from "react";

//importa a biblioteca do react dom
//uma lib que lida com a DOM do html
import ReactDOM from "react-dom";
import App from "./App";

//renderiza o que está dentro da div root
//é executado uma unica vez dentro da aplicação pra cadastrar qual é o componente global da aplicação/ o primeiro componente da aplicação
//após isso podemos criar novos componentes
ReactDOM.render(<App />, document.getElementById("root"));
