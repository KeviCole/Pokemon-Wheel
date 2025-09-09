import { ImageList, ImageListItem, keyframes } from '@mui/material'
import { useEffect } from 'react'

export const PokemonSelection = ({ images, matches, currentPokemon, setCurrentPokemon }) => {
  // Animation for Clickable Readability
  const flash = keyframes`
    0% {
        background-color: white;
    }
    100% {
        background-color: #d3d3d3;
    }
  `
  useEffect(() => {
    const handleKeyPress = (event) => {
      event.preventDefault()
      const { key } = event
      setCurrentPokemon(prev => {
        if (key === 'ArrowUp' && prev !== 0) {
          return prev - 1
        }
        if (key === 'ArrowDown' && prev !== 5) {
          return prev + 1
        }
        return prev
      })
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [setCurrentPokemon])

  return <ImageList cols={1} gap={matches ? 70 : 30}>
    {images.map((pokeImg, i) =>
      <ImageListItem
        key={i}
        sx={{
          border: '2px solid black',
          borderRadius: 0,
          width: matches ? 30 : 45,
          height: matches ? 30 : 45,
          animation: `${flash} 1s infinite alternate`,
          backgroundColor: currentPokemon === i ? 'gold !important' : 'inherit',
          cursor: 'pointer'
        }}
        onClick={() => setCurrentPokemon(i)}
      >
        <img
          src={pokeImg}
          alt='Pokemon'
          loading='lazy'
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </ImageListItem>
    )}
  </ImageList>
}
export default PokemonSelection