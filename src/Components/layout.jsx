import { Grid, Typography } from '@mui/material'
import { useState } from 'react'
import image from '../Images/pikachubby.gif'
import InfoBox from './infoBox/infoBox'
import Wheel from './wheel'
import background from '../Images/nature2.jpg'

export const Layout = ({ children }) => {
  const [wheelResult, setWheelResult] = useState(null)

  return <Grid p={4} textAlign='center' sx={{ backgroundImage: `url(${background})` }}>
    <Typography variant='h3'>
      <img src={image} alt='Pikachu' style={{ height: 45 }}/>
        &nbsp;Pokemon Wheel
    </Typography>

    <Grid
      container
      pt={2}
      spacing={2}
      justifyContent='center'
      alignItems='flex-start'
    >
      {/* Wheel */}
      <Grid size='auto'>
        <Wheel setWheelResult={setWheelResult}/>
      </Grid>

      {/* Info Box */}
      <Grid
        size={{ xs: 12, md: 5 }}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
          p: 2,
          textAlign: 'left',
          backgroundColor: '#FF304F'
        }}
        container
        spacing={1}
      >
        <InfoBox wheelResult={wheelResult}/>
      </Grid>
    </Grid>
    {children}
  </Grid>
}

export default Layout