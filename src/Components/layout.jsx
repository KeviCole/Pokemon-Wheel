import { Grid, Tab, Tabs, Typography, useMediaQuery } from '@mui/material'
import { useState } from 'react'
import background from '../Images/nature2.jpg'
import InfoBox from './infoBox/infoBox'
import Wheel from './wheel'

export const Layout = ({ children }) => {
  const [wheelResult, setWheelResult] = useState(null)
  const below1105 = useMediaQuery('(max-width:1103px)')
  const [tabIndex, setTabIndex] = useState(0)

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
          border: '2px solid',
          borderColor: 'black',
          borderRadius: 2,
          p: 2,
          textAlign: 'left',
          backgroundColor: '#FF304F',
          position: 'relative'
        }}
        container
        spacing={1}
        mt={below1105 ? 2 : 1}
      >
        <Tabs
          value={tabIndex}
          onChange={(_, newValue) => setTabIndex(newValue)}
          textColor='inherit'
          sx={{
            position: 'absolute',
            top: -30,
            left: 8,
            '& .MuiTab-root': {
              backgroundColor: '#FF304F',
              border: '2px solid',
              borderColor: 'black',
              borderBottom: 'none',
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              mr: 1,
              minHeight: 28,
              minWidth: 'auto',
              px: 1.5,
              py: 0.5,
              fontSize: '0.8rem'
            },
            '& .MuiTabs-indicator': {
              display: 'none'
            }
          }}
        >
          <Tab label='Poke Info'/>
          <Tab label='Poke Gens'/>
          <Tab label='Poke Filters'/>
        </Tabs>
        {tabIndex === 0 && <InfoBox wheelResult={wheelResult}/>}
      </Grid>
    </Grid>
    {children}
  </Grid>
}

export default Layout