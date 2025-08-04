import { Button, Stack, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig']
const colors = ['crimson', 'cyan', 'white']

const Wheel = () => {
  const canvasRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [value, setValue] = useState(7)

  const spin = () => {
    const index = Math.floor(Math.random() * items.length)
    setSelected(items[index])
  }

  const outline = (ctx) => {
    ctx.beginPath()
    ctx.arc(300,300,290, 0, 2 * Math.PI)
    ctx.stroke()
    ctx.closePath()
  }

  const arrow = (ctx) => {
    ctx.beginPath()
    ctx.moveTo(300, 40)
    ctx.lineTo(280, 0)
    ctx.lineTo(320, 0)
    ctx.lineTo(300, 40)
    ctx.fillStyle = 'black'
    ctx.fill()
    ctx.closePath()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let loop = value
    let index = 0
    const sliceAngle = 2 * Math.PI / loop
    let curr = 0
    let next = sliceAngle

    while (curr < 2 * Math.PI) {
        ctx.beginPath()
        ctx.moveTo(300, 300)
        ctx.arc(300, 300, 290, curr, next)
        ctx.closePath()
        ctx.fillStyle = colors[index]
        ctx.fill()
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.stroke()
        curr = next
        next += sliceAngle
        index === colors.length-1 ? index = 0 : index++
    }
    outline(ctx)
    arrow(ctx)
  }, [value])

  return <>
  <Stack pt={2} spacing={2}>
    <TextField
        label='Enter Slice Count'
        type='number'
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
    />
    <Button sx={{ border: 1 }} onClick={spin}>
      Spin the Wheel
    </Button>
    {selected && <p style={{ pt: 3 }}>🎉 You got: {selected}</p>}
  </Stack>
  <canvas ref={canvasRef} width={600} height={600}>
    Tree
  </canvas>
  </>
}

export default Wheel