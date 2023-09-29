const apiUrl = 'https://gem-api.vercel.app'

const token = localStorage.getItem('token')
if(!token){
    window.location.href = 'http://localhost:5500/login'
}

const financeiroContainer = document.querySelector('.financeiroContainer')
const orderSelect = document.querySelector('#financeiroOrderSelect')
const financeiroAddModal = document.querySelector('#financeiroAddModal')

async function fetchEstoque(){
    const itens = await fetch(`${apiUrl}/financeiro`, {
        headers: {'authorization': token}
    })
    .then(res => res.json())

    return itens
}
async function orderItens(){
    const itens = await fetchEstoque()
    console.log(itens)
    return itens
    // if (orderSelect.value === ''){
    //     const padrao = itens
    //     return padrao
    // }

    // if (orderSelect.value === 'maisItens'){
    //     const maisItens = itens.sort((a, b) => b.quantidade - a.quantidade);
    //     return maisItens
    // }
    
    // if (orderSelect.value === 'menosItens'){
    //     const menosItens = itens.sort((a, b) => a.quantidade - b.quantidade);
    //     return menosItens
    // }

}

async function loadItens(){
    const itens = await orderItens()
    financeiroContainer.innerHTML = ''

    itens.forEach(item => {
        const itemId = item._id
        const itemValor = item.valor
        const itemData = String(item.data)
        const itemDetalhes = item.detalhes
        const dataFormatada = (String(itemData) === "undefined") ? "Sem data" : 
        itemData.slice(8,10)
        +"/"+
        itemData.slice(5,7)
        +"/"+
        itemData.slice(0,4)
        +" - "+
        itemData.slice(11, 13)
        +":"+
        itemData.slice(14, 16)

        const itemComponent = document.createElement('li')
        itemComponent.classList.add('financeiroItem')
        itemComponent.id = itemId
        itemComponent.innerHTML = 
        `<h2 class="item1">${itemValor}</h2>
        <h2>${dataFormatada}</h2>
        <h2 class="item3" onclick="handleDeleteItem('${itemId}')">X</h2>`
        financeiroContainer.append(itemComponent)
    });
}

async function handleDeleteItem(id){
    const item = document.getElementById(id).remove()
    await fetch(`${apiUrl}/financeiro/${id}`, {
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json',
            'authorization': token
        }
    })
}

async function handleCreateFinanceiro(){
    const valor = document.getElementById('financeiroValor').value
    const detalhes = document.getElementById('financeiroDetalhes').value
    if(!valor){return alert("Coloque um valor para o item")}

    await fetch(`${apiUrl}/financeiro`, {
        method: 'POST',
        headers:{
            'authorization': token,
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            valor,
            detalhes
        })
    })

    alert("Lançamento realizado com sucesso!")
    financeiroAddModal.style.display = 'none'
    loadItens()
}

loadItens()

document.querySelector('.addModalCancel').addEventListener('click', () => {
    financeiroAddModal.style.display = 'none'
})

document.getElementById('FMenuButton').addEventListener('click', () => {
    if (document.getElementById('FMenuContainer').style.display == 'none'){
        return document.getElementById('FMenuContainer').style.display = 'flex'
    }
    if (document.getElementById('FMenuContainer').style.display == 'flex'){
        return document.getElementById('FMenuContainer').style.display = 'none'
    }
})

document.getElementById('FMenuAdd').addEventListener('click', () => {
    financeiroAddModal.style.display = 'flex'
    document.getElementById('FMenuContainer').style.display = 'none'
})