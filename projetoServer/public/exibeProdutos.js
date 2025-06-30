const urlParams = new URLSearchParams(window.location.search)
const categoria = urlParams.get("categoria")

const tituloDaPagina = {
    "Mobile" : "Produtos Mobile da Attom",
    "Informática" : "Informática na Attom",
    "Acessórios" : "Acessórios na Attom",
    "SmartThings" : "SmartThings na Attom"
}

if(categoria && tituloDaPagina[categoria]){
    document.title = tituloDaPagina[categoria]
} else {
    document.title = "Produtos da Attom"
}

fetch(`/api/categoria/${categoria}`)
    .then(response => response.json())
    .then(produtos => {
        const container = document.getElementById('produtos1')
        console.log('fetch')
        produtos.forEach(produto => {
           const card = document.createElement('div') 
           card.className = 'cardDosItems'
           card.innerHTML = `
                    <div class = "produtoimg">
                        <img src = "data:image/jpeg;base64,${produto.imagem}"/>     
                    </div>
                    <div class = "produtodesc">
                        <p>${produto.nome}</p>
                    </div>
                    <div class="preco">
                        <p>R$${parseFloat(produto.preco).toFixed(2)}</p>
                    </div>
                    <div class = "botaocompra"><button class = "botaocompra" data-id = "${produto.id}">Comprar agora</button></div>
            `;
            container.appendChild(card)
        });
    })
    .catch(error => {
        console.error('erro ao buscar os produtos', error)
    })

fetch('/api/itens')
    .then(response => response.json())
    .then(produtosCadastrados => {
        const tabela = document.getElementById("produtosTable")
        produtosCadastrados.forEach(cadastro => {
            const cardCadastro = document.createElement('tr')
            cardCadastro.innerHTML = `                    <tr>
                        <td id = "tabelaImagem"><img src="data:image/jpeg;base64,${cadastro.imagem}"/></td>
                        <td id = "tabelaProduto">${cadastro.nome}</td>
                        <td id = "tabelaCategoria">${cadastro.categoria}</td>
                        <td id = "tabelaQuantidade">${cadastro.quantidade}</td>
                        <td id = "tabelaPreco">${parseFloat(cadastro.preco).toFixed(2)}</td>
                        <td id = "button1"><button class = "editarProduto" data-id = "${cadastro.id}">Editar</button></td>
                        <td id = "button2"><button class = "excluirProduto" data-id="${cadastro.id}">Excluir</button></td>
                    </tr>`;
                    tabela.querySelector('tbody').appendChild(cardCadastro)
        })

        document.querySelectorAll('.excluirProduto').forEach(botao => {
        botao.addEventListener('click', () => {
            const id = botao.getAttribute('data-id');

            if(confirm("Excluir produto?")) {
                fetch(`api/produto/${id}`, {
                    method: 'DELETE'
                })
                .then(res => {
                    if(res.ok){
                        botao.closest('tr').remove()
                    } else{
                        alert("erro ao excluir o produto")
                    }
                })
                .catch(error => {
                    console.error(error)
                    alert("erro ao exlcuir o produto")
                })
            }
        })
    })

        document.querySelectorAll('.editarProduto').forEach(editar => {
            editar.addEventListener('click', () => {
                const idEditar = editar.getAttribute('data-id')

                const line = editar.closest('tr')
                const nome = line.querySelector('#tabelaProduto').innerText
                const categoria = line.querySelector('#tabelaCategoria').innerText
                const preco = line.querySelector('#tabelaPreco').innerText
                const quantidade = line.querySelector('#tabelaQuantidade').innerText

                const novoNome = prompt('Editar Nome do produto: ', nome)
                const novaCategoria = prompt('Editar Categoria do produto: ', categoria)
                const novoPreco = prompt('Editar Preço do produto: ', preco)
                const novaQuantidade = prompt('Editar Quantidade do produto :', quantidade)

                if(novoNome && novaCategoria && novoPreco && novaQuantidade){
                    fetch(`/api/produto/${idEditar}`, {
                        method: 'PUT',
                        headers: {
                            'content-type': 'application/json'
                        },
                        body: JSON.stringify({
                            nome: novoNome,
                            categoria: novaCategoria,
                            quantidade: novaQuantidade,
                            preco: novoPreco
                        })
                    })
                    .then(res => {
                        if(res.ok) {
                            line.querySelector('#tabelaProduto').innerText = novoNome
                            line.querySelector('#tabelaCategoria').innerText = novaCategoria
                            line.querySelector('#tabelaPreco').innerText = parseFloat(novoPreco).toFixed(2)
                            line.querySelector('#tabelaQuantidade').innerText = novaQuantidade
                        } else {
                            alert("erro ao editar o produto")
                        }
                    })
                    .catch(error => {
                        console.error(error)
                        alert("Erro ao enviar os dados do produto")
                    })

                }
            })

        })
     })