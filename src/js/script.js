let lista = document.querySelector("ul")

function anexarCards(produtos){

    lista.innerText = ""
    produtos.forEach(prod => {
        let li = document.createElement("li");
        let img = document.createElement("img");
        let h3 = document.createElement("h3");
        let span = document.createElement("span")
        let p = document.createElement("p")
        let preco = prod.preco
        let btnComprar = document.createElement("button")
        let componentesLista = document.createElement("ol")
        let id = prod.id
        let div = document.createElement("div")

        let listaComp = prod.componentes
        listaComp.forEach(comp =>{
            let componentes = document.createElement("li")
            componentes.innerText = comp
            componentesLista.appendChild(componentes)
        })
        componentesLista.classList.add("containerLista--componentes")
        btnComprar.classList.add("estiloGeralBotoes--carrinho")
        img.src = prod.img;
        img.alt = prod.nome;
        h3.innerText = prod.nome;
        span.innerText = prod.secao;
        p.innerText = `R$ ${preco.replace(".",",")}`
        btnComprar.innerText = "Comprar"
        btnComprar.setAttribute("id", id)
        div.classList.add("containerProduto--botao")


        li.appendChild(img)
        li.appendChild(h3)
        li.appendChild(span)
        li.appendChild(componentesLista)
        li.appendChild(div)
        div.appendChild(p)
        div.appendChild(btnComprar)
        

        lista.appendChild(li)
        
    });

}

anexarCards(produtos)







let inputBusca = document.querySelector(".campoBuscaPorNome")
let btnBusca = document.querySelector(".estiloGeralBotoes--botaoBuscaPorNome")
btnBusca.addEventListener("click", function(){
    
    let pesquisaUsuario = inputBusca.value
    let buscaResultado = busca(pesquisaUsuario)
    
    anexarCards(buscaResultado)

})

inputBusca.addEventListener("keypress",function(enter){
    if(enter.keyCode === 13){ 
        let pesquisaUsuario = inputBusca.value
        let buscaResultado = busca(pesquisaUsuario)
        
        anexarCards(buscaResultado)
    }
})

function busca(valorBusca){
    let resultadoBusca = []
    produtos.forEach(produto =>{
        let nomeMinusculo = produto.nome.toLowerCase();
        let categoria = produto.categoria.toLowerCase();
        let secaoprod = produto.secao.toLowerCase();
        let busca = valorBusca.toLowerCase();
        if(nomeMinusculo.includes(busca) || categoria.includes(busca) || secaoprod.includes(busca)){
            resultadoBusca.push(produto)
        }
    })
    priceProducts(resultadoBusca)
    return resultadoBusca
}

let btnFilterAll = document.querySelector("#botaoTodosProdutos")
btnFilterAll.addEventListener("click",function(){
    anexarCards(produtos)
    priceProducts(produtos)
})

let btnHorti = document.querySelector("#botaoHortifruti")
btnHorti.addEventListener("click",function(){
    let produtosHorti = []
    produtos.forEach(produto =>{
        if(produto.secao === "Hortifruti"){
            produtosHorti.push(produto)
        }
    })
    priceProducts(produtosHorti)
    anexarCards(produtosHorti)
})
let btnPani = document.querySelector("#botaoPanificadora")
btnPani.addEventListener("click",function(){
    let produtosPani = []
    produtos.forEach(produto =>{
        if(produto.secao === "Panificadora"){
            produtosPani.push(produto)
        }
    })
    priceProducts(produtosPani)
    anexarCards(produtosPani)
})

let btnLaticinios = document.querySelector("#botaoLaticinios")
btnLaticinios.addEventListener("click",function(){
    let produtosLaticinios = []
    produtos.forEach(produto =>{
        if(produto.secao === "Laticinio"){
            produtosLaticinios.push(produto)
        }
    })
    priceProducts(produtosLaticinios)
    anexarCards(produtosLaticinios)
})

function priceProducts(arrayProdutos){
    let span = document.querySelector("#spanPrice")
    span.innerHTML = ""
    let valorFinal = arrayProdutos.reduce((valorAnterior, valorAtual) =>{
        let valor = parseFloat(valorAtual.preco)
        return valorAnterior + valor
        }, 0)
        span.innerHTML = `R$ ${valorFinal.toFixed(2).replace(".",",")}`
}

priceProducts(produtos)








lista.addEventListener("click", interceptarProduto)
let carrinhoCompras = []


function interceptarProduto(event){

    let btnComprar = event.target
    if(btnComprar.tagName == "BUTTON"){

        let idProduto = btnComprar.id

        let produto = produtos.find(function(produto){
            if(produto.id == idProduto){
                return produto
            }
        })
        adicionarCarrinho(produto)
    }
    
}
function adicionarCarrinho(produto){
    carrinhoCompras.push(produto)
    criarCardCarrinho(carrinhoCompras)
    precoTotalCarrinho(carrinhoCompras)
}

