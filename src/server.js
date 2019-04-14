// importa o express para uso
const express = require("express");

//importa o mongoose para aplicação
const mongoose = require('mongoose');

//importa lib para controlar os caminhos dos arquivos
const path = require('path');

//permite acesso de dominios diferentes a aplicação
const cors = require('cors');

//define variavel que será aplicação
const app = express();

// usar o cors
app.use(cors());
//criar variavel para pegar o protocolo HTTP
const server = require('http').Server(app);

//importa o socket IO WEB SOCKETs
const io = require('socket.io')(server);

//determina rotas WEBSOCKET, socket é conexão do usuario Realtime
io.on("connection", socket => {
  //determina "salas" para os usuários acessarem e não colidirem nas rotas
  socket.on('connectRoom', box => {
    socket.join(box);
  })
});

//conecta ao cluster do mongodb atlas
mongoose.connect(
  'mongodb+srv://omnistack:omnistack@cluster0-wmmqf.mongodb.net/omnistack?retryWrites=true',
  {
    useNewUrlParser: true
  }
);

//middleware global para a aplicação, definindo variavel io dentro do req
app.use((req, res, next) => {
  req.io = io;

  //passa para o restante das rotas 
  return next();
})

//cadastra modulo dentro do express para entender requisições json
app.use(express.json());

//permite que envie arquivos nas requisições
app.use(express.urlencoded({ extended: true}));

app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

//definir o uso do arquivo de rotas
app.use(require('./routes'));

//define onde o servidor irá rodar
server.listen(process.env.PORT || 3333);