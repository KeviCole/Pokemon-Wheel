import { Box, Grid, Typography } from '@mui/material'
import { StatBar } from '../../infoBox'

export const PokemonStats = ({ matches, noiseAnimate, statsBase, statsMax, whiteNoise }) => {
  const totalBase = statsBase.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  return <Grid
    container
    size={12}
    spacing={1}
    sx={{
      border: '2px solid',
      borderColor: 'black',
      borderRadius: 2,
      backgroundColor: 'whiteSmoke',
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
    <Grid container size={12} justifyContent='center'>
      <Typography variant='h6'>
        <Box sx={{ fontWeight: 'bold' }}>Stats</Box>
      </Typography>
    </Grid>
    <Grid
      container
      size={12}
      justifyContent='space-evenly'
      display='flex'
      flexDirection={matches ? 'column' : 'row'}
    >
      <Grid container direction='column' spacing={1} size={4}>

        <Grid size={12}>
          <Typography variant='body2'>
            <Box sx={{ fontWeight: 'bold' }}>HP</Box>
          </Typography>
          <StatBar statId='hp' statsMax={statsMax} statNum={statsBase[0]} color='#04d400'/>
        </Grid>
        <Grid size={12}>
          <Typography variant='body2'>
            <Box sx={{ fontWeight: 'bold' }}>Attack</Box>
          </Typography>
          <StatBar statId='attack' statsMax={statsMax} statNum={statsBase[1]} color='#f70000'/>
        </Grid>
        <Grid size={12}>
          <Typography variant='body2'>
            <Box sx={{ fontWeight: 'bold' }}>Defense</Box>
          </Typography>
          <StatBar statId='defense' statsMax={statsMax} statNum={statsBase[2]} color='#0012db'/>
        </Grid>
        {!matches && <Grid size={12}>
          <Typography variant='h7'>
            <Box sx={{ fontWeight: 'bold' }}>Total: {totalBase}</Box>
          </Typography>
        </Grid>
        }
      </Grid>

      <Grid container direction='column' spacing={1} size={4}>
        <Grid size={12}>
          <Typography variant='body2'>
            <Box sx={{ fontWeight: 'bold' }}>Sp. Atk</Box>
          </Typography>
          <StatBar statId='sp_atk' statsMax={statsMax} statNum={statsBase[3]} color='#ea4fff'/>
        </Grid>
        <Grid size={12}>
          <Typography variant='body2'>
            <Box sx={{ fontWeight: 'bold' }}>Sp. Def</Box>
          </Typography>
          <StatBar statId='sp_def' statsMax={statsMax} statNum={statsBase[4]} color='#fc7723'/>
        </Grid>
        <Grid size={12}>
          <Typography variant='body2'>
            <Box sx={{ fontWeight: 'bold' }}>Speed</Box>
          </Typography>
          <StatBar statId='speed' statsMax={statsMax} statNum={statsBase[5]} color='#33daff'/>
        </Grid>
        {matches && <Grid size={12}>
          <Typography variant='h7'>
            <Box sx={{ fontWeight: 'bold' }}>Total: {totalBase}</Box>
          </Typography>
        </Grid>
        }
      </Grid>
    </Grid>
  </Grid>
}

export default PokemonStats