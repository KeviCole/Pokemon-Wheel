import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Grid, Tooltip } from '@mui/material'

export const ApplinEvoLine = ({ below400, evolutionLine, image, name }) => <Grid
  container
  justifyContent='center'
  alignItems='center'
  sx={{
    overflowX: 'auto',
    overflowY: 'hidden',
    flexWrap: 'nowrap',
    '&::-webkit-scrollbar': { display: 'none' }
  }}
>
  <Grid>
    <Tooltip
      title={name}
      slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -10] } }] } }}
      arrow
      disableInteractive
    >
      <img src={image} alt={name} width={below400 ? 30 : 40} height={below400 ? 30 : 40}/>
    </Tooltip>
  </Grid>
  <Grid>
    <ArrowRightAltIcon fontSize='large'/>
  </Grid>
  {evolutionLine.slice(1, 3).map(evo => <>
    <Grid>
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
        />
      </Tooltip>
    </Grid>
  </>)}
  <Grid>
    <Tooltip
      title={name}
      slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -10] } }] } }}
      arrow
      disableInteractive
    >
      <img src={image} alt={name} width={below400 ? 30 : 40} height={below400 ? 30 : 40}/>
    </Tooltip>
  </Grid>
  <Grid>
    <ArrowRightAltIcon fontSize='large'/>
  </Grid>
  {evolutionLine.slice(3, evolutionLine.length).map((evo, i) => <>
    <Grid>
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
        />
      </Tooltip>
    </Grid>
    {i === 0 && <Grid>
      <ArrowRightAltIcon fontSize='large'/>
    </Grid>
    }
  </>)}
</Grid>

export default ApplinEvoLine