const formulario = document.getElementById('novoItem');
var itensSalvos = JSON.parse(localStorage.getItem("item"))||[];

carregandoPagina(itensSalvos);

function carregandoPagina(itens){
    const lista = document.getElementById('lista');
    lista.innerHTML = '';
    itens.forEach(item => {
        if (item){
        inseriElementoNaLista(item.nome, item.quantidade, item.id)
        }
        return itens;
    });
}

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const id = itensSalvos.length;
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    const nomeCorrigido = nome.value.toLowerCase();
    const elementoExistente = itensSalvos.find(elemento => elemento.nome === nomeCorrigido);
    if (elementoExistente) {
        atualizaElemento(elementoExistente, quantidade.value);
    } else {
        salvarElementoLocalStorage(nomeCorrigido, quantidade.value);
        inseriElementoNaLista(nomeCorrigido, quantidade.value, id);
    }
    nome.value = "";
    quantidade.value = "";
    
});

function atualizaElemento(elemento, quantidade) {
    const idDoElemento = elemento.id;
    const elementoNoHTML = document.querySelector(`[data-id="${idDoElemento}"]`);
    const quantidadeNoHTML = elementoNoHTML.querySelector('#quantidade');
    quantidadeNoHTML.innerHTML = `${quantidade}`;
    itensSalvos[idDoElemento].quantidade = quantidade;
    localStorage.setItem("item", JSON.stringify(itensSalvos))

}

function inseriElementoNaLista (nome, quantidade, id) {
    const lista = document.getElementById('lista');
    lista.innerHTML += `<li class="item" data-id="${id}"><strong id="quantidade">${quantidade}</strong>${nome}<button class="botao" onclick="deletaItem(this.parentNode)">X</button></li>`;

}

function salvarElementoLocalStorage (nome, quantidade) {
    const novoItem = {
        "nome": nome,
        "quantidade": quantidade,
        "id": itensSalvos.length
    }

    itensSalvos.push(novoItem);

    localStorage.setItem("item", JSON.stringify(itensSalvos));

}

function deletaItem(elemento){
    const idDeletada = elemento.dataset.id;
    delete itensSalvos[idDeletada];
    itensSalvos.forEach((item) => {
        if (item.id > idDeletada){
            item.id = item.id - 1;
        }
        console.log(itensSalvos);
        return itensSalvos;
    } )
    const itensSalvosSemNulos = itensSalvos.filter(function(i) {
        return i;
    })
    localStorage.setItem("item", JSON.stringify(itensSalvosSemNulos));
    carregandoPagina(itensSalvosSemNulos);
    itensSalvos = itensSalvosSemNulos;

}
