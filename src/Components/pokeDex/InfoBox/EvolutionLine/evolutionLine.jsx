import { Grid } from '@mui/material'
import React from 'react'
import { ApplinEvoLine, DefaultEvoLine, EeveeEvoLine, RaltsEvoLine, WurmpleEvoLine } from '../..'
import { weirdEvoCheck } from '../../../../Constants/evolutionName'

export const EvolutionLine = ({ below400, evolutionLine, gen, matches, setWheelResult }) => {
  const uniqueEvo = weirdEvoCheck[evolutionLine[0].name] ?? 0

  const evoArraySize = () => {
    if (uniqueEvo === 1) {
      return 1
    }
    if (uniqueEvo >= 2 && uniqueEvo <= 6) {
      return 1
    }
    return evolutionLine.length
  }

  const EvolutionLayout = ({ name, image, index }) => {
    switch (uniqueEvo) {
      case 1:
        return <RaltsEvoLine
          below400={below400}
          evolutionLine={evolutionLine}
          gen={gen}
          image={image}
          index={index}
          name={name}
          setWheelResult={setWheelResult}
        />
      case 2:
      case 3:
      case 4:
        return <EeveeEvoLine
          below400={below400}
          evolutionLine={evolutionLine}
          gen={gen}
          image={image}
          name={name}
          setWheelResult={setWheelResult}
          uniqueEvo={uniqueEvo}
        />
      case 5:
        return <WurmpleEvoLine
          below400={below400}
          evolutionLine={evolutionLine}
          gen={gen}
          image={image}
          name={name}
          setWheelResult={setWheelResult}
        />
      case 6:
        return <ApplinEvoLine
          below400={below400}
          evolutionLine={evolutionLine}
          gen={gen}
          image={image}
          name={name}
          setWheelResult={setWheelResult}
        />
      default:
        return <DefaultEvoLine
          below400={below400}
          evolutionLine={evolutionLine}
          gen={gen}
          image={image}
          index={index}
          name={name}
          setWheelResult={setWheelResult}
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