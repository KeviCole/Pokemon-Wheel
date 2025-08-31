import { ImageList, ImageListItem, keyframes } from '@mui/material'

export const PokemonSelection = ({ images, matches }) => {
  const flash = keyframes`
    0% {
        background-color: white;
    }
    100% {
        background-color: #d3d3d3;
    }
  `
  return <ImageList cols={1} gap={matches ? 70 : 30}>
    {images.map((pokeImg, i) =>
      <ImageListItem
        key={i}
        sx={{
          border: '2px solid black',
          borderRadius: 0,
          width: matches ? 30 : 45,
          height: matches ? 30 : 45,
          animation: `${flash} 1s infinite alternate`
        }}
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