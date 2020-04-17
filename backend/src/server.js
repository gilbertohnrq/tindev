// importa o express
//express é uma função que quando chamada cria um novo servidor
const express = require("express");

//Importa o mongoose
const mongoose = require("mongoose");

//importa o cors
const cors = require("cors");

//importa as rotas do arquivo routes.js
const routes = require("./routes");

//inicia um servidor do express
const app = express();

const server = require("http").Server(app);

//importa o socket io
const io = require("socket.io")(server);

const connectedUsers = {};

io.on("connection", (socket) => {
  const { user } = socket.handshake.query;
  connectedUsers[user] = socket.id;
});

//Faz a conexão com o banco de dados utilizando a String de conexão do mongodb
//Lembrar de trocar o username o  password sem o <>
//trocar o "test" pelo nome do BD, se não existir ele cria sozinho
//Criar uma virgula no final da string de conexão e escrever , { useNewUrlParser: true}
mongoose.connect(
  "mongodb+srv://omnistack:omnistack@cluster0-asmv6.mongodb.net/omnistack8?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

//usa a função importada do cors pro REACT poder fazer requisições ao servidor
app.use(cors());

//Faz o express "entender" requisições em json
app.use(express.json());

//.use => chama o arquivo de configurações criado
app.use(routes);

//faz o servidor "ouvir" uma porta por ex: 3333
//http://localhost:3333
server.listen(3333);

//node src/server.js pra rodar o servidor
