import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Grid } from '@mui/material'
import React from 'react'

export const EvolutionLine = ({ below400, matches, evolutionLine }) =>
  <Grid container alignItems='center' justifyContent='center' spacing={matches ? 1 : 2}>
    {evolutionLine.map((stage, i) => (
      <React.Fragment key={i}>
        <Grid>
          <img src={stage.image} alt={stage.name} width={below400 ? 30 : 40} height={below400 ? 30 : 40}/>
        </Grid>
        {i < evolutionLine.length - 1 && <ArrowRightAltIcon fontSize='large'/>}
      </React.Fragment>
    ))}
  </Grid>

export default EvolutionLine