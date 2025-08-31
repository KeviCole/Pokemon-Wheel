import { Grid, useMediaQuery } from '@mui/material'
import { useMemo } from 'react'
import { getPokemonImage, getTypeImage } from '../../Constants/pokemonImage'
import pikaPng from '../../Images/pikachu.png'
import pikaGif from '../../Images/pikachubby.gif'
import { PokemonSelection, TitleBar, EvolutionLine, PokemonStats } from '../infoBox'

export const InfoBox = ({ wheelResult }) => {
  const {
    name: pokeName,
    dexNum: pokeDexNum,
    type1: pokeType1,
    type2: pokeType2,
    pokePNG = getPokemonImage(pokeName),
    pokeType1Image = pokeType1 ? getTypeImage(pokeType1) : null,
    pokeType2Image = pokeType2 ? getTypeImage(pokeType2) : null
  } = wheelResult ?? {}

  const evolutionLine = [
    { name: 'Pichu', image: pokePNG ?? pikaPng },
    { name: 'Pikachu', image: pokePNG ?? pikaPng },
    { name: 'Raichu', image: pokePNG ?? pikaPng },
  ]
  const statsMax = [255, 190, 230, 180, 230, 200]
  const statsBase = [108, 130, 95, 80, 85, 102]
  const betweenMdAnd1100 = useMediaQuery('(min-width:900px) and (max-width:1100px)')
  const below500 = useMediaQuery('(max-width:500px)')
  const below400 = useMediaQuery('(max-width:400px')
  const matches = below500 || betweenMdAnd1100
  const images = useMemo(() => [
    pokePNG, pikaPng, pikaGif, pikaPng, pikaGif, pikaPng], [pokePNG])
  const checkSteelType1 = pokeType1 === 'Steel'
  const checkSteelType2 = pokeType2 === 'Steel'

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
      <PokemonSelection images={images} matches={matches}/>
    </Grid>
    <Grid size={10}>
      <Grid container size={12} display='flex' flexDirection='column' spacing={1}>
        <TitleBar
          below400={below400}
          checkSteelType1={checkSteelType1}
          checkSteelType2={checkSteelType2}
          matches={matches}
          pokeDexNum={pokeDexNum}
          pokeName={pokeName}
          pokeType1Image={pokeType1Image}
          pokeType2Image={pokeType2Image}
        />
        <Grid container size={12} justifyContent='center'>
          {pokePNG && <img src={pokePNG} alt='Pikachu' style={{ height: 150, width: 150 }}/>}
        </Grid>
        <Grid size={12}>
          <EvolutionLine below400={below400} matches={matches} evolutionLine={evolutionLine}/>
        </Grid>
        <Grid container size={12}>
          <PokemonStats matches={matches} statsMax={statsMax} statsBase={statsBase}/>
        </Grid>
      </Grid>
    </Grid>
  </>
}

export default InfoBox