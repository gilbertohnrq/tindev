//importa o model de dev
const Dev = require("../models/Dev");

//exporta o controller
module.exports = {
  //metodo para criação de um novo like no bd
  async store(req, res) {
    //pra acessar um parametro que vem atraves da rota usa-se o req.params
    // console.log(req.params.devId);

    //console.log(req.headers.user); //busca o header da requisição criada (por ex: o header  de user criado no insomnia)

    const { devId } = req.params; //pega o devId de dentro do req.params
    const { user } = req.headers; // pega o user de dentro do req.headers

    //loggeddev e targetdev guardam a instancia desse usuario no banco de dados com acesso a todas informaçõs dele como por exemplo name, bio etc
    const loggedDev = await Dev.findById(user); //usuário logado
    const targetDev = await Dev.findById(devId); //usuário "alvo" ou usuário que recebe o like

    if (!targetDev) {
      return res.status(400).json({ error: "Dev does not exist" }); //http code 400: BAD REQUEST
    }

    if (targetDev.likes.includes(loggedDev._id)) {
      console.log("DEU MATCH");
    }
    //Isso não adiciona no banco de dados
    loggedDev.likes.push(targetDev._id); //adiciona o ID do targetdev que recebeu o like no array de likes do DEV

    //salva as informações no banco de dados
    await loggedDev.save();

    return res.json(loggedDev);
  }
};