const criarCardCarrinho = (arr) =>{
    let carrinhoLista = document.querySelector(".containerCarrinho--lista")
    carrinhoLista.innerText = ""

    arr.forEach((prod)=>{
        let id = prod.id
        let liCarrinho = document.createElement("li")
        let divCarrinho = document.createElement("div")
        let imgCarrinho = document.createElement("img")
        let divTextCarrinho = document.createElement("div")
        let h3Carrinho = document.createElement("h3")
        let spanCarrinho = document.createElement("span")
        let pCarrinho = document.createElement("p")
        let imgLixoCarrinho = document.createElement("img")

        liCarrinho.classList.add("containerCarrinho--listItem")
        divCarrinho.classList.add("containerCarrinho--item")
        imgCarrinho.classList.add("containerCarrinho--img")
        divTextCarrinho.classList.add("containerCarrinho--infos")
        imgLixoCarrinho.classList.add("containerCarrinho--lixo")

        imgLixoCarrinho.setAttribute("id", id)
        imgCarrinho.src = prod.img
        imgCarrinho.alt = prod.nome
        h3Carrinho.innerText = prod.nome
        spanCarrinho.innerText = prod.secao
        pCarrinho.innerText = prod.preco
        imgLixoCarrinho.src = "./src/img/trash.png"


        liCarrinho.appendChild(divCarrinho)
        divCarrinho.appendChild(imgCarrinho)
        divCarrinho.appendChild(divTextCarrinho)
        divTextCarrinho.append(h3Carrinho, spanCarrinho, pCarrinho)
        liCarrinho.appendChild(imgLixoCarrinho)

        
        return carrinhoLista.appendChild(liCarrinho)
    })
}

function precoTotalCarrinho(arr){
    let divCarrinho = document.querySelector(".containerCarrinho--content")
    let divPrecototal = document.createElement("div")
    let divQuantidade = document.createElement("div")
    let h2Quantidade = document.createElement("h2")
    let pQuantidade = document.createElement("p")
    let divPreco = document.createElement("div")
    let h2Preco = document.createElement("h2")
    let pPreco = document.createElement("p")

    pQuantidade.classList.add("containerCarrinho--quantidade")
    pPreco.classList.add("containerCarrinho--valor")

    divPrecototal.classList.add("containerCarrinho--price")
    divQuantidade.classList.add("containerCarrinho--quantity")
    divPreco.classList.add("containerCarrinho--priceTotal")
    divCarrinho.appendChild(divPrecototal)

    let precoTotalSelect = document.querySelector(".containerCarrinho--valor")
    
    let quantidadeSelect = document.querySelector(".containerCarrinho--quantidade")
    let precoTotal = 0
    arr.forEach((prod)=>{
        precoTotal += parseFloat(prod.preco)
    })
    
    if(arr.length == 1){
        let precoInicial = arr[0].preco
        divQuantidade.appendChild(h2Quantidade)
        divQuantidade.appendChild(pQuantidade)

        divPreco.appendChild(h2Preco)
        divPreco.appendChild(pPreco)

        divPrecototal.appendChild(divQuantidade)
        divPrecototal.appendChild(divPreco)


        h2Quantidade.innerText = "Quantidade:"
        pQuantidade.innerText = arr.length
        h2Preco.innerText = "Total:"
        pPreco.innerText = `R$ ${precoInicial.replace(".",",")}`
  

    }else if(arr.length > 1){
        quantidadeSelect.innerText = arr.length
        precoTotalSelect.innerText = `R$ ${precoTotal.toFixed(2).replace(".",",")}`
        
    }
    
    
}




let carrinho = document.querySelector(".containerCarrinho")
carrinho.addEventListener("click", interceptarCarrinho)

function interceptarCarrinho(event){
    let btnRemover = event.target
    if(btnRemover.classList == "containerCarrinho--lixo"){
        let idCarrinho = btnRemover.id
        let produtoCarrinho = carrinhoCompras.findIndex(function(produto){
            if(produto.id == idCarrinho){
               return produto
            
            }
        })
        
        removerCarrinho(produtoCarrinho)
    }

    
}


function removerCarrinho(obj){
    carrinhoCompras.splice(obj, 1)
    criarCardCarrinho(carrinhoCompras)
    
    if(carrinhoCompras.length == 0){
        let divPrecoTotalSelect = document.querySelector(".containerCarrinho--content")
        divPrecoTotalSelect.innerHTML = ""

        let listaProdCarrinho = document.createElement("li")
        listaProdCarrinho.classList.add("containerCarrinho--lista")
        
        let imgCarrinhoVazio = document.createElement("img")
        let pCarrinhoVazio = document.createElement("p")

        imgCarrinhoVazio.classList.add("containerCarrinho--shoppingBag")
        pCarrinhoVazio.classList.add("containerCarrinho--text")

        imgCarrinhoVazio.src = "./src/img/shopping-bag.png"
        pCarrinhoVazio.innerText = "Por enquanto não temos produtos no carrinho"

        divPrecoTotalSelect.appendChild(listaProdCarrinho)
        listaProdCarrinho.appendChild(imgCarrinhoVazio)
        listaProdCarrinho.appendChild(pCarrinhoVazio)
        
        
    }
}
