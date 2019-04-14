const mongoose = require('mongoose');

//equivalente a tabela do banco relacional
const File = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    path: {
      type: String, 
      required: true
    }
  },
  {
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true}
  }
);

File.virtual('url').get(function(){
  //definir variavel para ambiente de prod ou dev 

  const url = process.env.URL || 'http://localhost:3333'
  
  return `${url}/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model("File", File);