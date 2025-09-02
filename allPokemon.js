/* eslint-disable no-console */
import fetch from 'node-fetch'

const MAX_DEX = 1025

// Capitalizes 1st Char and Appends the rest
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Maps Generation Name to Number
const genMap = {
  'generation-i': 1,
  'generation-ii': 2,
  'generation-iii': 3,
  'generation-iv': 4,
  'generation-v': 5,
  'generation-vi': 6,
  'generation-vii': 7,
  'generation-viii': 8,
  'generation-ix': 9
}

async function getPokemon(id) {
  // Fetches pokemon data by id
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  if (!res.ok) {
    console.error(`Failed to fetch Pokémon #${id}`)
    return null
  }
  // JSON of Pokemon Info
  const data = await res.json()
  // Second Resource of JSON Pokemon Info
  const speciesRes = await fetch(data.species.url)
  const species = await speciesRes.json()
  // Returns simplified Pokemon Object
  return {
    name: capitalize(data.name),
    type1: capitalize(data.types[0]?.type.name || ''),
    type2: data.types[1] ? capitalize(data.types[1].type.name) : null,
    dexNum: id.toString(),
    generation: genMap[species.generation.name]
  }
}

async function getAllPokemon() {
  // Makes Array of ID's to Max Dex
  const ids = Array.from({ length: MAX_DEX }, (_, i) => i + 1)

  // Fetch all in parallel
  const results = await Promise.all(ids.map(id => getPokemon(id)))

  // Filter out any failures
  return results.filter(Boolean)
}

// Outputs Pokemon data to Correct Format
getAllPokemon().then(list => {
  console.log('export const allPokemon =', JSON.stringify(list, null, 2))
})
