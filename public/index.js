const container = document.querySelector('.container')
const selectContainer = document.querySelector('.generationSelect')

const generations = {
    "1": { gen: 1, total: 1, name: "Kanto"},
    "2": { gen: 2, total: 152, name: "Johto"},
    "3": { gen: 3, total: 252, name: "Johto"},
}

callingPokedex(1)

function callingPokedex(selectValue) {
  const generationInitiate = generations[`${selectValue}`]
  const generationEnd = generations[parseInt(selectValue) + 1]
  
  selectContainer.disabled = true
  container.innerHTML = ''
  getPokemon(generationInitiate, generationEnd)
}

async function getPokemon(geneBegin, geneEnd) {
  const generationTitle = document.querySelector('.generation')
  generationTitle.innerHTML = `${geneBegin.name}`

  // This code is the API consumption
  for ( let index = geneBegin.total; index < geneEnd.total; index++ ) {        
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
    // Pokemon main container
    const pokemonContainer = document.createElement('div')
    pokemonContainer.className = "pokemon"
    
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
    pokemonIndex.innerText = index

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
    container.appendChild(pokemonContainer)
}