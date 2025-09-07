import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { Divider, Grid, MenuItem, Pagination, PaginationItem, Select } from '@mui/material'
import { useState } from 'react'
import { GameLayout } from '..'
import { gameLogos, generationArray } from '../../../Constants/pokemonGenLogos'

export const GenerationBox = ({ game, setGame, generation, setGeneration, noiseAnimate, whiteNoise }) => {
  const firstGameLogos = gameLogos.slice(0, 10)
  const secondGameLogos = gameLogos.slice(10, 20)
  const thirdGameLogos = gameLogos.slice(20)
  const [isHovered, setIsHovered] = useState(null)
  const [page, setPage] = useState(1)
  const checkGold = id => isHovered === id || game === id ? 'gold' : 'silver'
  const gameLogoPages = {
    1: firstGameLogos,
    2: secondGameLogos,
    3: thirdGameLogos
  }

  return <Grid container size={12} spacing={2} justifyContent='flex-start' sx={{ minHeight: '70dvh' }}>
    <Select
      label='Generation'
      value={generation}
      fullWidth
      onChange={({ target: { value } }) => setGeneration(value)}
      height='fit-content'
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
      <Divider sx={{ border: '1px solid', borderColor: 'black', borderRadius: 1 }}
      />
    </Grid>
    <Grid container size={12} sx={{ minHeight: '50vh' }}>
      {gameLogoPages[page].map((logo) => (
        <GameLayout
          key={logo.id}
          checkGold={checkGold}
          logo={logo}
          noiseAnimate={noiseAnimate}
          setGame={setGame}
          setIsHovered={setIsHovered}
          whiteNoise={whiteNoise}
        />
      ))}
    </Grid>
    <Grid
      size={12}
      sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}
    >
      <Pagination
        count={3}
        variant='outlined'
        shape='rounded'
        size='small'
        sx={{
          '& .MuiPaginationItem-root': {
            backgroundColor: 'whiteSmoke',
            color: 'black',
            '&:hover': {
              backgroundColor: 'gold'
            },
            border: '1px solid',
            borderColor: 'black',
            borderRadius: 2
          },
          '& .MuiPaginationItem-root.Mui-selected': {
            backgroundColor: 'gold',
            color: 'black',
            '&:hover': {
              backgroundColor: 'gold'
            },
            border: '1px solid',
            borderColor: 'black',
            borderRadius: 2
          }
        }}
        onChange={(_, value) => setPage(value)}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBack, next: ArrowForward }}
            {...item}
          />
        )}
      />
    </Grid>
  </Grid>
}

export default GenerationBox