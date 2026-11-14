import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { Divider, Grid, MenuItem, Pagination, PaginationItem } from '@mui/material'
import { useState } from 'react'
import { GameLayout } from '..'
import { gameLogos, generationArray } from '../../../Constants/pokemonGenLogos'
import { MultiSelect } from './MultiSelect'

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

  const noiseLayer = {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundImage: `url(${whiteNoise})`,
    backgroundRepeat: 'repeat',
    opacity: '10%',
    pointerEvents: 'none',
    animation: `${noiseAnimate} 0.25s infinite steps(4)`,
    zIndex: 2
  }

  const retroSurface = {
    backgroundColor: 'whiteSmoke',
    border: '2px solid',
    borderColor: 'black',
    borderRadius: 2,
    overflow: 'hidden',
    '&::before': noiseLayer
  }

  return <Grid container size={12} spacing={2} justifyContent='flex-start' sx={{ minHeight: '500px' }}>
    <MultiSelect
      value={generation}
      fullWidth
      onChange={({ target: { value } }) => {
        const includesAll = value.includes('all')
        if ((includesAll && !generation.includes('all')) || !value.length) {
          setGeneration(['all'])
          return
        }
        if (includesAll) {
          setGeneration(value.filter(gen => gen !== 'all'))
          return
        }
        if (value.length === generationArray.length) {
          setGeneration(['all'])
          return
        }
        setGeneration(value)
      }}
      sx={{
        ...retroSurface,
        position: 'relative',
        '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
      }}
      MenuProps={{
        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
        transformOrigin: { vertical: 'top', horizontal: 'left' },
        marginThreshold: 8,
        slotProps: {
          paper: {
            sx: {
              ...retroSurface,
              width: 0,
              mt: 4.5
            }
          },
          list: {
            sx: { py: 0, maxHeight: 375, overflowY: 'auto' }
          }
        }
      }}
    >
      <MenuItem value='all'>All Generations</MenuItem>
      {generationArray.map((gen, index) =>
        <MenuItem value={index+1}>{gen}</MenuItem>)
      }
    </MultiSelect>
    <Grid size={12}>
      <Divider sx={{ border: '1px solid', borderColor: 'black', borderRadius: 1 }}/>
    </Grid>
    <Grid container size={12} sx={{ minHeight: '375px' }}>
      {gameLogoPages[page].map((logo) => (
        <GameLayout
          key={logo.id}
          checkGold={checkGold}
          logo={logo}
          noiseAnimate={noiseAnimate}
          game={game}
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