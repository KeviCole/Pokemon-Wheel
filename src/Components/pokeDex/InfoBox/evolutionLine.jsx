import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Grid, Tooltip } from '@mui/material'
import React from 'react'

export const EvolutionLine = ({ below400, matches, evolutionLine }) =>
  <Grid container alignItems='center' justifyContent='center' spacing={matches ? 1 : 2}>
    {evolutionLine.map(({ name, image }, i) => (
      <React.Fragment key={i}>
        <Grid mb={name ? 0 : 1}>
          <Tooltip
            title={name}
            slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -10] } }] } }}
            arrow
            disableInteractive
          >
            <img src={image} alt={name} width={below400 ? 30 : 40} height={below400 ? 30 : 40}/>
          </Tooltip>
        </Grid>
        {i < evolutionLine.length - 1 && <ArrowRightAltIcon fontSize='large'/>}
      </React.Fragment>
    ))}
  </Grid>

export default EvolutionLine