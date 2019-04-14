const express = require('express');

const multer = require('multer');

const multerConfig = require('./config/multer');


//Rotas no express
const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const FileController = require('./controllers/FileController');

routes.post("/boxes", BoxController.store);
routes.get('/boxes/:id', BoxController.show);

//rota para envio de arquivos
routes.post(
  '/boxes/:id/files', 
  multer(multerConfig).single('file'), 
  FileController.store
);

//define rotas para a aplicação rota teste
routes.get('/', (req,res) => {
  return res.send('Lucas');
});

//exporta a variavel routes para uso em outros arquivos
module.exports = routes;