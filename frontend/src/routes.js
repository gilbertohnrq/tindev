import React from "react";

//BrowserRouter é o roteamento no browser, a rota vai ficar com ex: /devs/contatos
//E importa a Rota que é o Route
import { BrowserRouter, Route } from "react-router-dom";

import Login from "./pages/Login";
import Main from "./pages/Main";

export default function Routes() {
  return (
    //quando não há rota informada se utiliza o path="/"
    //e o componente de rota é informado em seguida
    //o react-router-dom não verifica se o caminho é exatamente  o
    //mesmo informado no path="/" pra forçar isso deve se usar exact
    //senão toda rota que começar com / vai cair no primeiro path
    <BrowserRouter>
      <Route path="/" exact component={Login} />
      <Route path="/dev/:id" component={Main} />
    </BrowserRouter>
  );
}
