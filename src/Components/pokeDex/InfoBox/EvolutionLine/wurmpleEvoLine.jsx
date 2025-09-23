import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Grid, Tooltip } from '@mui/material'

export const WurmpleEvoLine = ({ below400, evolutionLine, image, name }) => <Grid
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
  {evolutionLine.slice(1, evolutionLine.length).map((evo, i) => <>
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
    {i === 1 && <>
      <Grid>
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
          />
        </Tooltip>
      </Grid>
    </>}
    {i !== 3 && <Grid>
      <ArrowRightAltIcon fontSize='large'/>
    </Grid>
    }
  </>)}
</Grid>

export default WurmpleEvoLine