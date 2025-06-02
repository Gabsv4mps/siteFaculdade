let form = document.getElementById("cadastroForm");
let itemNome = document.getElementById("cadastroNome");
let itemCategoria = document.getElementById("cadastroClassificacao");
let itemQuantidade = document.getElementById("cadastroQnt");
let itemPreco = document.getElementById("cadastroPreco");
let botao = document.getElementById("enviaCadastro");



class produto{  
  constructor(nome, categoria, quantidade, preco){
    this.itemNome = nome;
    this.itemCategoria= categoria;
    this.itemQuantidade = quantidade;
    this.itemPreco= preco;
    this.lerDados() 
  }


  async cadastrar() {
    const dados = this.produtosDados()
    console.log(dados);
    const req = await fetch("http://localhost:3000/cadastro", {
      method: "POST",
      headers: {
      'Content-Type': 'application/json'
       },
      body:JSON.stringify(dados)
    })
    const res = await req.json();
    if (res.status){
       alert(res.message)
    }
  }


  produtosDados(){
        const dados = {
        nome: itemNome.value,
        categoria: itemCategoria.value,
        quantidade: itemQuantidade.value,
        preco: itemPreco.value
      }
      return dados
  }
 
  lerDados() {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("pumba");
      this.cadastrar();
    })
  }
}

new produto(itemNome,itemCategoria, itemQuantidade, itemPreco)