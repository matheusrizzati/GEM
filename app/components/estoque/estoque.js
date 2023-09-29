const apiUrl = 'https://gem-api.vercel.app'

const token = localStorage.getItem('token')
if(!token){
    window.location.href = 'http://localhost:5500/login'
}

const estoqueContainer = document.querySelector('.estoqueContainer')
const orderSelect = document.querySelector('#EstoqueOrderSelect')
const FButton = document.querySelector('#EstoqueHandleButton')
const FMenu = document.querySelector('#estoqueFMenu')
const createItemModal = document.querySelector('#estoqueCreateItemModal')
const importLoteModal = document.querySelector('#estoqueLoteModal')

async function fetchEstoque(){
    const itens = await fetch(`${apiUrl}/produto`, 
    {
        headers: {'authorization': token}
    })
    .then(res => res.json())

    return itens
}
async function orderItens(){
    const itens = await fetchEstoque()

    if (orderSelect.value === 'padrao'){
        const padrao = itens
        return padrao
    }

    if (orderSelect.value === 'maisItens'){
        const maisItens = itens.sort((a, b) => b.quantidade - a.quantidade);
        return maisItens
    }
    
    if (orderSelect.value === 'menosItens'){
        const menosItens = itens.sort((a, b) => a.quantidade - b.quantidade);
        return menosItens
    }

}

async function loadItens(){
    const itens = await orderItens()
    estoqueContainer.innerHTML = ''

    itens.forEach(item => {
        const itemId = item._id
        const itemNome = item.nome
        const itemQuantidade = item.quantidade
        const itemValor = item.valor
        
        const itemComponent = document.createElement('li')
        itemComponent.classList.add('estoqueItem')
        itemComponent.id = itemId
        itemComponent.innerHTML = 
        `<h2 class="item1">${itemNome}</h2>
        <div class="item2">
        <h2 id="estoqueMenos" onclick="handleRemoveItem('${itemId}')">-</h2>
        <h2 class="estoqueItemCount" id="estoqueQuantidade_${itemId}">${itemQuantidade}</h2>
        <h2 id="estoqueMais" onclick="handleAddItem('${itemId}')">+</h2>
        </div>
        <h2 id="estoqueValor">R$ ${itemValor}</h2>
        <h2 class="item3" onclick="handleDeleteItem('${itemId}')">X</h2>`
        estoqueContainer.append(itemComponent)
    });
}



async function handleAddItem(id){
    const quantidadeElement = document.getElementById(`estoqueQuantidade_${id}`)
    quantidadeAtualizada = Number(quantidadeElement.innerHTML) + 1
    quantidadeElement.innerHTML = String(quantidadeAtualizada)
    await fetch(`${apiUrl}/produto/${id}`, {
        method: 'PUT',
        headers:{
            'authorization': token,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            quantidade: quantidadeAtualizada 
        })
    })
}

async function handleRemoveItem(id){
    const quantidadeElement = document.getElementById(`estoqueQuantidade_${id}`)
    quantidadeAtualizada = Number(quantidadeElement.innerHTML) - 1
    quantidadeElement.innerHTML = String(quantidadeAtualizada)
    await fetch(`${apiUrl}/produto/${id}`, {
        method: 'PUT',
        headers:{
            'authorization': token,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            quantidade: quantidadeAtualizada 
        })
    })
}

async function handleDeleteItem(id){
    const item = document.getElementById(id).remove()
    await fetch(`${apiUrl}/produto/${id}`, {
        method: 'DELETE',
        headers:{
            'authorization': token,
            'Content-Type': 'application/json'
        }
    })
}

async function handleCreateItem(){
    const nome = document.getElementById('itemNome').value
    const quantidade = document.getElementById('itemQuantidade').value
    const valor = document.getElementById('itemValor').value
    if(!nome){return alert("Coloque um nome para o item")}
    if(!quantidade){return alert("Coloque uma quantidade para o item")}
    if(!valor){return alert("Coloque um valor para o item")}

    await fetch(`${apiUrl}/produto`, {
        method: 'POST',
        headers:{
            'authorization': token,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            nome,
            quantidade,
            valor 
        })
    })

    alert("Item cadastrado com sucesso!")
    createItemModal.style.display = 'none'
    loadItens()
}

async function handleImportItemLote(){
    const itemId = document.getElementById('loteModalSelect').value
    const quantidadeItens = document.getElementById('loteItemQuantidade').value
    const quantidadeElement = document.getElementById(`estoqueQuantidade_${itemId}`)
    const quantidadeAtualizada = Number(quantidadeElement.innerHTML) + Number(quantidadeItens)
    await fetch(`${apiUrl}/produto/${itemId}`, {
        method: 'PUT',
        headers:{
            'authorization': token,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            quantidade: quantidadeAtualizada
        })
    })
    
    alert("Lote de itens importado com sucesso!")
    importLoteModal.style.display = 'none'
    loadItens()
}

loadItens()

orderSelect.addEventListener('click', () => { loadItens() })
FButton.addEventListener('click', () => {
    if(FMenu.style.display == 'block'){
        FMenu.style.display = 'none'
    } 
    else if(FMenu.style.display == 'none'){
        FMenu.style.display = 'block'
    }
})
document.querySelector('.createItemModalCancel').addEventListener('click', () => {
    createItemModal.style.display = 'none'
})
document.querySelector('.createItemModalCancel').addEventListener('click', () => {
    createItemModal.style.display = 'none'
})
document.getElementById('estoqueCadastrarNovoButton').addEventListener('click', () => {
    FMenu.style.display = 'none'
    createItemModal.style.display = 'flex'
})
document.querySelector('.loteModalCancel').addEventListener('click', () => {
    importLoteModal.style.display = 'none'
})
document.getElementById('estoqueAdicionarLoteButton').addEventListener('click', async () => {
    const itens = await fetchEstoque()
    const select = document.getElementById('loteModalSelect')
    
    itens.forEach(item => {
        const option = document.createElement('option')
        option.value = item._id
        option.innerHTML = `${item.nome}`
        select.append(option)
    })

    FMenu.style.display = 'none'
    importLoteModal.style.display = 'flex'
})
// document.getElementById('')