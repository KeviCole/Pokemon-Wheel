import { allPokemon } from './pokemonData'

const imagePath = '../Images/'
const png = '.png'
// Webpack Function, imports all files
const pokeImages = require.context(imagePath + 'pokemon_images', false, /\.png$/)
const pokeTypes = require.context(imagePath + 'types_small', false, /\.png$/)

export const getPokemonImage = (name) => {
  const pokemon = allPokemon?.find(poke => poke?.name === name)
  if (!pokemon) { return }
  // Ensures 3 Chars by Adding 0
  const padded = pokemon?.dexNum?.toString()?.padStart(3, '0')
  // Returns Pokemon's Image Path
  return pokeImages(`./${padded}-${name + png}`)
}

export const getTypeImage = (type) => {
  if (!type) { return }
  // Returns Types Image Path
  return pokeTypes(`./${type + png}`)
}