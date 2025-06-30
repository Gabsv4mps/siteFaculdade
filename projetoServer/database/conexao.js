const { rejects } = require('assert');
const mysql = require('mysql');
const { resolve } = require('path');
class DataBase{
  constructor(){
    this.host     = "localhost";
    this.user     = 'root',
    this.password = '',
    this.database = 'CadastroProduto'
    this.conexao = ""
  }

  async conectar(){
    const connection = mysql.createConnection({
      host      : this.host,
      user      : this.user,
      password  : this.password,
      database  : this.database
    })
    this.conexao = connection;
  }
 
  async executeQuery(query){
    await this.conectar();
    return new Promise((resolve, reject) => {
      this.conexao.query(query, function(error, results, fields) {
      if (error) return reject(error)
      resolve(results);
    });  

    })
  }

  async select(campos, table)
  {   
    const camposString = campos.join(', ') 
    return await this.executeQuery(`select ${camposString} from ${table}`)
  }

  async insert(table, campos, values){
    const valuesString = values.join('","');
    const camposString = campos.join(', ');
    await this.executeQuery(`insert into ${table}(${camposString}) values("${valuesString}");`);
  }
  

}

// new DataBase().executeQuery('select * from produtos').then( (e) =>{
//   console.log(e);
// })

module.exports = DataBase