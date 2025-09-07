import { Divider, Grid, MenuItem, Select } from '@mui/material'
import { useState } from 'react'
import { GameLayout } from '..'
import { gameLogos, generationArray } from '../../../Constants/pokemonGenLogos'

export const GenerationBox = ({ game, setGame, generation, setGeneration, noiseAnimate, whiteNoise }) => {
  const firstGameLogos = gameLogos.slice(0, 10)
  const secondGameLogos = gameLogos.slice(10)
  const [isHovered, setIsHovered] = useState(null)
  const checkGold = id => isHovered === id || game === id ? 'gold' : 'silver'

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
        },
        '& .MuiOutlinedInput-notchedOutline': {
          border: 'none'
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
    {firstGameLogos.map((logo) =>
      <GameLayout
        checkGold={checkGold}
        logo={logo}
        noiseAnimate={noiseAnimate}
        setGame={setGame}
        setIsHovered={setIsHovered}
        whiteNoise={whiteNoise}
      />
    )}
    {secondGameLogos.map((logo) =>
      <GameLayout
        checkGold={checkGold}
        logo={logo}
        noiseAnimate={noiseAnimate}
        setGame={setGame}
        setIsHovered={setIsHovered}
        whiteNoise={whiteNoise}
      />
    )}
  </Grid>
}

export default GenerationBox