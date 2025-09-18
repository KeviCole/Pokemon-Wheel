import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Grid, Tooltip } from '@mui/material'
import React from 'react'
import { weirdEvoCheck } from '../../../Constants/evolutionName'

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
        return <>
          <Grid size={1.5}>
            <Tooltip
              title={name}
              slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -10] } }] } }}
              arrow
              disableInteractive
            >
              <img src={image} alt={name} width={below400 ? 30 : 40} height={below400 ? 30 : 40}/>
            </Tooltip>
          </Grid>
          <Grid size={1.5}>
            <ArrowRightAltIcon fontSize='large'/>
          </Grid>
          {index === 1 && <>
            {evolutionLine.slice(2, evolutionLine.length).map(evo => <Grid size={1.5}>
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
            </Grid>)}
          </>}
        </>
      case 2:
      case 3:
      case 4:
        return <Grid
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
              />
            </Tooltip>
          </Grid>
          )}
        </Grid>
      case 5:
        return <Grid
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
      case 6:
        return <Grid
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
      default:
        return <>
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
          {index < evolutionLine.length - 1 && <ArrowRightAltIcon fontSize='large'/>}
        </>
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