import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import { Box, Grid, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useRef } from 'react'
import pikaPng from '../Images/pikachu.png'
import pikaGif from '../Images/pikachubby.gif'
import bugType from '../Images/types_small/Bug.png'
import electricType from '../Images/types_small/Electric.png'


const InfoBox = () => {
  const canvasRef = useRef(null)
  const evolutionLine = [
    { name: 'Pichu', image: pikaPng },
    { name: 'Pikachu', image: pikaPng },
    { name: 'Raichu', image: pikaPng },
  ]
  const stats_max = [250, 134, 180, 154, 125, 140]
  const betweenMdAnd1100 = useMediaQuery('(min-width:900px) and (max-width:1100px)')
  const below500 = useMediaQuery('(max-width:500px)')
  const below400 = useMediaQuery('(max-width:400px')
  const matches = below500 || betweenMdAnd1100
  const amountOfTypes = 2
  const twoTypes = amountOfTypes > 1

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = 'black'
    ctx.lineJoin = 'bevel'
    ctx.lineWidth = 5

    const images = [pikaGif, pikaPng, pikaGif, pikaPng, pikaGif, pikaPng]

    const rectWidth = 45
    const rectHeight = 45
    const spacing = 30

    images.forEach((src, i) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        const y = i * (rectHeight + spacing) + 5
        ctx.drawImage(img, 5, y, rectWidth, rectHeight)
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.strokeRect(5, y, rectWidth, rectHeight)
      }
    })
  }, [])

  const StatBar = ({ statId, statNum, color }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
      const c = canvasRef.current
      if (!c) return
      const ctx = c.getContext('2d')

      const length = 180
      ctx.clearRect(0, 0, 190, 10)

      let max_stat = 0
      switch (statId) {
        case 'hp':
          max_stat = stats_max[0]
          break
        case 'attack':
          max_stat = stats_max[1]
          break
        case 'defense':
          max_stat = stats_max[2]
          break
        case 'sp_atk':
          max_stat = stats_max[3]
          break
        case 'sp_def':
          max_stat = stats_max[4]
          break
        case 'speed':
          max_stat = stats_max[5]
          break
        default:
          max_stat = 100
      }

      const decimal = statNum / max_stat
      const final_len = length * decimal

      ctx.fillStyle = color
      ctx.fillRect(0, 0, final_len, 10)
    }, [statId, statNum, color])

    return <canvas ref={canvasRef} width={200} height={12}></canvas>
  }

  return <>
      <Grid
        size={2}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <canvas ref={canvasRef} width={60} height={440}>
          Box outline of images of pokemon chosen.
        </canvas>
      </Grid>
      <Grid size={10}>
        <Grid container size={12} display='flex' flexDirection='column' spacing={1}>
          <Grid size={12} p={1} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
            <Grid container alignItems='center' size={12}>
              <Grid size={twoTypes && matches ? 2 : 4}>
                <Typography variant={below400 ? 'h7' : 'h6'}>
                  <Box sx={{ fontWeight: 'bold' }}>#1</Box>
                </Typography>
              </Grid>

              <Grid
                container
                size={6}
                justifyContent={twoTypes && matches ? 'center' : 'space-between'}
                alignItems='center'
              >
                {twoTypes && !matches ? <>
                    <Grid container size={5} justifyContent='center'>
                      <Typography variant='h6'>
                        <Box sx={{ fontWeight: 'bold' }}>Crabominable</Box>
                      </Typography>
                    </Grid>
                    <Grid container size={1} justifyContent='flex-end' pr={1}>
                      {twoTypes && <img src={electricType} alt='Electric Type' style={{ width: 50, height: 20 }}/>}
                    </Grid>
                  </>
                  :
                  <Typography variant={below400 ? 'h7' : 'h6'}>
                    <Box sx={{ fontWeight: 'bold' }}>Crabominable</Box>
                  </Typography>
                }
              </Grid>

              <Grid
                container
                size={twoTypes && matches ? 4 : 2}
                display='flex'
                justifyContent={twoTypes && matches ? 'flex-end' : 'flex-start'}
                spacing={1}
                pr={1}
              >
                <img src={bugType} alt='Bug Type' style={{ width: 50, height: 20 }}/>
                {twoTypes && matches &&
                  <img src={electricType} alt='Electric Type' style={{ width: 50, height: 20 }}/>
                }
              </Grid>
            </Grid>
          </Grid>

          <Grid container size={12} justifyContent='center'>
            <img src={pikaPng} alt='Pikachu' style={{ height: 150, width: 150 }} />
          </Grid>

          <Grid size={12}>
            <Grid container alignItems='center' justifyContent='center' spacing={matches ? 1 : 2}>
              {evolutionLine.map((stage, i) => (
                <React.Fragment key={i}>
                  <Grid>
                    <img src={stage.image} alt={stage.name} width={40} height={40}/>
                  </Grid>
                  {i < evolutionLine.length - 1 && (
                    <Grid>
                      <ArrowRightAltIcon fontSize='large' />
                    </Grid>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
          <Grid container size={12}>
            <Grid container size={6} justifyContent='flex-end'>
              <Typography variant='h6'>
                <Box sx={{ fontWeight: 'bold'}}>Stats</Box>
              </Typography>
            </Grid>
            <Grid
              container
              size={12}
              justifyContent='space-evenly'
              display='flex'
              flexDirection={matches ? 'column' : 'row'}
            >
              <Grid container direction='column' spacing={1} size={4}>
                <Grid size={12}>
                  <Typography variant='body2'>
                    <Box sx={{ fontWeight: 'bold' }}>HP</Box>
                  </Typography>
                  <StatBar statId='hp' statNum={120} color='#04d400'/>
                </Grid>
                <Grid size={12}>
                  <Typography variant='body2'>
                    <Box sx={{ fontWeight: 'bold' }}>Attack</Box>
                  </Typography>
                  <StatBar statId='attack' statNum={95} color='#f70000'/>
                </Grid>
                <Grid size={12}>
                  <Typography variant='body2'>
                    <Box sx={{ fontWeight: 'bold' }}>Defense</Box>
                  </Typography>
                  <StatBar statId='defense' statNum={70} color='#0012db'/>
                </Grid>
              </Grid>
              <Grid container direction='column' spacing={1} size={4}>
                <Grid size={12}>
                  <Typography variant='body2'>
                    <Box sx={{ fontWeight: 'bold' }}>Sp. Atk</Box>
                  </Typography>
                  <StatBar statId='sp_atk' statNum={85} color='#ea4fff'/>
                </Grid>
                <Grid size={12}>
                  <Typography variant='body2'>
                    <Box sx={{ fontWeight: 'bold' }}>Sp. Def</Box>
                  </Typography>
                  <StatBar statId='sp_def' statNum={80} color='#fc7723'/>
                </Grid>
                <Grid size={12}>
                  <Typography variant='body2'>
                    <Box sx={{ fontWeight: 'bold' }}>Speed</Box>
                  </Typography>
                  <StatBar statId='speed' statNum={110} color='#33daff'/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
}

export default InfoBox