function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then((res) => { return res.json()})
    // também pode ser assim: .then( res => res.json() )
    .then( states => {

        for(const state of states){
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>"`
        }

    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text 

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios
    `
    citySelect.innerHTML = "<option value>Selecione a cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json() )
    .then( cities => {
            
        for(const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>"`
        }

        citySelect.disabled = false

    })
}


document
.querySelector("select[name=uf]")
//abaixo temos o "ouvidor de eventos". O => substui o function, para criar função anonima.
.addEventListener("change", getCities )

// Itens de coleta
//pegar todos os li's

const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")

let selectedItems = []

function handleSelectedItem(event){

    const itemLli = event.target

    //adicionar ou remover uma classe com JS
    itemLli.classList.toggle("selected")

    const itemId = event.target.dataset.id

    //verificar se existem itens selecionados, se sim
    //pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( item => {
        const itemFound = item == itemId //isso será true ou false
        return itemFound // dá pra apagar a linha de cima e colocar só return item == itemId
    })

    //se já estiver selecionado, retirar da seleção
    if(alreadySelected >= 0){ //posição do array que indica o index
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }
    else {
    //se não tiver selecionado, adicionar á seleção
        selectedItems.push(itemId)
    }
    
    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
}