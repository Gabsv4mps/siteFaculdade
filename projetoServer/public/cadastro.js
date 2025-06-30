let form = document.getElementById("cadastroForm");
let itemNome = document.getElementById("cadastroNome");
let itemCategoria = document.getElementById("cadastroClassificacao");
let itemQuantidade = document.getElementById("cadastroQnt");
let itemPreco = document.getElementById("cadastroPreco");
let botao = document.getElementById("enviaCadastro");
let imagemProduto = document.getElementById('cadastroImagem') 


class produto{  
  constructor(nome, categoria, quantidade, preco, imagem){
    this.itemNome = nome;
    this.itemCategoria= categoria;
    this.itemQuantidade = quantidade;
    this.itemPreco= preco;
    this.imagemProduto = imagem;
    this.imagemFile = null; 
    this.lerDados() 
  }


  async cadastrar() {
    if (this.imagemFile == null){
      alert("cadastra a imagem burrao");
      return
    } 
    const dados = this.produtosDados()
    console.log(dados);
    const req = await fetch("http://localhost:3000/cadastroProduto", {
      method: "POST",
      headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded'
       },
      body:dados
    })
    const res = await req.json();
    if (res.status){
       alert(res.message)
    }
  }


  produtosDados(){
        const formData = new FormData();
        formData.append('nome',itemNome.value)
        formData.append('categoria',itemCategoria.value)
        formData.append('quantidade',itemQuantidade.value)
        formData.append('preco',itemPreco.value)
        formData.append('imagem',this.imagemFile)

      //   const dados = {
      //   nome: itemNome.value,
      //   categoria: itemCategoria.value,
      //   quantidade: itemQuantidade.value,
      //   preco: itemPreco.value,
      //   imagem: this.imagem64
      // }
      return formData;
  }
 
  lerDados() {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      console.log("pumba");
      this.cadastrar();
    })
  
    this.imagemProduto.addEventListener('change', (event) =>{
    const file = event.target.files[0];
    if (file) {
      this.imagemFile = file;

      // const reader = new FileReader();
      // reader.onload = function () {
      //   const base64String = reader.result; // Isso já é um Data URL
      //   // Aqui você pode enviar para o back-end, por exemplo
      //   self.imagem64 = base64String;
      //   console.log(base64String);
      //   // Se quiser só a parte base64 sem o cabeçalho (ex: data:image/png;base64,...)
      //   // const base64Somente = base64String.split(',')[1];
      //   // console.log(base64Somente);
      // };
      // reader.readAsDataURL(file); // Lê como Data URL (base64)
    }
  });
  }
  
  
}

new produto(itemNome,itemCategoria, itemQuantidade, itemPreco, imagemProduto)