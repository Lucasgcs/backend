const File = require('../models/File');
const Box = require('../models/Box');

//utiliza sintax async await para aguardar o retorno
class FileController {
  async store(req, res) {
    const box = await Box.findById(req.params.id);

    //criar o arquivo
    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key,
    });
    
    box.files.push(file);

    await box.save()

    //pega os usuarios conectados .sockets, atraves da variavel req.io
    //envia os dados para todos conectados .emit
    req.io.sockets.in(box._id).emit("file", file);

    return res.json(file);
  }
}

//Retorna a instância de uma classe
module.exports = new FileController();