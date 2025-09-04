/* eslint-disable */
import fetch from 'node-fetch'
import fs from 'fs'

const MAX_DEX = 1025

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

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
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    if (!res.ok) {
      console.error(`❌ Failed to fetch Pokémon #${id} (${res.status})`)
      return null
    }

    const data = await res.json()

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
  const ids = Array.from({ length: MAX_DEX }, (_, i) => i + 1)

  // throttle requests in batches to avoid API overload
  const results = []
  const BATCH_SIZE = 50
  for (let i = 0; i < ids.length; i += BATCH_SIZE) {
    const batch = ids.slice(i, i + BATCH_SIZE)
    const batchResults = await Promise.all(batch.map(id => getPokemon(id)))
    results.push(...batchResults.filter(Boolean))
    console.log(`✅ Finished batch ${i / BATCH_SIZE + 1}`)
  }

  return results
}

getAllPokemon().then(list => {
  const allPokemonExport = `export const allPokemon = ${JSON.stringify(list, null, 2)};\n`
  const pokemonNamesExport = `export const pokemonNames = ${JSON.stringify(list.map(p => p.name), null, 2)};\n`

  fs.writeFileSync('pokemonData.js', allPokemonExport + pokemonNamesExport)
  console.log('✨ Wrote pokemonData.js with', list.length, 'Pokémon')
})
