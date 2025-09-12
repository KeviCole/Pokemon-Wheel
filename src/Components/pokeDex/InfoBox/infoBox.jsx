import { Grid, useMediaQuery } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { getPokemonImage, getTypeImage } from '../../../Constants/pokemonImage'
import { QuestionMark } from '../../../Images/misc'
import { EvolutionLine, PokemonSelection, PokemonStats, TitleBar } from '..'

export const InfoBox = ({ wheelResult, whiteNoise, noiseAnimate }) => {
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
    evolutionLine
  } = listPokemon[currentPokemon] ?? {}

  // Stats and Responsive Checks
  const statsMax = [255, 190, 230, 180, 230, 200]
  const statsBase = [108, 130, 95, 80, 85, 102]
  const betweenMdAnd1100 = useMediaQuery('(min-width:900px) and (max-width:1100px)')
  const below500 = useMediaQuery('(max-width:500px)')
  const below400 = useMediaQuery('(max-width:400px')
  const matches = below500 || betweenMdAnd1100

  // Current Pokemon's Evolutions
  const buildEvolutionLine = (evoLine) => evoLine.flatMap(evo =>
    Array.isArray(evo)
      ? buildEvolutionLine(evo)
      : {
        name: evo.name,
        image: getPokemonImage(evo.name)
      }
  )

  const backUpEvolutionLine = [
    { name: '', image: QuestionMark },
    { name: '', image: QuestionMark },
    { name: '', image: QuestionMark }
  ]
  const newEvolutionLine = evolutionLine ? buildEvolutionLine(evolutionLine) : backUpEvolutionLine

  // List of Images in the Slots
  const [images, setImages] = useState([
    { id: 0, image: QuestionMark },
    { id: 1, image: QuestionMark },
    { id: 2, image: QuestionMark },
    { id: 3, image: QuestionMark },
    { id: 4, image: QuestionMark },
    { id: 5, image: QuestionMark }
  ])

  return <>
    <Grid
      size={2}
      sx={{
        border: '2px solid',
        borderColor: 'black',
        borderRadius: 2,
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'silver',
        position: 'relative',
        overflow: 'hidden',

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
          matches={matches}
          noiseAnimate={noiseAnimate}
          pokeDexNum={pokeDexNum ?? '?'}
          pokeName={pokeName ?? 'Unknown'}
          pokeType1Image={pokeType1Image}
          pokeType2Image={pokeType2Image}
          type1={type1}
          type2={type2}
          whiteNoise={whiteNoise}
        />
        <Grid
          container
          size={12}
          spacing={2}
          sx={{
            border: '2px solid',
            borderColor: 'black',
            borderRadius: 2,
            backgroundColor: 'whiteSmoke',
            position: 'relative',
            overflow: 'hidden',
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
        >
          <Grid container size={12} justifyContent='center'>
            {pokePNG ? <img src={pokePNG} alt={pokeName} style={{ height: 150, width: 150 }}/> :
              <img src={QuestionMark} alt='QuestionMark' style={{ height: 142, width: 142 }}/>
            }
          </Grid>
          <Grid size={12}>
            <EvolutionLine below400={below400} matches={matches} evolutionLine={newEvolutionLine ?? []}/>
          </Grid>
        </Grid>
        <Grid container size={12}>
          <PokemonStats
            matches={matches}
            noiseAnimate={noiseAnimate}
            statsMax={statsMax}
            statsBase={statsBase}
            whiteNoise={whiteNoise}
          />
        </Grid>
      </Grid>
    </Grid>
  </>
}

export default InfoBox