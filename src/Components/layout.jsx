import { Grid, Typography, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import background from '../Images/nature2.jpg'
import InfoBox from './infoBox/infoBox'
import Wheel from './wheel'

export const Layout = ({ children }) => {
  const [wheelResult, setWheelResult] = useState(null)
  const below1105 = useMediaQuery('(max-width:1105px)')

  return <Grid
    p={4}
    textAlign='center'
    sx={{
      backgroundImage: `url(${background})`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }}>
    <Typography variant='h3'>
      Pokemon Wheel
    </Typography>

    <Grid
      container
      pt={2}
      spacing={2}
      justifyContent='center'
      alignItems='flex-start'
      mt={below1105 ? 3 : 1}
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