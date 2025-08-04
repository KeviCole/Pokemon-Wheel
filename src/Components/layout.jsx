import { Grid, Typography, Stack } from '@mui/material';
import Wheel from './wheel';
import image from '../Images/pikachubby.gif'

export const Layout = ({ children }) => <Grid p={4} textAlign='center'>
  <Typography variant='h3'>
    <img src={image} alt='Pikachu' style={{ height: 45 }}/>
    &nbsp;Pokemon Wheel
  </Typography>
  <Stack
    pt={2}
    display='flex'
    flexDirection='column-reverse'
    margin='auto'
    maxWidth='400px'
    alignItems='center'
  >
    <Wheel/>
  </Stack>
  {children}
</Grid>

export default Layout;