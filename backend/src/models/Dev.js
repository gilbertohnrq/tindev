//Importa de forma desestruturada o Schema e o model do mongoose
const { Schema, model } = require("mongoose");

//estrutura do banco de dados ex: nome do dev, user no github
const DevSchema = new Schema(
  {
    name: {
      type: String,
      required: true //campo obrigatorio
    },
    user: {
      type: String,
      required: true
    },
    bio: String, //por só ter 1 config não necessário escrever type
    avatar: {
      type: String,
      required: true
    },
    //criado pra armazenar os likes e dislikes dados pelo dev pelo ID
    likes: [
      {
        //formato do ID do mongo
        type: Schema.Types.ObjectId,
        //referencia o model Dev p/ pegar o ID
        ref: "Dev"
      }
    ],
    dislikes: [
      {
        //formato do ID do mongo
        type: Schema.Types.ObjectId,
        //referencia o model Dev p/ pegar o ID
        ref: "Dev"
      }
    ]
  },

  {
    timestamps: true // cria coluna createdAt (dada de criação do registro) em cada registro e updatedAt (data de atualização de um registro)
  }
);

//exporta o model  utilizando a função "model" importada do mongoose passando o nome do model exportado e o Schema nos parametros
module.exports = model("Dev", DevSchema);
