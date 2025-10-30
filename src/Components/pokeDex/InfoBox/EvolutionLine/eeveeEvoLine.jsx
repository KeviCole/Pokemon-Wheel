import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Grid, Tooltip } from '@mui/material'

export const EeveeEvoLine = ({ below400, evolutionLine, gen, image, name, setWheelResult, uniqueEvo }) => <Grid
  container
  size={12}
  justifyContent='center'
  alignItems='center'
  sx={{
    overflowX: 'auto',
    overflowY: 'hidden',
    flexWrap: 'nowrap',
    '&::-webkit-scrollbar': { display: 'none' }
  }}
>
  <Grid size={1.5}>
    <Tooltip
      title={name}
      slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -10] } }] } }}
      arrow
      disableInteractive
    >
      <img
        src={image}
        alt={name}
        width={below400 ? 30 : 40}
        height={below400 ? 30 : 40}
        onClick={() => setWheelResult(gen.find(poke => poke.name === name))}
        style={{ cursor: 'pointer' }}
      />
    </Tooltip>
  </Grid>
  <Grid size={1.5}>
    <ArrowRightAltIcon fontSize='large'/>
  </Grid>
  {evolutionLine.slice(1, evolutionLine.length).map(evo => <Grid size={uniqueEvo === 4 ? 1.125 : 1.5}>
    <Tooltip
      title={evo.name}
      slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -10] } }] } }}
      arrow
      disableInteractive
    >
      <img
        src={evo.image}
        alt={evo.name}
        width={below400 ? 30 : 40}
        height={below400 ? 30 : 40}
        onClick={() => setWheelResult(gen.find(poke => poke.name === evo.name))}
        style={{ cursor: 'pointer' }}
      />
    </Tooltip>
  </Grid>
  )}
</Grid>

export default EeveeEvoLine