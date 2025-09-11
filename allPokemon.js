// Run using node allPokemon.js
/* eslint-disable */
import fetch from 'node-fetch'
import fs from 'fs'

// # of Pokemon
const MAX_DEX = 1025

function capitalize(str) {
  // Capitalizes first char, slices rest of str, and concatenate result
  return str.charAt(0).toUpperCase() + str.slice(1)
}

// Maps Gen String to #
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
  try {
    // Requests a HTTP request, and waits for response
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    if (!res.ok) {
      console.error(`❌ Failed to fetch Pokémon #${id} (${res.status})`)
      return null
    }
    // Receives the Pokemon's data JSON
    const data = await res.json()

    // Requests HTTP request from url in received data
    const speciesRes = await fetch(data.species.url)
    if (!speciesRes.ok) {
      console.error(`❌ Failed to fetch species for Pokémon #${id} (${speciesRes.status})`)
      return null
    }
    const species = await speciesRes.json()

    return {
      name: capitalize(data.name),
      type1: capitalize(data.types[0]?.type.name || ''),
      type2: data.types[1] ? capitalize(data.types[1].type.name) : null,
      dexNum: id.toString(),
      generation: genMap[species.generation.name]
    }
  } catch (err) {
    console.error(`❌ Error fetching Pokémon #${id}:`, err.message)
    return null
  }
}

async function getAllPokemon() {
  // Array of id's up to max dex
  const ids = Array.from({ length: MAX_DEX }, (_, i) => i + 1)

  // throttle requests in batches to avoid API overload
  const results = []
  const BATCH_SIZE = 50
  // Loops thru batches of calls
  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE)
    // Array of promises, runs in parallel to form array of pokemon objects
    const batchResults = await Promise.all(batch.map(id => getPokemon(id)))
    // Pushes successful results
    results.push(...batchResults.filter(Boolean))
    console.log(`✅ Finished batch ${i / BATCH_SIZE + 1}`)
  }

  return results
}

getAllPokemon().then(list => {
  // Saves to exports into a file
  const allPokemonExport = `export const allPokemon = ${JSON.stringify(list, null, 2)};\n`
  const pokemonNamesExport = `export const pokemonNames = ${JSON.stringify(list.map(p => p.name), null, 2)};\n`
  // Writes to pokemonData
  fs.writeFileSync('pokemonData.js', allPokemonExport + pokemonNamesExport)
  console.log('✨ Wrote pokemonData.js with', list.length, 'Pokémon')
})
