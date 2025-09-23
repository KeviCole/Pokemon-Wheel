import { Grid } from '@mui/material'
import React from 'react'
import { ApplinEvoLine, DefaultEvoLine, EeveeEvoLine, RaltsEvoLine, WurmpleEvoLine } from '../..'
import { weirdEvoCheck } from '../../../../Constants/evolutionName'

export const EvolutionLine = ({ below400, matches, evolutionLine }) => {
  const uniqueEvo = weirdEvoCheck[evolutionLine[0].name] ?? 0

  const evoArraySize = () => {
    switch (uniqueEvo) {
      case 1:
        return 2
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return 1
      default:
        return evolutionLine.length
    }
  }

  const EvolutionLayout = ({ name, image, index }) => {
    switch (uniqueEvo) {
      case 1:
        return <RaltsEvoLine
          below400={below400}
          evolutionLine={evolutionLine}
          image={image}
          index={index}
          name={name}
        />
      case 2:
      case 3:
      case 4:
        return <EeveeEvoLine
          below400={below400}
          evolutionLine={evolutionLine}
          image={image}
          name={name}
          uniqueEvo={uniqueEvo}
        />
      case 5:
        return <WurmpleEvoLine
          below400={below400}
          evolutionLine={evolutionLine}
          image={image}
          name={name}
        />
      case 6:
        return <ApplinEvoLine
          below400={below400}
          evolutionLine={evolutionLine}
          image={image}
          name={name}
        />
      default:
        return <DefaultEvoLine
          below400={below400}
          evolutionLine={evolutionLine}
          image={image}
          index={index}
          name={name}
        />
    }
  }

  return <Grid container alignItems='center' justifyContent='center' spacing={matches ? 1 : 2}>
    {evolutionLine.slice(0, evoArraySize()).map(({ name, image }, i) => (
      <React.Fragment key={i}>
        <EvolutionLayout name={name} image={image} index={i}/>
      </React.Fragment>
    ))}
  </Grid>
}

export default EvolutionLine