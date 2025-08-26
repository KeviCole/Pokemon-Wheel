import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import {
  Box,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
  useMediaQuery
} from '@mui/material'
import React, { useEffect, useMemo, useRef } from 'react'
import pikaPng from '../Images/pikachu.png'
import pikaGif from '../Images/pikachubby.gif'
import bugType from '../Images/types_small/Bug.png'
import electricType from '../Images/types_small/Electric.png'


const InfoBox = () => {
  const evolutionLine = [
    { name: 'Pichu', image: pikaPng },
    { name: 'Pikachu', image: pikaPng },
    { name: 'Raichu', image: pikaPng },
  ]
  const statsMax = [250, 134, 180, 154, 125, 140]
  const betweenMdAnd1100 = useMediaQuery('(min-width:900px) and (max-width:1100px)')
  const below500 = useMediaQuery('(max-width:500px)')
  const below400 = useMediaQuery('(max-width:400px')
  const matches = below500 || betweenMdAnd1100
  const amountOfTypes = 2
  const twoTypes = amountOfTypes > 1
  const images = useMemo(() => [pikaGif, pikaPng, pikaGif, pikaPng, pikaGif, pikaPng], [])

  const StatBar = ({ statId, statNum, color }) => {
    const canvasRef = useRef(null)

    useEffect(() => {
      const c = canvasRef.current
      if (!c) { return }
      const ctx = c.getContext('2d')

      const length = 180
      ctx.clearRect(0, 0, 190, 10)

      let maxStat = 0
      switch (statId) {
        case 'hp':
          maxStat = statsMax[0]
          break
        case 'attack':
          maxStat = statsMax[1]
          break
        case 'defense':
          maxStat = statsMax[2]
          break
        case 'sp_atk':
          maxStat = statsMax[3]
          break
        case 'sp_def':
          maxStat = statsMax[4]
          break
        case 'speed':
          maxStat = statsMax[5]
          break
        default:
          maxStat = 100
      }

      const decimal = statNum / maxStat
      const finalLen = length * decimal

      ctx.fillStyle = color
      ctx.fillRect(0, 0, finalLen, 10)
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
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <ImageList cols={1} gap={matches ? 70 : 30}>
        {images.map((tree, i) =>
          <ImageListItem
            key={i}
            sx={{
              border: '2px solid black',
              borderRadius: 0,
              width: matches ? 30 : 45,
              height: matches ? 30 : 45,
            }}
          >
            <img
              src={tree}
              alt='Pokemon'
              loading='lazy'
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </ImageListItem>
        )}
      </ImageList>
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
                  <img src={stage.image} alt={stage.name} width={below400 ? 30 : 40} height={below400 ? 30 : 40}/>
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
              <Box sx={{ fontWeight: 'bold' }}>Stats</Box>
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