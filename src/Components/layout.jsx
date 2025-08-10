import { Grid, Typography } from '@mui/material';
import Wheel from './wheel';
import image from '../Images/pikachubby.gif'

export const Layout = ({ children }) => <Grid p={4} textAlign='center'>
  <Typography variant='h3'>
    <img src={image} alt='Pikachu' style={{ height: 45 }}/>
    &nbsp;Pokemon Wheel
  </Typography>
  <Grid
    pt={2}
    display='flex'
    flexDirection='column-reverse'
    margin='auto'
    maxWidth='400px'
    alignItems='center'
  >
    <Wheel/>
  </Grid>
  {children}
</Grid>

export default Layout;