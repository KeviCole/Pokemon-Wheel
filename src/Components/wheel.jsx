import { Button, Stack, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry', 'Fig']
const colors = ['crimson', 'cyan', 'white']

const Wheel = () => {
  const canvasRef = useRef(null)
  const [selected, setSelected] = useState(null)
  const [value, setValue] = useState(6)

  const spin = () => {
    const index = Math.floor(Math.random() * items.length)
    setSelected(items[index])
  }

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    ctx.imageSmoothingEnabled = false
    const twoPI = 2 * Math.PI
    const sliceAngle = twoPI / value
    const halfCW = canvas.width / 2 // Half of canvas width
    const halfCH = canvas.height / 2 // Half of canvas height
    const outerR = halfCW - 10

    const drawWheel = (angle) => {
      let curr = 0
      let next = sliceAngle
      let index = 0

      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Prevents stack up of translations and rotations
      ctx.save()
      // Moves to center of diagram (0, 0) -> (300, 300)
      ctx.translate(halfCW, halfCH)
      // Rotates around the new origin (the center)
      ctx.rotate(angle)
      // Moves back to top left of diagram (300, 300) -> (0, 0)
      ctx.translate(-halfCW, -halfCH)

      // Slices
      while (curr < twoPI) {
        ctx.beginPath()
        ctx.moveTo(halfCW, halfCH)
        ctx.arc(halfCW, halfCH, outerR, curr, next)
        ctx.closePath()
        ctx.fillStyle = colors[index % colors.length]
        ctx.fill()
        // Fixes black image blurring
        if (value <= 100) {
            ctx.strokeStyle = 'black'
            ctx.lineWidth = 1
            ctx.stroke()
        }
        curr = next
        next += sliceAngle
        index++
      }
      ctx.restore()

      // Outer Circle Outline
      ctx.beginPath()
      ctx.arc(halfCW, halfCH, outerR, 0, twoPI)
      ctx.lineWidth = 6
      ctx.stroke()
      ctx.closePath()

      // Inner Circle Outline
      const innerR = 50 // Inner Radius
      ctx.beginPath()
      ctx.arc(halfCW, halfCH, innerR, 0, twoPI)
      ctx.fillStyle = 'white'
      ctx.fill()
      ctx.stroke()
      ctx.closePath()

      // Black Wedge To Left
      const leftStartAngle = 11 * Math.PI / 12
      const leftEndAngle = 13 * Math.PI / 12
      const leftHeightTop = halfCH + innerR * Math.sin(leftEndAngle)
      const leftHeightBot = halfCH + innerR * Math.sin(leftStartAngle)
      const leftEndC = 11

      ctx.beginPath()
      ctx.arc(halfCW, halfCH, innerR, leftStartAngle, leftEndAngle)
      ctx.lineTo(leftEndC, leftHeightTop)
      ctx.lineTo(leftEndC, leftHeightBot)
      ctx.closePath()
      ctx.fillStyle = 'black'
      ctx.fill()

      // Black Wedge To Right
      const rightStartAngle = Math.PI / 12
      const rightEndAngle = 23 * Math.PI / 12
      const rightHeightTop = halfCH + innerR * Math.sin(rightEndAngle)
      const rightHeightBot = halfCH + innerR * Math.sin(rightStartAngle)
      const rightEndC = 589

      ctx.beginPath()
      ctx.arc(halfCW, halfCH, innerR, rightStartAngle, rightEndAngle, true)
      ctx.lineTo(rightEndC, rightHeightTop)
      ctx.lineTo(rightEndC, rightHeightBot)
      ctx.closePath()
      ctx.fill()

      // Arrow
      const pointer = 40
      const endCornersOffset = 20
      ctx.beginPath()
      ctx.moveTo(halfCW, pointer)
      ctx.lineTo(halfCW - endCornersOffset, 0)
      ctx.lineTo(halfCW + endCornersOffset, 0)
      ctx.lineTo(halfCW, pointer)
      ctx.fillStyle = 'black'
      ctx.fill()
      ctx.closePath()
    }

    let angle = 0
    // Animation loop
    const animate = () => {
      angle += 0.001
      drawWheel(angle)
      // Tell Browser to draw a new frame
      requestAnimationFrame(animate)
    }
    animate()
  }, [value])

  return <>
  <Stack pt={2} spacing={2}>
    <TextField
        label='Enter Slice Count'
        type='number'
        value={isNaN(value) ? '' : value}
        onChange={(e) => setValue(e.target.value === '' ? '' : parseFloat(e.target.value))}
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