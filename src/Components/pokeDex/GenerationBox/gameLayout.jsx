import { Grid, Tooltip } from '@mui/material'

export const GameLayout = ({
  logo: { id, images, names },
  checkGold,
  whiteNoise,
  noiseAnimate,
  setIsHovered,
  setGame
}) => <Tooltip
  title={`${names[0]} ${names.length > 1 ? `& ${names[1].split('Pokemon ')[1]}` : ''}`}
  slotProps={{ popper: { modifiers: [{ name: 'offset', options: { offset: [0, -16] } }] } }}
  arrow
  disableInteractive
>
  <Grid
    container
    justifyContent='space-evenly'
    size={6}
    pt={1}
    pb={1}
    key={id}
    sx={{
      display: 'flex',
      flexWrap: 'nowrap',
      overflowX: 'auto',
      gap: 1,
      backgroundColor: checkGold(id),
      border: '2px solid',
      borderColor: 'black',
      borderRadius: 2,
      position: 'relative',
      cursor: 'pointer',
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${whiteNoise})`,
        backgroundRepeat: 'repeat',
        opacity: '10%',
        pointerEvents: 'none',
        animation: `${noiseAnimate} 0.25s infinite steps(4)`,
        zIndex: 2
      }
    }}
    onMouseEnter={() => setIsHovered(id)}
    onMouseLeave={() => setIsHovered(null)}
    onClick={() => setGame(id)}
  >
    <img src={images[0]} alt={names[0]} style={{ height: 40 }}/>
    {images.length > 1 &&
      <img src={images[1]} alt={names[1]} style={{ height: 40 }}/>
    }
  </Grid>
</Tooltip>

export default GameLayout