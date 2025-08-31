import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'
import {
  Box,
  Grid,
  ImageList,
  ImageListItem,
  keyframes,
  Typography,
  useMediaQuery
} from '@mui/material'
import React, { useEffect, useMemo, useRef } from 'react'
import { getPokemonImage, getTypeImage } from '../Constants/pokemonImage'
import pikaPng from '../Images/pikachu.png'
import pikaGif from '../Images/pikachubby.gif'


const InfoBox = ({ wheelResult }) => {
  const {
    name: pokeName,
    dexNum: pokeDexNum,
    type1: pokeType1,
    type2: pokeType2,
    pokePNG = getPokemonImage(pokeName)
  } = wheelResult ?? {}

  const flash = keyframes`
    0% {
      background-color: white;
    }
    100% {
      background-color: #d3d3d3;
    }
  `

  const evolutionLine = [
    { name: 'Pichu', image: pokePNG ?? pikaPng },
    { name: 'Pikachu', image: pokePNG ?? pikaPng },
    { name: 'Raichu', image: pokePNG ?? pikaPng },
  ]
  const statsMax = [255, 190, 230, 180, 230, 200]
  const statsBase = [108, 130, 95, 80, 85, 102]
  const totalBase = statsBase.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  const betweenMdAnd1100 = useMediaQuery('(min-width:900px) and (max-width:1100px)')
  const below500 = useMediaQuery('(max-width:500px)')
  const below400 = useMediaQuery('(max-width:400px')
  const matches = below500 || betweenMdAnd1100
  const images = useMemo(() => [
    pokePNG, pikaPng, pikaGif, pikaPng, pikaGif, pikaPng], [pokePNG])
  const checkSteelType1 = pokeType1 === 'Steel'
  const checkSteelType2 = pokeType2 === 'Steel'

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
      ctx.fillRect(0, 0, finalLen, 20)
      ctx.fillStyle = 'black'
      ctx.textAlign = 'right'
      ctx.font = '12px Arial'
      ctx.fillText(statNum, finalLen+20, 10)
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
        {images.map((pokeImg, i) =>
          <ImageListItem
            key={i}
            sx={{
              border: '2px solid black',
              borderRadius: 0,
              width: matches ? 30 : 45,
              height: matches ? 30 : 45,
              animation: `${flash} 1s infinite alternate`
            }}
          >
            <img
              src={pokeImg}
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

            <Grid size={4}>
              <Typography variant={below400 ? 'h7' : 'h6'}>
                {pokeDexNum && <Box sx={{ fontWeight: 'bold' }}>#{pokeDexNum}</Box>}
              </Typography>
            </Grid>

            <Grid
              container
              size={4}
              justifyContent='center'
              alignItems='center'
            >
              <Grid container justifyContent='center'>
                <Typography variant={below400 ? 'h7' : 'h6'}>
                  <Box sx={{ fontWeight: 'bold' }}>{pokeName}</Box>
                </Typography>
              </Grid>
            </Grid>

            <Grid
              container
              size={4}
              display='flex'
              justifyContent='flex-end'
              spacing={1}
              pr={1}
            >
              {pokeType1 &&
                <img
                  src={getTypeImage(pokeType1)}
                  alt='Type1'
                  style={
                    matches ?
                      { width: 40, height: checkSteelType1 ? 13 : 15 } :
                      { width: 50, height: checkSteelType1 ? 18 : 20, marginTop: checkSteelType1 ? 1 : 0 }
                  }
                />
              }
              {pokeType2 &&
                <img
                  src={getTypeImage(pokeType2)}
                  alt='Type2'
                  style={
                    matches ?
                      { width: 40, height: checkSteelType2 ? 13 : 15 } :
                      { width: 50, height: checkSteelType2 ? 18 : 20, marginTop: checkSteelType2 ? 1 : 0 }
                  }
                />
              }
            </Grid>
          </Grid>
        </Grid>

        <Grid container size={12} justifyContent='center'>
          {pokePNG && <img src={pokePNG} alt='Pikachu' style={{ height: 150, width: 150 }}/>}
        </Grid>

        <Grid size={12}>
          <Grid container alignItems='center' justifyContent='center' spacing={matches ? 1 : 2}>
            {evolutionLine.map((stage, i) => (
              <React.Fragment key={i}>
                <Grid>
                  <img src={stage.image} alt={stage.name} width={below400 ? 30 : 40} height={below400 ? 30 : 40}/>
                </Grid>
                {i < evolutionLine.length - 1 && <ArrowRightAltIcon fontSize='large'/>}
              </React.Fragment>
            ))}
          </Grid>
        </Grid>

        <Grid container size={12}>
          <Grid container size={12} justifyContent='center'>
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
                <StatBar statId='hp' statNum={statsBase[0]} color='#04d400'/>
              </Grid>
              <Grid size={12}>
                <Typography variant='body2'>
                  <Box sx={{ fontWeight: 'bold' }}>Attack</Box>
                </Typography>
                <StatBar statId='attack' statNum={statsBase[1]} color='#f70000'/>
              </Grid>
              <Grid size={12}>
                <Typography variant='body2'>
                  <Box sx={{ fontWeight: 'bold' }}>Defense</Box>
                </Typography>
                <StatBar statId='defense' statNum={statsBase[2]} color='#0012db'/>
              </Grid>
              {!matches && <Grid size={12}>
                <Typography variant='h7'>
                  <Box sx={{ fontWeight: 'bold' }}>Total: {totalBase}</Box>
                </Typography>
              </Grid>
              }
            </Grid>

            <Grid container direction='column' spacing={1} size={4}>
              <Grid size={12}>
                <Typography variant='body2'>
                  <Box sx={{ fontWeight: 'bold' }}>Sp. Atk</Box>
                </Typography>
                <StatBar statId='sp_atk' statNum={statsBase[3]} color='#ea4fff'/>
              </Grid>
              <Grid size={12}>
                <Typography variant='body2'>
                  <Box sx={{ fontWeight: 'bold' }}>Sp. Def</Box>
                </Typography>
                <StatBar statId='sp_def' statNum={statsBase[4]} color='#fc7723'/>
              </Grid>
              <Grid size={12}>
                <Typography variant='body2'>
                  <Box sx={{ fontWeight: 'bold' }}>Speed</Box>
                </Typography>
                <StatBar statId='speed' statNum={statsBase[5]} color='#33daff'/>
              </Grid>
              {matches && <Grid size={12}>
                <Typography variant='h7'>
                  <Box sx={{ fontWeight: 'bold' }}>Total: {totalBase}</Box>
                </Typography>
              </Grid>
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </>
}

export default InfoBox