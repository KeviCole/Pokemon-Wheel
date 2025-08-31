import { Box, Grid, Typography } from '@mui/material'

export const TitleBar = ({
  below400,
  checkSteelType1,
  checkSteelType2,
  matches,
  pokeDexNum,
  pokeName,
  pokeType1Image,
  pokeType2Image
}) => <Grid size={12} p={1} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
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
        <img
          src={pokeType1Image}
          alt='Type1'
          style={
            matches ?
              { width: 40, height: checkSteelType1 ? 13 : 15 } :
              { width: 50, height: checkSteelType1 ? 18 : 20, marginTop: checkSteelType1 ? 1 : 0 }
          }
        />
      }
      {pokeType2Image &&
        <img
          src={pokeType2Image}
          alt='Type2'
          style={
            matches ?
              { width: 40, height: checkSteelType2 ? 13 : 15 } :
              { width: 50, height: checkSteelType2 ? 18 : 20, marginTop: checkSteelType2 ? 1 : 0 }
          }
        />
      }
    </Grid>
  </Grid>
</Grid>

export default TitleBar