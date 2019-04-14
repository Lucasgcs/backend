const Box = require('../models/Box');

//utiliza sintax async await para aguardar o retorno
class BoxController {
  async store(req, res) {

    //recuperar os dados vindos da requisição req.body.x
    //cria nova box
    const box =  await Box.create(req.body);
    
    return res.json(box);
  }

  async show(req, res) {
    const box = await Box.findById(req.params.id).populate({
      path: 'files',
      options: { sort: { createdAt: -1 } }
    });

    return res.json(box);
  }
}

//Retorna a instância de uma classe
module.exports = new BoxController();