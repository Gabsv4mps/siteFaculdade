let formLogin = document.getElementById("cadastroForm");
let nomeCadastro = document.getElementById("usuarioCadastro");
let emailCadastro = document.getElementById("emailCadastro");
let senhaCadastro = document.getElementById("senhaCadastro");




class cadastroUsuario{
    constructor(usuario, email, senha){
        this.nomeCadastro = usuario;
        this.emailCadastro = email;
        this.senhaCadastro = senha;
        this.loginLer();
    }

    async mandarLogin(){
        const informacoes = this.loginDados();
        console.log(informacoes);
        const req = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
            'Content-Type': 'application/json'
            },
            body:JSON.stringify(informacoes)
        })
        const res = await req.json();
        if(res.status){
            alert(res.message);
        }
    }

    loginDados(){
        const informacoes = {
            usuario: nomeCadastro.value, 
            email: emailCadastro.value,
            senha: senhaCadastro.value
        }
        return informacoes;
    }

    loginLer(){
        formLogin.addEventListener("submit", (event) =>{
            event.preventDefault()
            console.log("tudo certo chefia");
            this.mandarLogin();
        })
    }
}

new cadastroUsuario(nomeCadastro, emailCadastro, senhaCadastro);