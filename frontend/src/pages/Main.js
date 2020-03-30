import React, { useEffect, useState } from "react";

//importa o link  do react-router-dom que cria um link que pode ser usado para criar um link para pagina inicial por ex utilizado la na logo
import { Link } from "react-router-dom";

import "./Main.css";

//importa a api de dentro do services
import api from "../services/api";

import logo from "../assets/logo.svg";
import dislike from "../assets/dislike.svg";
import like from "../assets/like.svg";

//o react-router-dom permite a utilização de uma propriedade chamada match
//a  propriedade match guarda todos os parametros que foram passados dentro pra essa rota
export default function Main({ match }) {
  //o estado é utilizado sempre que precisamos de uma  variavel que vai ser manipualada pelo componente
  //assim o componente vai poder acessar os valores/altera-los
  const [users, setUsers] = useState([]); //incializamos como um array pq ela vai armazenar vários usuários e não somente um

  //useEffect utilizado para executar a função toda vez que o id do usuário for alterado
  //vai fazer chamada api sempre que o componente for exibido em tela
  //recebe 2 parametros 1 função p/ executar e qdo vai executar
  //se no segundo parametro for passado variaveis, sempre que as variaveis foram alteradas a função vai executar novamente
  //uma boa pratica é não utilizar o async dentro da função do useEffect mas sim criar outra função async dentro do {}

  //Utilizando o map para percorrer o array de users criado, podemos passar a li dentro
  //A variavel que vai armazenar vai ser a user dentro do map sendo desnecessário dar o return já que temos ele dentro da chaves, então fica somente user => ()
  //depois  de criada a variavel user pra percorrer o array de users, podemos utilizar as informações buscadas do user para preencher a li, como user.name, user.bio, user.avatar trazidas da api
  //"each child in a list should have an unique key prop". O react diz que sempre que utilizamos um map pra criar uma lista de elementos, o primeiro elemento que vem depois do map precisa ter uma propriedade chamada key que vai ser utilizado pelo react pra quando ele precisar remover um elemento ou adicionar um novo ou mudar de posição pra saber qual elemento é qual e não precisar renderizar a lista do 0 que nao é tao legal pra performance
  //por isso passamos na li uma key={user._id} que é um valor unico para cada usuário.. o id de dentro do bd

  useEffect(() => {
    //função para pegar o id do usuário logado na rota /devs
    //salva o id do user na variavel response
    async function loadUsers() {
      //busca na rota /devs o usuário que é passado através de um header
      //dentro do get  passamos a rota que é /devs e depois dentro dos parametros passando um objeto {headers:} e dentro dos headers:{user} que é o user logado e depois user: match.params.id que é a informação que queremos do user
      const response = await api.get("/devs", {
        headers: {
          user: match.params.id
        }
      });
      setUsers(response.data); //chama a função setUsers para preencher a variavel users com o response.data
      //automaticamente quando se muda o valor de um estado no react ele faz uma nova renderização, fazendo toda a renderização do html do 0, por isso ele consegue identificar as alterações feitas dentro da variavel users
    }
    loadUsers();
  }, [match.params.id]);

  //toda ação que é gerada a partir de uma interação do usuário, é legal padronizar com o handle antes do nome da função
  //função para o botão de like
  async function handleLike(id) {
    //essa função precisa receber o id do usuário que tá recebendo o like pq o id do usuário que tá dando like já temos atraves do match.params.id que está na nossa rota
    await api.post(`/devs/${id}/likes`, null, {
      headers: { user: match.params.id }
    });
    setUsers(users.filter(user => user._id !== id));
  }
  //função para o botão de dislike
  //essa função precisa receber o id do usuário que tá recebendo o like pq o id do usuário que tá dando like já temos atraves do match.params.id que está na nossa rota
  async function handleDislike(id) {
    //quando um usuário dá dislike em outro, precisamos chamar a rota da api de dislike
    //por ser um metodo post precisamos passar o segundo parametro como null por se tratar do corpo da requisição (body) e no terceiro parametro passamos o header que contém a informação do usuário que está dando o dislike
    await api.post(`/devs/${id}/dislikes`, null, {
      headers: { user: match.params.id }
    });
    //setUsers é utilizado aqui para renderizar novamente a pagina
    //para remover o usuário que demos dislike, criamos um filtro pra pegar somente os usuarios que o _id seja diferente do id que recebemos dentro do handledislike
    setUsers(users.filter(user => user._id !== id));
  }
  return (
    //nos botoes de dislike e like, teremos que adicionar a propriedade onClick que serve pra realizar uma ação quando o usuário clica no botão
    //se apenas passarmos o user._id dentro da função handleDislike no botão, ele vai executar a função assim que chegar nela.. porém, um hack que podemos utilizar para a função só ser executada quando o botão for apertado é passar uma outra função antes da handleLike no botão ficando assim:  () => handleLike(user._id)
    <div className="main-container">
      <Link to="/">
        <img src={logo} alt="Tindev" />
      </Link>
      {users.length > 0 ? (
        <ul>
          {users.map(user => (
            <li key={user._id}>
              <img src={user.avatar} alt={user.name} />
              <footer>
                <strong>{user.name}</strong>
                <p>{user.bio}</p>
              </footer>

              <div className="buttons">
                <button type="button" onClick={() => handleDislike(user._id)}>
                  <img src={dislike} alt="Dislike" />
                </button>
                <button type="button" onClick={() => handleLike(user._id)}>
                  <img src={like} alt="Like" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">Acabou :(</div>
      )}
    </div>
  );
}
