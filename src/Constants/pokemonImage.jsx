import { allPokemon } from './pokemonData'
const pokeImages = require.context('../Images/pokemon_images', false, /\.png$/)
const pokeTypes = require.context('../Images/types_small', false, /\.png$/)

export const getPokemonImage = (name) => {
  const pokemon = allPokemon?.find(poke => poke?.name === name)
  if (!pokemon) { return }
  const padded = pokemon?.dexNum?.toString()?.padStart(3, '0') // 1 → "001"
  return pokeImages(`./${padded}-${name}.png`)
}

export const getTypeImage = (type) => {
  if (!type) { return }
  return pokeTypes(`./${type}.png`)
}