import { Divider, Grid, MenuItem, Select, Tooltip } from '@mui/material'
import { useState } from 'react'
import { gameLogos, generationArray } from '../../Constants/pokemonGenLogos'

export const GenerationBox = ({ game, setGame, generation, setGeneration, noiseAnimate, whiteNoise }) => {
  const half = Math.ceil(gameLogos.length / 2)
  const firstGameLogos = gameLogos.slice(0, half)
  const secondGameLogos = gameLogos.slice(half)
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
      <Tooltip
        title={`${logo.names[0]} ${logo.names.length > 1 ? `& ${logo.names[1].split('Pokemon ')[1]}` : ''}`}
        slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -16] } }] } }}
        arrow
        disableInteractive
      >
        <Grid
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
            backgroundColor: checkGold(logo.id),
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
          onClick={() => setGame(logo.id)}
        >
          <img src={logo.images[0]} alt={logo.names[0]} style={{ height: 40 }}/>
          {logo.images.length > 1 &&
            <img src={logo.images[1]} alt={logo.names[1]} style={{ height: 40 }}/>
          }
        </Grid>
      </Tooltip>
    )}
    {secondGameLogos.map((logo) =>
      <Tooltip
        title={`${logo.names[0]} ${logo.names.length > 1 ? `& ${logo.names[1].split('Pokemon ')[1]}` : ''}`}
        slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -16] } }] } }}
        arrow
        disableInteractive
      >
        <Grid
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
            backgroundColor: checkGold(logo.id),
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
          onClick={() => setGame(logo.id)}
        >
          <img src={logo.images[0]} alt={logo.names[0]} style={{ height: 40 }}/>
          {logo.images.length > 1 &&
            <img src={logo.images[1]} alt={logo.names[1]} style={{ height: 40 }}/>
          }
        </Grid>
      </Tooltip>
    )}
  </Grid>
}

export default GenerationBox