import { Grid, useMediaQuery } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { getPokemonImage, getTypeImage } from '../../Constants/pokemonImage'
import pikaPng from '../../Images/pikachu.png'
import pikaGif from '../../Images/pikachubby.gif'
import { EvolutionLine, PokemonSelection, PokemonStats, TitleBar } from '../infoBox'

export const InfoBox = ({ wheelResult }) => {
  // Stored Chosen Pokemon
  const [listPokemon, setListPokemon] = useState([
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 }
  ])

  // Tracks Current Slot
  const [currentPokemon, setCurrentPokemon] = useState(0)
  const currentPokemonRef = useRef(currentPokemon)
  useEffect(() => {currentPokemonRef.current = currentPokemon}, [currentPokemon])

  useEffect(() => {
    if (wheelResult) {
      // Sets New Pokemon Info
      setListPokemon(prev =>
        prev.map(item =>
          item.id === currentPokemonRef.current ? {
            ...item,
            ...wheelResult,
            pokePNG: getPokemonImage(wheelResult.name),
            pokeType1Image: wheelResult.type1 ? getTypeImage(wheelResult.type1) : null,
            pokeType2Image: wheelResult.type2 ? getTypeImage(wheelResult.type2) : null } : item
        )
      )
      // Sets New Image in Current Slot
      setImages(prev =>
        prev.map(item =>
          item.id === currentPokemonRef.current ? { ...item, image: getPokemonImage(wheelResult.name) } : item
        )
      )
    }
  }, [wheelResult])
  // Pulls pokemon data
  const {
    name: pokeName,
    dexNum: pokeDexNum,
    type1,
    type2,
    pokePNG,
    pokeType1Image,
    pokeType2Image,
    checkSteelType1 = type1 === 'Steel',
    checkSteelType2 = type2 === 'Steel'
  } = listPokemon[currentPokemon] ?? {}

  // Stats and Responsive Checks
  const statsMax = [255, 190, 230, 180, 230, 200]
  const statsBase = [108, 130, 95, 80, 85, 102]
  const betweenMdAnd1100 = useMediaQuery('(min-width:900px) and (max-width:1100px)')
  const below500 = useMediaQuery('(max-width:500px)')
  const below400 = useMediaQuery('(max-width:400px')
  const matches = below500 || betweenMdAnd1100

  // Current Pokemon's Evolutions
  const evolutionLine = [
    { name: pokeName, image: pokePNG ?? pikaPng },
    { name: pokeName, image: pokePNG ?? pikaPng },
    { name: pokeName, image: pokePNG ?? pikaPng }
  ]

  // List of Images in the Slots
  const [images, setImages] = useState([
    { id: 0, image: pokePNG },
    { id: 1, image: pikaPng },
    { id: 2, image: pikaGif },
    { id: 3, image: pikaPng },
    { id: 4, image: pikaGif },
    { id: 5, image: pikaPng }
  ])

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
      <PokemonSelection
        images={images.map(poke => poke.image)}
        matches={matches}
        currentPokemon={currentPokemon}
        setCurrentPokemon={setCurrentPokemon}
      />
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