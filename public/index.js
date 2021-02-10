const container = document.querySelector('.content')
const selectContainer = document.querySelector('.generationSelect')
let styleIndex = 0
let createRow = undefined


const generations = {
    "1": { gen: 1, total: 1, name: "Kanto"},
    "2": { gen: 2, total: 152, name: "Johto"},
    "3": { gen: 3, total: 252, name: "Hoenn"},
    "4": { gen: 4, total: 387, name: "Sinnoh"}
}

callingPokedex(1)

function callingPokedex(selectValue) {
    const generationInitiate = generations[`${selectValue}`]
    const generationEnd = generations[parseInt(selectValue) + 1]
    
    const rows = document.querySelectorAll('.rows')
    rows.forEach(element => { element.remove() })

    selectContainer.disabled = true 

    getPokemon(generationInitiate, generationEnd)
}

async function getPokemon(geneBegin, geneEnd) {
    createRow = document.createElement('div')
    createRow.className = "rows"
    createRow.style = `--i: 1;`

    const generationTitle = document.querySelector('.generation')
    generationTitle.innerHTML = `${geneBegin.name}`

    // This code is the API consumption
    for ( let index = geneBegin.total; index < geneEnd.total; index++ ) {
        if ( index === 350 ) index++ // ! the pokemon with id 350, was removed from api
        
        const url = `https://pokeapi.co/api/v2/pokemon/${index}`

        const response = await fetch(url)
        let result = await response.json()
        
        let pokemonName = (result.forms[0].name)
        pokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)
        
        const types = []
        for( let slot of result.types ) {
            types.push(slot.type.name)
        }

        createPokemon(pokemonName, types, index)
    }

    return selectContainer.disabled = false
}


function createPokemon(name, types, index) {
    styleIndex++

    // Separating 3 pokemon per row
    if ( createRow.childNodes.length === 3 ) {
        createRow = document.createElement('div')
        createRow.className = "rows"
        createRow.style = `--i: ${styleIndex};`
    }

    container.appendChild(createRow)
    renderPokemon(name, types, index)
}


function renderPokemon(name, types, index) {
    // Pokemon main container
    const pokemonContainer = document.createElement('div')
    pokemonContainer.className = "pokemon"
    pokemonContainer.style = `--pk: ${styleIndex};`
    
    // Pokemon image container
    const pokemonImageContainer = document.createElement('div')
    pokemonImageContainer.className = "pokemon-container-image"

    const pokemonImage = document.createElement('img')
    pokemonImage.src = `https://pokeres.bastionbot.org/images/pokemon/${index}.png`
    pokemonImage.className = "pokemon-image"

    pokemonImageContainer.appendChild(pokemonImage)

    // Pokemon index 
    const pokemonIndex = document.createElement('h3')
    pokemonIndex.className = "pokemon-index"
    pokemonIndex.innerText = "#" + index

    // Pokemon name container
    const pokemonName = document.createElement('h3')
    pokemonName.className = "pokemon-name"
    pokemonName.innerText = `${name}`
    
    // Pokemon stats
    const pokemonStats = document.createElement('div')
    pokemonStats.className = "types"

    for ( type of types ) {
        const pokemonType = document.createElement('h5')
        pokemonType.className = type
        pokemonType.innerText = type
    
        pokemonStats.appendChild(pokemonType)
    } 

    pokemonContainer.append(pokemonImageContainer, pokemonIndex, pokemonName, pokemonStats)
    createRow.appendChild(pokemonContainer)
}