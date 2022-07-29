

function anexarCards(produtos){

    let lista = document.querySelector("ul")
    lista.innerHTML = ""
    produtos.forEach(prod => {
        let li = document.createElement("li");
        let img = document.createElement("img");
        let h3 = document.createElement("h3");
        let span = document.createElement("span")
        let p = document.createElement("p")
        let preco = prod.preco

        img.src = prod.img;
        img.alt = prod.nome;
        h3.innerText = prod.nome;
        span.innerText = prod.secao;
        p.innerText = `R$ ${preco.toFixed(2).replace(".",",")}`

        li.appendChild(img)
        li.appendChild(h3)
        li.appendChild(span)
        li.appendChild(p)

        lista.appendChild(li)
        
    });

}

anexarCards(produtos)
priceProducts(produtos)




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
        let nomeMinusculo = produto.nome.toLowerCase()
        let busca = valorBusca.toLowerCase()
        if(nomeMinusculo.includes(busca)){
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
        if(produto.secao === "Laticínio"){
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
        return valorAnterior + valorAtual.preco
        }, 0)
        span.innerHTML = `R$ ${valorFinal.toFixed(2).replace(".",",")}`
}

