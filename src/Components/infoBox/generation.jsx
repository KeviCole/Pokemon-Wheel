import { Grid, MenuItem, Select } from '@mui/material'

export const GenerationBox = ({ generation, setGeneration }) => {
  const generationArray = [
    'Generation 1',
    'Generation 2',
    'Generation 3',
    'Generation 4',
    'Generation 5',
    'Generation 6',
    'Generation 7',
    'Generation 8',
    'Generation 9'
  ]
  return <Grid size={12}>
    <Select
      label='Generation'
      value={generation}
      onChange={({ target: { value } }) => setGeneration(value)}
      sx={{}}
    >
      {generationArray.map((gen, index) =>
        <MenuItem value={index+1} disabled={generation === index+1}>{gen}</MenuItem>)
      }
    </Select>
  </Grid>
}

export default GenerationBox