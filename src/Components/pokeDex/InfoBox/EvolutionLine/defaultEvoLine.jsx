import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Grid, Tooltip } from '@mui/material'

export const DefaultEvoLine = ({ below400, evolutionLine, gen, image, index, name, setWheelResult }) => <>
  <Grid mb={name ? 0 : 1}>
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
  {index < evolutionLine.length - 1 && <ArrowRightAltIcon fontSize='large'/>}
</>

export default DefaultEvoLine