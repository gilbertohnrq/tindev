//a importação do React é sempre necessária em todo componente
import React, { useState } from "react";

//importa o css da pagina de login
import "./Login.css";

//importa o arquivo api da pasta services
import api from "../services/api";

//importa a logo do tindev de dentro da pasta assets
import logo from "../assets/logo.svg";

//o componente é uma função
export default function Login({ history }) {
  //utilizando o state pra armazenar o valor digitado no botão de cadastro na tela de login
  //se dá um nome para o estado passando o valor a ser inicializado na variavel dentro da função
  //porém o useState não retorna apenas o valor da variável username ele retorna 2 valores em formato de vetor, o username e uma função setUsername
  //sempre que for preciso alterar o valor da variável username se utiliza o setUsername
  //sempre que for preciso acessar o valor de username eu chamo o username
  const [username, setUsername] = useState("");

  //vai ser a função disparada quando o usuário der submit no form
  //o input do form do html também recebe um evento e por padrão qdo o usuário dá submit, ele é redirecionado pra outra pagina
  async function handleSubmit(e) {
    e.preventDefault(); //previne o comportamento padrão do form de redirecionamento
    //console.log(username); //testando se o valor preenchido é exatamente o do input

    //como usarname da api e o username criado no estado tem o mesmo nome não é necessário passar os dois como parametro, apenas 1
    const response = await api.post("/devs", { username }); //usando await para esperar a resposta da api para o app continuar e navegar o usuário

    const { _id } = response.data; //dentro do retorno do response vem todos os dados do usuário, como bio, username, likes etc.. mas só queremos o ID

    history.push(`/dev/${_id}`);
  }

  return (
    //sempre por volta dos componentes se cria uma div de container
    //que fica por fora de tudo
    //no input estamos settando o valor dele no valor da variável username e no onChange vem do HTML que serve pra toda vez que ouver alteração no input
    //no onChange se recebe um evento como retorno então é preciso declarar uma função que recebe esse evento e dentro do evento existe o
    //e.target.value que é o valor digitado no input, por isso vamos passar o valor desse input pra dentro da função setUsername
    //com isso o react vai preencher automaticamente o valor da variavel username com o valor digitado no input
    //onSubmit = função do html (do form) que é disparada quando o usuário dá submit no form
    //passamos a função handlesubmit dentro do onSubmit pra ela ser utilizada qdo o usuário der submit no form

    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Tindev" />
        <input
          placeholder="Digite seu usuário no Github"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
