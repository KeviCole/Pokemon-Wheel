import { Box, Grid, Tooltip, Typography } from '@mui/material'

export const TitleBar = ({
  below400,
  matches,
  noiseAnimate,
  pokeDexNum,
  pokeName,
  pokeType1Image,
  pokeType2Image,
  type1,
  type2,
  checkSteelType1 = type1 === 'Steel',
  checkSteelType2 = type2 === 'Steel',
  whiteNoise
}) => <Grid
  container
  size={12}
  p={1}
  alignItems='center'
  sx={{
    border: '2px solid',
    borderColor: 'black',
    borderRadius: 2,
    backgroundColor: 'silver',
    position: 'relative',
    overflow: 'hidden',
    minHeight: '68px',
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
  <Grid container alignItems='center' size={12}>
    <Grid size={4}>
      <Typography variant={below400 ? 'h7' : 'h6'}>
        {pokeDexNum && <Box sx={{ fontWeight: 'bold' }}>#{pokeDexNum}</Box>}
      </Typography>
    </Grid>
    <Grid
      container
      size={4}
      justifyContent='center'
      alignItems='center'
    >
      <Grid container justifyContent='center'>
        <Typography variant={below400 ? 'h7' : 'h6'}>
          <Box sx={{ fontWeight: 'bold' }}>{pokeName}</Box>
        </Typography>
      </Grid>
    </Grid>
    <Grid
      container
      size={4}
      display='flex'
      justifyContent='flex-end'
      spacing={1}
      pr={1}
    >
      {pokeType1Image &&
        <Tooltip
          title={`${type1} Type`}
          slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -10] } }] } }}
          arrow
          disableInteractive
        >
          <img
            src={pokeType1Image}
            alt='Type1'
            style={
              matches ?
                { width: 40, height: checkSteelType1 ? 13 : 15 } :
                { width: 50, height: checkSteelType1 ? 18 : 20, marginTop: checkSteelType1 ? 1 : 0 }
            }
          />
        </Tooltip>
      }
      {pokeType2Image &&
        <Tooltip
          title={`${type2} Type`}
          slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -10] } }] } }}
          arrow
          disableInteractive
        >
          <img
            src={pokeType2Image}
            alt='Type2'
            style={
              matches ?
                { width: 40, height: checkSteelType2 ? 13 : 15 } :
                { width: 50, height: checkSteelType2 ? 18 : 20, marginTop: checkSteelType2 ? 1 : 0 }
            }
          />
        </Tooltip>
      }
    </Grid>
  </Grid>
</Grid>

export default TitleBar