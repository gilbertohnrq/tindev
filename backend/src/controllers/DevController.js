//Importa o axios p/ utilização de apis externas
const axios = require("axios");

//Importa o model de Dev para salvar as informações do dev dentro do banco de dados
const Dev = require("../models/Dev");

//O controller pode simplesmente ser um objeto
//e podemos simplesmenteexportar esse objeto de dentro da pasta
//e colocar todos os métodos do controller ali dentro

module.exports = {
  //método utilizado para listagem
  async index(req, res) {
    const { user } = req.headers; // busca o usuário(id) logado

    const loggedDev = await Dev.findById(user); //pega a instancia desse usuário no banco de dados
    //com isso se tem todos os dados do usuário logado

    const users = await Dev.find({
      $and: [
        //Aplica a condição "AND" para todos os filtros
        { _id: { $ne: user } }, //"Not Equal" id não pode ser igual ao id do user logado
        { _id: { $nin: loggedDev.likes } }, //"Not in": id não pode estar em uma lista ex: likes
        { _id: { $nin: loggedDev.dislikes } } //"Not in": id não pode estar em uma lista ex: dislikes
      ]
    });
    return res.json(users);
  },

  async store(req, res) {
    //torna a função assincrona para utilizar o await
    const { username } = req.body; //pega apenas a variavel username do req.body utilizando desestruturação

    //busca pra saber se um usuário já existe no bd
    const userExists = await Dev.findOne({ user: username });

    //if pra ver se o usuário foi encontrado e retorna o usuário ao invés de criar um novo
    if (userExists) {
      return res.json(userExists);
    }

    const response = await axios.get(
      //o await garante que o node espere o retorno dessa função para dar continuidade pro resto do código
      `https://api.github.com/users/${username}`
    ); //Pega o retorno do axios da API do github baseado no username vindo do req.body ^
    //os dados do retorno da requisição do axios vem dentro desse "data" ex: response.data

    //busca os outros dados do dev de dentro do user.data e como avatar é avatar_url dentro do retorno da api do github utilizamos essa sintaxe pra renomear
    const { name, bio, avatar_url: avatar } = response.data;

    //função assincrona que cria um dev no banco de dados
    //variavel const dev criada para salvar o retorno dessa função  dev.create
    const dev = await Dev.create({
      name,
      user: username,
      bio,
      avatar
    });

    //Podemos usar o metodo store para criar um Dev, metodo recebe o req e o res
    return res.json(dev);
  }
};
