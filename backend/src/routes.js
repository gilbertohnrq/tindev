//importa o express
const express = require("express");

//importa o DevController de controllers
const DevController = require("./controllers/DevController");

//importa o like e dislike controller
const LikeController = require("./controllers/LikeController");
const DislikeController = require("./controllers/DislikeController");

//função que cria um objeto especifico pra rotas e ao inves de usar server.get utiliza-se routes.get
const routes = express.Router();

//faz o server "ouvir" a rota escolhida por ex: "/users" mas se for utilizado apenas o "/", a rota vai ser a princial
//req: traz todas informações referentes a requisição do usuário ex:"?nome=Diego" a requisição tem essas informações
//o cliente faz uma requisição pro servidor e o servidor devolve uma resposta.
//res.json retorna um json (javascript object notation ex: { name: diego, address: ...})

/*routes.get("/", (req, res) => {
  return res.json({ message: `Hello ${req.query.name}` });
});*/

routes.get("/devs", DevController.index);

//criar alguma informação ex: cadastrar desenvolvedores através de um formulário
//necessário Insomnia pra debugar
routes.post("/devs", DevController.store); //utiliza o método store do DevController

//rota para criação de likes
routes.post("/devs/:devId/likes", LikeController.store); //utiliza o metodo store do LikeController
routes.post("/devs/:devId/dislikes", DislikeController.store); //utiliza o metodo store do LikeController

//exporta as rotas para outros arquivos enxergarem " = nome da variavel que quer expor"
module.exports = routes;
