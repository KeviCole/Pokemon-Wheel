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

// Flattens the nested [base, [evolutions]] structure to a simple name array
function flattenEvolutionLine(evolutionLine) {
  return evolutionLine.flatMap(entry =>
      Array.isArray(entry) ? entry.map(pokemon => pokemon.name) : [entry.name]
  )
}

// Fetches all wild encounter games for a pokemon by name, returns a Set of game strings
async function getEncounterGames(pokemonName) {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)
    if (!res.ok) {
      return new Set()
    }
    const data = await res.json()

    const encounterRes = await fetch(data.location_area_encounters)
    if (!encounterRes.ok) {
      return new Set()
    }
    const encounters = await encounterRes.json()

    const games = new Set()
    encounters.forEach(entry => {
      entry.version_details.forEach(vd => games.add(vd.version.name))
    })
    return games
  } catch {
    return new Set()
  }
}

// Maps each game version to the HIGHEST generation of pokemon it includes
const GAME_GEN_MAP = {
  // Miscellaneous
  'red-japan': 0, 'green-japan': 0, 'blue-japan': 0, 'xd': 0, 'colosseum': 0,
  // Gen 1
  'red': 1, 'blue': 1, 'yellow': 1,
  // Gen 2
  'gold': 2, 'silver': 2, 'crystal': 2,
  // Gen 3
  'ruby': 3, 'sapphire': 3, 'emerald': 3,
  'firered': 3, 'leafgreen': 3,
  // Gen 4
  'diamond': 4, 'pearl': 4, 'platinum': 4,
  'heartgold': 4, 'soulsilver': 4,
  // Gen 5
  'black': 5, 'white': 5, 'black-2': 5, 'white-2': 5,
  // Gen 6
  'x': 6, 'y': 6, 'omega-ruby': 6, 'alpha-sapphire': 6,
  // Gen 7
  'sun': 7, 'moon': 7, 'ultra-sun': 7, 'ultra-moon': 7,
  'lets-go-pikachu': 7, 'lets-go-eevee': 7,
  // Gen 8
  'sword': 8, 'shield': 8,
  'brilliant-diamond': 8, 'shining-pearl': 8,
  'legends-arceus': 8, // Sinnoh Pokémon + some Gen 8 new ones, capped at 8
  // Gen 9
  'scarlet': 9, 'violet': 9,
}

async function getPokemon(id) {
  try {
    // Requests a HTTP request, and waits for response
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    if (!res.ok) {
      console.error(`❌ Failed to fetch Pokémon #${id} (${res.status})`)
      return null
    }
    const data = await res.json()

    // Requests HTTP request from url in received data
    const speciesRes = await fetch(data.species.url)
    if (!speciesRes.ok) {
      console.error(`❌ Failed to fetch species for Pokémon #${id} (${speciesRes.status})`)
      return null
    }
    const species = await speciesRes.json()

    const stats = data.stats.map(s => ({
      name: s.stat.name,
      value: s.base_stat
    }))

    // Evolution chain fetch
    let evolutionLine = []
    if (species.evolution_chain?.url) {
      try {
        const evoRes = await fetch(species.evolution_chain.url)
        const evoData = await evoRes.json()

        // Recursively parse chain into nested arrays
        function parseChain(chain) {
          const current = { name: capitalize(chain.species.name) }
          if (chain.evolves_to.length === 0) {
            return current
          }
          if (chain.evolves_to.length === 1) {
            return [current, parseChain(chain.evolves_to[0])]
          }
          // branching case
          return [current, chain.evolves_to.map(parseChain)]
        }

        evolutionLine = parseChain(evoData.chain)
      } catch (err) {
        console.error(`❌ Failed to fetch evolution chain for #${id}:`, err.message)
      }
    }

    // Fetch encounters for every member of the evolution line in parallel
    const evoNames = Array.isArray(evolutionLine) ? flattenEvolutionLine(evolutionLine) : []
    const allEvoEncounterSets = await Promise.all(evoNames.map(name => getEncounterGames(name)))

    // Union all encounter game sets together
    const allGames = new Set()
    allEvoEncounterSets.forEach(gameSet => gameSet.forEach(g => allGames.add(g)))

    // Filter to games where this pokemon's generation had been introduced
    const pokemonGen = genMap[species.generation.name] // your existing genMap, e.g. 'generation-i' -> 1
    const finalGames = Array.from(allGames)
        .filter(game => {
          const gameMaxGen = GAME_GEN_MAP[game]
          if (gameMaxGen === undefined) {
            console.warn(`⚠️ Unknown game version in GAME_GEN_MAP: "${game}"`)
            return false // drop unknown games rather than silently include them
          }
          return pokemonGen <= gameMaxGen
        })
        .sort()

    return {
      name: capitalize(data.name),
      type1: capitalize(data.types[0]?.type.name || ''),
      type2: data.types[1] ? capitalize(data.types[1].type.name) : null,
      dexNum: id.toString(),
      generation: genMap[species.generation.name],
      games: finalGames,
      evolutionLine,
      stats
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
