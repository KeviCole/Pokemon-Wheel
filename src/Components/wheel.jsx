import { Button, Stack, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig']
const colors = ['crimson', 'cyan', 'white']

const Wheel = () => {
  const canvasRef = useRef(null)
  const [selected, setSelected] = useState(null)

  const spin = () => {
    const index = Math.floor(Math.random() * items.length)
    setSelected(items[index])
  }

  const slices = (ctx, curr, next, index) => {
    ctx.beginPath()
    ctx.moveTo(150, 150)
    ctx.arc(150, 150, 100, curr, next)
    ctx.closePath()
    ctx.fillStyle = colors[index]
    ctx.fill()
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2
    ctx.stroke()
  }

  const outline = (ctx) => {
    ctx.beginPath()
    ctx.arc(150,150,100, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.closePath()
  }

  const arrow = (ctx) => {
    ctx.beginPath()
    ctx.moveTo(150, 60)
    ctx.lineTo(140, 30)
    ctx.lineTo(160, 30)
    ctx.lineTo(150,60)
    ctx.fillStyle = 'black'
    ctx.fill()
    ctx.closePath()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let loop = 6
    let index = 0
    const sliceAngle = 2 * Math.PI / loop
    let curr = 0
    let next = sliceAngle

    while (curr < 2 * Math.PI) {
        slices(ctx, curr, next, index)
        curr = next
        next += sliceAngle
        index === colors.length-1 ? index = 0 : index++
    }
    outline(ctx)
    arrow(ctx)
  }, [])

  return <>
  <Stack pt={2} spacing={2}>
    <TextField label='Slice Count' type='number' defaultValue={1}/>
    <Button sx={{ border: 1 }} onClick={spin}>
      Spin the Wheel
    </Button>
    {selected && <p style={{ pt: 3 }}>🎉 You got: {selected}</p>}
  </Stack>
  <canvas ref={canvasRef} width={300} height={300}>
    Tree
  </canvas>
  </>
}

export default Wheel