// Run using node allPokemon.js
/* eslint-disable */
import fetch from 'node-fetch'
import fs from 'fs'

// # of Pokemon
const MAX_DEX = 1025

// Copy games from a Pokemon's pre-evolution (filtered by generation)
const PROPAGATE_EVOLUTIONS = true

const CSV_BASE = 'https://raw.githubusercontent.com/PokeAPI/pokeapi/master/data/v2/csv/'

// PokeAPI version identifier -> your export name + the game's generation.
// Array order is release order, which is also the order games appear in the output.
const VERSION_TO_GAME = {
  'red': { name: 'PokemonRed', gen: 1 },
  'blue': { name: 'PokemonBlue', gen: 1 },
  'yellow': { name: 'PokemonYellow', gen: 1 },
  'gold': { name: 'PokemonGold', gen: 2 },
  'silver': { name: 'PokemonSilver', gen: 2 },
  'crystal': { name: 'PokemonCrystal', gen: 2 },
  'ruby': { name: 'PokemonRuby', gen: 3 },
  'sapphire': { name: 'PokemonSapphire', gen: 3 },
  'emerald': { name: 'PokemonEmerald', gen: 3 },
  'firered': { name: 'PokemonFireRed', gen: 3 },
  'leafgreen': { name: 'PokemonLeafGreen', gen: 3 },
  'diamond': { name: 'PokemonDiamond', gen: 4 },
  'pearl': { name: 'PokemonPearl', gen: 4 },
  'platinum': { name: 'PokemonPlatinum', gen: 4 },
  'heartgold': { name: 'PokemonHeartGold', gen: 4 },
  'soulsilver': { name: 'PokemonSoulSilver', gen: 4 },
  'black': { name: 'PokemonBlack', gen: 5 },
  'white': { name: 'PokemonWhite', gen: 5 },
  'black-2': { name: 'PokemonBlack2', gen: 5 },
  'white-2': { name: 'PokemonWhite2', gen: 5 },
  'x': { name: 'PokemonX', gen: 6 },
  'y': { name: 'PokemonY', gen: 6 },
  'omega-ruby': { name: 'PokemonOmegaRuby', gen: 6 },
  'alpha-sapphire': { name: 'PokemonAlphaSapphire', gen: 6 },
  'sun': { name: 'PokemonSun', gen: 7 },
  'moon': { name: 'PokemonMoon', gen: 7 },
  'ultra-sun': { name: 'PokemonUltraSun', gen: 7 },
  'ultra-moon': { name: 'PokemonUltraMoon', gen: 7 },
  'lets-go-pikachu': { name: 'PokemonLetsGoPikachu', gen: 7 },
  'lets-go-eevee': { name: 'PokemonLetsGoEevee', gen: 7 },
  'sword': { name: 'PokemonSword', gen: 8 },
  'shield': { name: 'PokemonShield', gen: 8 },
  'brilliant-diamond': { name: 'PokemonBrilliantDiamond', gen: 8 },
  'shining-pearl': { name: 'PokemonShiningPearl', gen: 8 },
  'legends-arceus': { name: 'PokemonLegendsArceus', gen: 8 },
  'scarlet': { name: 'PokemonScarlet', gen: 9 },
  'violet': { name: 'PokemonViolet', gen: 9 },
  'legends-za': { name: 'PokemonLegendsZA', gen: 9 }
}

const GAME_ORDER = Object.values(VERSION_TO_GAME).map(g => g.name)
const GAME_GEN = Object.fromEntries(Object.values(VERSION_TO_GAME).map(g => [g.name, g.gen]))

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

// Downloads a PokeAPI CSV and returns rows as objects keyed by header name.
// These files have no quoted/comma-containing fields, so a plain split is safe.
async function fetchCsv(file) {
  const res = await fetch(CSV_BASE + file)
  if (!res.ok) throw new Error(`Failed to fetch ${file} (${res.status})`)
  const [header, ...rows] = (await res.text()).trim().split('\n')
  const cols = header.trim().split(',')
  return rows.map(line => {
    const vals = line.trim().split(',')
    return Object.fromEntries(cols.map((c, i) => [c, vals[i]]))
  })
}

