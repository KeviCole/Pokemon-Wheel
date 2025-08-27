import { gen1 } from './generations'
const images = require.context('../Images/pokemon_images', false, /\.png$/)

export const getPokemonImage = (name) => {
  const index = gen1.indexOf(name) + 1 // array is 0-based
  if (index <= 0) { return null }

  const padded = index.toString().padStart(3, '0') // 1 → "001"
  return images(`./${padded}-${name}.png`)
}