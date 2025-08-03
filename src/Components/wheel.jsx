import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import '../Modules-CSS/wheel.css'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig']

const Wheel = () => {
  const [selected, setSelected] = useState(null)

  const spin = () => {
    const index = Math.floor(Math.random() * items.length)
    setSelected(items[index])
  }

  return <>
  <Grid pt={2}>
    <Button sx={{ border: 1 }} onClick={spin}>
      Spin the Wheel
    </Button>
    {selected && <p style={{ pt: 3 }}>🎉 You got: {selected}</p>}
  </Grid>
  <Grid className='circle'>
    Tree
  </Grid>
  </>
};

export default Wheel;