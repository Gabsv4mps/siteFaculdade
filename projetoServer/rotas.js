const path = require("path");

class FolhaController {
    
    constructor(app)
    {
        this.app = app;
        this.criaRotas()       
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
            console.log(req)
            console.log(dados);
            return res.status(201).json({
                status: true,
                message: "Produto cadastrado com sucesso!"
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