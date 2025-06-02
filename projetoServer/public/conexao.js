const sql = require('mysql');

const config ={
    user:'root',
    password:'',
    server:'127.0.0.1',
    database:'CadastroProduto'
}

sql.connect(config).then(pool => {
    pool.query('SELECT * from produtos').then(result =>{
        console.log(result);
    }).catch(err =>{
        console.error(err);
    });
}).catch(err =>{
    console.error('erro na conexao', err);
})