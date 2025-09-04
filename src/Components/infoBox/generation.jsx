import { Divider, Grid, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import {
  PokemonB2,
  PokemonD,
  PokemonP,
  PokemonW2,
  PokemonX,
  PokemonY
} from '../../Images/games'

export const GenerationBox = ({ generation, setGeneration, noiseAnimate, whiteNoise }) => {
  const generationArray = [
    'Generation 1',
    'Generation 2',
    'Generation 3',
    'Generation 4',
    'Generation 5',
    'Generation 6',
    'Generation 7',
    'Generation 8',
    'Generation 9'
  ]
  const logos = [
    { id: 0, images: [PokemonX, PokemonY], names: ['PokemonX', 'PokemonY'] },
    { id: 1, images: [PokemonW2, PokemonB2], names: ['PokemonW2', 'PokemonB2'] },
    { id: 2, images: [PokemonD, PokemonP], names: ['Pokemon Diamond', 'Pokemon Pearl'] }
  ]
  const half = Math.ceil(logos.length / 2)
  const firstLogos = logos.slice(0, half)
  const secondLogos = logos.slice(half)
  const [isHovered, setIsHovered] = useState(null)
  return <Grid container size={12} spacing={2}>
    <Select
      label='Generation'
      value={generation}
      fullWidth
      onChange={({ target: { value } }) => setGeneration(value)}
      sx={{
        backgroundColor: 'whiteSmoke',
        border: '2px solid',
        borderColor: 'black',
        borderRadius: 2,
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none'
        },
        position: 'relative',
        overflow: 'hidden',

        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${whiteNoise})`,
          backgroundRepeat: 'repeat',
          opacity: '10%',
          pointerEvents: 'none',
          animation: `${noiseAnimate} 0.25s infinite steps(4)`,
          zIndex: 2
        }
      }}
    >
      {generationArray.map((gen, index) =>
        <MenuItem value={index+1} disabled={generation === index+1}>{gen}</MenuItem>)
      }
    </Select>
    <Grid size={12}>
      <Divider sx={{
        border: '1px solid',
        borderColor: 'black',
        borderRadius: 1
      }}
      />
    </Grid>
    {firstLogos.map((logo) => <Grid
      container
      justifyContent='space-evenly'
      size={6}
      pt={1}
      pb={1}
      key={logo.id}
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        gap: 1,
        backgroundColor: isHovered === logo.id ? 'gold' : 'silver',
        border: '2px solid',
        borderColor: 'black',
        borderRadius: 2,
        position: 'relative',
        cursor: 'pointer',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${whiteNoise})`,
          backgroundRepeat: 'repeat',
          opacity: '10%',
          pointerEvents: 'none',
          animation: `${noiseAnimate} 0.25s infinite steps(4)`,
          zIndex: 2
        }
      }}
      onMouseEnter={() => setIsHovered(logo.id)}
      onMouseLeave={() => setIsHovered(null)}
    >
      <img src={logo.images[0]} alt='Pokemon X' style={{ height: 40 }}/>
      <img src={logo.images[1]} alt='Pokemon Y' style={{ height: 40 }}/>
    </Grid>
    )}
    {secondLogos.map((logo) => <Grid
      container
      justifyContent='space-evenly'
      size={6}
      pt={1}
      pb={1}
      key={logo.id}
      sx={{
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        gap: 1,
        backgroundColor: isHovered === logo.id ? 'gold' : 'silver',
        border: '2px solid',
        borderColor: 'black',
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: `url(${whiteNoise})`,
          backgroundRepeat: 'repeat',
          opacity: '10%',
          pointerEvents: 'none',
          animation: `${noiseAnimate} 0.25s infinite steps(4)`,
          zIndex: 2
        }
      }}
      onMouseEnter={() => setIsHovered(logo.id)}
      onMouseLeave={() => setIsHovered(null)}
    >
      <img src={logo.images[0]} alt='Pokemon X' style={{ height: 40 }}/>
      <img src={logo.images[1]} alt='Pokemon Y' style={{ height: 40 }}/>
    </Grid>
    )}
  </Grid>
}

export default GenerationBox