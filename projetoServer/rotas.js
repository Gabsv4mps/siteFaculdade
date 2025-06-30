const path =  require("path");
const multer = require('multer');
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 } // 50 MB
});
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

        this.app.get('/cadastroProduto', (req, res) => { 
            res.sendFile(path.join(__dirname, './pages/cadastro.html'));
        })

        this.app.post('/cadastroProduto', upload.single('imagem'), async (req, res) =>{   
            const dados = req.body;
            if(!req.file){
                return res.status(400).json({
                    status: false,
                    message: "Erro ao enviar a imagem!"
                })
            }
            const imagem64 = req.file.buffer.toString('base64');


            console.log(dados);
            // const sql = `insert into produtos(nome, categoria, quantidade, preco) values('${dados.nome}', '${dados.categoria}', '${dados.quantidade}', '${dados.preco}');`;

            try{
                await this.db.insert('produtos', ['nome', 'categoria', 'quantidade', 'preco', 'imagem'], [dados.nome, dados.categoria, dados.quantidade, dados.preco, imagem64]).then(e =>{
                    console.log('valor inserido com sucesso!')
                })

                return res.status(201).json({   
                    status: true,
                    message: "Produto cadastrado com sucesso!"
                });
            } catch(error){
                console.error("Erro ao inserir no banco!", error)
                return res.status(500).json({
                    status:false,
                    message:"Erro ao cadastrar produto no banco!"
                })
            }
        })

        this.app.get('/api/itens', async (req, res) => {
            try{
                const produtosDados = await this.db.select(['id', 'nome', 'categoria', 'quantidade', 'preco', 'imagem'], 'produtos')
                res.json(produtosDados)
            }
            catch(error){
                console.error(error)
                res.status(500).json({erro: 'erro ao exibir os produtos!'})
            }
        })


       this.app.get('/api/categoria/:categoria', async (req, res) => {
            const categoria = req.params.categoria
            try{
                const produtosCategoria = await this.db.executeQuery(`select * from produtos where categoria = "${categoria}"`)
                res.json(produtosCategoria)
            } catch(error){
                console.error(error)
                res.status(500).json({error: `Erro ao buscar os produtos da categoria ${categoria}`})
            }
       })

       this.app.delete('/api/produto/:id', async (req, res) => {
            const id = req.params.id
            try{
                await this.db.executeQuery(`delete from produtos where id = ${id}`)
                res.status(200).json({message: `Produto ${id}deletado com sucesso`})
            }catch(error){
                console.error(error)
                res.status(500).json({error: `Erro ao deletar o produto ${id}`})
            }

       })

       this.app.put('/api/produto/:id', async (req, res) => {
            const idPut = req.params.id
            const { nome, categoria, preco, quantidade } = req.body
            
            try{
                this.db.executeQuery(`update produtos set nome = "${nome}", categoria = "${categoria}", quantidade = "${quantidade}", preco = "${preco}" where id = "${idPut}"`)
                res.status(200).json({message: `Produto ${idPut} atualizado com sucesso`})
            } catch(error){
                console.error(error)
                res.status(500).json({error: 'Erro ao atualizar o produto'})
            }
       })

        this.app.get('/cadastro', (req, res) => {
            res.sendFile(path.join(__dirname, './pages/login.html'));
        })

        this.app.post('/cadastro', async (req, res) =>{
            const informacoes = req.body;
            await this.db.insert('Usuarios', ['nome', 'email', 'senha'], [informacoes.usuario, informacoes.email, informacoes.senha]).then(e =>{
                console.log("Usuario cadastrado!")
            })
            
            
            return res.status(201).json({
                status: true,
                message: "Usuario cadastrado!"
            });
        })

        this.app.get('/login', (req, res) => {
            res.sendFile(path.join(__dirname, './pages/loginUsuario.html'));
        })

        this.app.get('/produtos', (req, res) => {
            res.sendFile(path.join(__dirname,'./pages/allProdutos.html'));
        })

        this.app.get('/carrinho', (req, res) => {
            res.sendFile(path.join(__dirname, './pages/carrinho.html'))
        })


    }
}
module.exports = FolhaController;