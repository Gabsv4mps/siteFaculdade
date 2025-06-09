const path =  require("path");

const DataBase = require('./database/conexao.js')
class FolhaController {
    
    constructor(app)
    {
        this.app = app;
        this.criaRotas();
        this.db = new DataBase();      
    }
    criaRotas()
    {
        this.app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, './pages/index.html'));
        })

        this.app.get('/cadastro', (req, res) => { 
            res.sendFile(path.join(__dirname, './pages/cadastro.html'));
        })

        this.app.post('/cadastro', (req, res) =>{   
            const dados = req.body;
            console.log(dados);
            // const sql = `insert into produtos(nome, categoria, quantidade, preco) values('${dados.nome}', '${dados.categoria}', '${dados.quantidade}', '${dados.preco}');`;
            this.db.insert('produtos', ['nome', 'categoria', 'quantidade', 'preco'], [dados.nome, dados.categoria, dados.quantidade, dados.preco]).then(e =>{
                console.log('valor inserido com sucesso!')
            })

            return res.status(201).json({   
                status: true,
                message: "Produto cadastrado com sucesso!"
            });
        })


        this.app.get('/login', (req, res) => {

            res.sendFile(path.join(__dirname, './pages/login.html'));
        })

        this.app.post('/login', (req, res) =>{
            const informacoes = req.body;
            console.log(req);
            console.log(informacoes)
            return res.status(201).json({
                status: true,
                message: "Usuario cadastrado!"
            });
        })

        this.app.get('/produtos', (req, res) => {
            res.sendFile(path.join(__dirname,'../TesteSite/produtos.html'));
        })

        this.app.get('/vendas', (req, res) => {
            res.send('teupaide3')
        })


    }
}
module.exports = FolhaController;