// Builds Map<dexNum string, Set<game export name>> from the encounter data
async function buildGamesByDex() {
  console.log('⬇️  Downloading encounter CSVs...')
  const [encounters, versions, pokemon] = await Promise.all([
    fetchCsv('encounters.csv'),
    fetchCsv('versions.csv'),
    fetchCsv('pokemon.csv')
  ])

  const versionName = new Map(versions.map(v => [v.id, v.identifier]))
  const speciesOf = new Map(pokemon.map(p => [p.id, p.species_id]))

  // Warn if a version identifier in our mapping doesn't exist in the CSV
  const known = new Set(versionName.values())
  for (const key of Object.keys(VERSION_TO_GAME)) {
    if (!known.has(key)) console.warn(`⚠️  Version "${key}" not found in versions.csv`)
  }

  const byDex = new Map()
  for (const e of encounters) {
    const game = VERSION_TO_GAME[versionName.get(e.version_id)]
    if (!game) continue
    // species_id == National Dex number, even for alternate forms
    const dex = speciesOf.get(e.pokemon_id)
    if (!dex) continue
    if (!byDex.has(dex)) byDex.set(dex, new Set())
    byDex.get(dex).add(game.name)
  }
  return byDex
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

    return {
      name: capitalize(data.name),
      type1: capitalize(data.types[0]?.type.name || ''),
      type2: data.types[1] ? capitalize(data.types[1].type.name) : null,
      dexNum: id.toString(),
      generation: genMap[species.generation.name],
      evolutionLine,
      stats,
      // temporary fields, removed in attachGames()
      _species: species.name,
      _evolvesFrom: species.evolves_from_species?.name ?? null
    }
  } catch (err) {
    console.error(`❌ Error fetching Pokémon #${id}:`, err.message)
    return null
  }
}

// Adds a `games` array to each Pokemon and strips the temporary fields
function attachGames(list, gamesByDex) {
  const bySpecies = new Map(list.map(p => [p._species, p]))
  const memo = new Map()

  // Own encounter games, plus (optionally) everything its pre-evolution can be found in.
  // Games older than the Pokemon's own generation are dropped.
  function resolve(p) {
    if (memo.has(p._species)) return memo.get(p._species)
    const games = new Set(gamesByDex.get(p.dexNum) ?? [])

    const parent = PROPAGATE_EVOLUTIONS && p._evolvesFrom ? bySpecies.get(p._evolvesFrom) : null
    if (parent) {
      for (const g of resolve(parent)) games.add(g)
    }

    const filtered = new Set([...games].filter(g => GAME_GEN[g] >= p.generation))
    memo.set(p._species, filtered)
    return filtered
  }

  return list.map(p => {
    const games = [...resolve(p)].sort((a, b) => GAME_ORDER.indexOf(a) - GAME_ORDER.indexOf(b))
    const { _species, _evolvesFrom, ...rest } = p
    return {
      name: rest.name,
      type1: rest.type1,
      type2: rest.type2,
      dexNum: rest.dexNum,
      generation: rest.generation,
      games,
      evolutionLine: rest.evolutionLine,
      stats: rest.stats
    }
  })
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

async function main() {
  const gamesByDex = await buildGamesByDex()
  const raw = await getAllPokemon()
  const list = attachGames(raw, gamesByDex)

  // Sanity check: how many Pokemon each game ended up with
  const counts = Object.fromEntries(GAME_ORDER.map(g => [g, 0]))
  for (const p of list) for (const g of p.games) counts[g]++
  console.table(counts)

  // Saves to exports into a file
  const allPokemonExport = `export const allPokemon = ${JSON.stringify(list, null, 2)};\n`
  const pokemonNamesExport = `export const pokemonNames = ${JSON.stringify(list.map(p => p.name), null, 2)};\n`
  // Writes to pokemonData
  fs.writeFileSync('pokemonData.js', allPokemonExport + pokemonNamesExport)
  console.log('✨ Wrote pokemonData.js with', list.length, 'Pokémon')
}

main()