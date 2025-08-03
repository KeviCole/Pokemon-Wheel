import { Grid, Typography, Stack } from '@mui/material';
import Wheel from './wheel';

export const Layout = ({ children }) => <Grid p={4} textAlign='center'>
  <Typography variant='h3'>🎡 React Spinner Game</Typography>
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