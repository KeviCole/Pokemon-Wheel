import { Grid, TextField } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'

const colors = ['crimson', 'cyan', 'white']
const pokemonNames = ['Pikachu', 'Xatu', 'Bulbasaur', 'Charmander', 'Squirtle',
        'Crabominable', 'Gengar', 'Eevee', 'Snorlax', 'Mewtwo']
const canvasText = 'This is a random wheel built using canvas in order to randomly select pokemon for your play-through. ' +
'In order to change values within the slice, see the tab of delimiting choices to the right in order to remove pokemon.'

const Wheel = () => {
  const canvasRef = useRef(null)
  const angleRef = useRef(0)
  const requestRef = useRef(null)
  const spinningRef = useRef(false)
  const isHoveringRef = useRef(false)
  const [sliceCount, setSliceCount] = useState(6)
  const innerR = 50 // Inner Radius
  const twoPI = 2 * Math.PI

  const drawWheel = useCallback((angle) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    ctx.imageSmoothingEnabled = false
    const sliceAngle = twoPI / sliceCount
    const halfCW = canvas.width / 2 // Half of canvas width
    const halfCH = canvas.height / 2 // Half of canvas height
    const outerR = halfCW - 10
    let curr = 0
    let next = sliceAngle
    let index = 0
    // Dynamic Font Sizing From 20px to 10px
    let fontSize = 20
    if (sliceCount > 30) fontSize = Math.max(10, 600 / sliceCount)

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
        const midAngle = (curr + next) / 2

        const name = pokemonNames[index % pokemonNames.length]
        const label = `#${index + 1} ${name}`

        ctx.font = `${fontSize}px Arial`
        // Measures how wide the font will be
        const textWidth = ctx.measureText(label).width

        // Set a baseline target width (tuned for Pikachu’s length)
        const targetWidth = ctx.measureText(`#0 Pikachu`).width
        // If longer than pikachu, text moves inward, otherwise outward (along the slice)
        const extraPadding = (textWidth - targetWidth)

        // Buffer from edge of wheel
        const basePadding = fontSize * 6
        // Where the text origin aligns on the slice
        const textRadius = outerR - (basePadding + extraPadding)
        // Y and X position on Slice
        const textX = halfCW + textRadius * Math.cos(midAngle)
        const textY = halfCH + textRadius * Math.sin(midAngle)

        // Draw slice
        ctx.beginPath()
        ctx.moveTo(halfCW, halfCH)
        ctx.arc(halfCW, halfCH, outerR, curr, next)
        ctx.closePath()
        ctx.fillStyle = colors[index % colors.length]
        ctx.fill()

        // Fixes black image blurring
        if (sliceCount <= 100) {
            ctx.lineWidth = 1
            ctx.stroke()
        }

        // Draw text
        ctx.save()
        ctx.translate(textX, textY)
        // Ensures left side of wheel is readable
        let rotation = midAngle
        if (rotation > curr) rotation += Math.PI
        ctx.rotate(rotation)
        ctx.fillStyle = 'black'
        ctx.textAlign = 'right'
        ctx.textBaseline = 'middle'
        ctx.fillText(label, 0, 0)
        ctx.restore()

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
    ctx.beginPath()
    ctx.arc(halfCW, halfCH, innerR, 0, twoPI)
    ctx.fillStyle = isHoveringRef.current ? 'gold' : 'white'
    ctx.fill()
    ctx.fillStyle = 'black'
    ctx.textAlign = 'center'
    ctx.font = `35px Arial`
    ctx.fillText('SPIN', halfCW, halfCH)
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
    ctx.fill()

    // Black Wedge To Right
    const rightStartAngle = Math.PI / 12
    const rightEndAngle = 23 * Math.PI / 12
    const rightHeightTop = halfCH + innerR * Math.sin(rightEndAngle)
    const rightHeightBot = halfCH + innerR * Math.sin(rightStartAngle)
    const rightEndC = canvas.width - leftEndC

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
    ctx.fill()
    ctx.closePath()
  }, [sliceCount, twoPI])

  const spin = useCallback(() => {
    // Checks if already spinning
    if (spinningRef.current) return
    spinningRef.current = true

    // Slice Width
    const sliceAngle = twoPI / sliceCount

    // Random Slice Selection
    const targetIndex = Math.floor(Math.random() * sliceCount)
    // Calculates angle needed to land on
    const offset = Math.random() * sliceAngle
    const targetAngle = (sliceCount - targetIndex) * sliceAngle + offset

    // Multiple rotations
    const fullRotations = 6
    const totalRotation = fullRotations * twoPI + targetAngle

    // Duration, startTime and start angle
    const duration = 4000
    const start = performance.now()
    const startAngle = angleRef.current

    const animateSpin = (now) => {
        // Calculate where wheel is in spin
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)

        // Slow Down Effect
        const easedProgress = 1 - Math.pow(1 - progress, 5)
        // Update new angle
        angleRef.current = startAngle + totalRotation * easedProgress

        drawWheel(angleRef.current)
        // Spinning or stop
        progress < 1 ? requestRef.current = requestAnimationFrame(animateSpin) : spinningRef.current = false
    }

    cancelAnimationFrame(requestRef.current) // cancel slow spin
    requestRef.current = requestAnimationFrame(animateSpin)
  }, [drawWheel, sliceCount, twoPI])

  useEffect(() => {
    const canvas = canvasRef.current
    const halfCW = canvas.width / 2 // Half of canvas width
    const halfCH = canvas.height / 2 // Half of canvas height

    // Sets hovering and cursor style if within inner circle
    const handleMouseMove = (e) => {
      // Gets canvas position and size relative to viewport
      const rect = canvas.getBoundingClientRect()
      // Global coordinates to canvas coordinates
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      // Distance Formula (how far mouse is from inner circle)
      const distX = Math.pow(mouseX - halfCW, 2)
      const distY = Math.pow(mouseY - halfCH, 2)
      const distFromCenter = Math.sqrt(distX + distY)
      // If distFromCenter is smaller than innerR, then within the radius
      const hovering = distFromCenter <= innerR
      isHoveringRef.current = hovering

      canvas.style.cursor = hovering ? 'pointer' : 'default'
      // Forces a redraw so that color doesn't get stuck and hovering is synced immediately
      drawWheel(angleRef.current)
    }

    // Spins wheel is click && within circle
    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect()
      // Global coordinates to canvas coordinates
      const mouseX = e.clientX - rect.left
      const mouseY = e.clientY - rect.top
      // Distance Formula (how far mouse is from inner circle)
      const distX = Math.pow(mouseX - halfCW, 2)
      const distY = Math.pow(mouseY - halfCH, 2)
      const distFromCenter = Math.sqrt(distX + distY)

      if (distFromCenter <= innerR) spin()
    }

    // Resets cursor and hovering reference
    const handleMouseLeave = () => {
        isHoveringRef.current = false
        canvas.style.cursor = 'default'
    }

    // Browser runs this on every mouse movement
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('click', handleClick)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Cleans up event listener
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('click', handleClick)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [spin, drawWheel])

  useEffect(() => {
    // Animation loop
    const animate = () => {
      if (!spinningRef.current) angleRef.current += 0.001
      drawWheel(angleRef.current)
      // Tell Browser to draw a new frame
      requestRef.current = requestAnimationFrame(animate)
    }
    animate()
    return () => cancelAnimationFrame(requestRef.current)
  }, [sliceCount, drawWheel])

  return <>
    <Grid container pt={2} spacing={2} display='flex' flexDirection='column'>
        <TextField
            label='Enter Slice Count'
            type='number'
            value={isNaN(sliceCount) ? '' : sliceCount}
            onChange={(e) => setSliceCount(e.target.value === '' ? '' : parseFloat(e.target.value))}
        />
    </Grid>
    <canvas ref={canvasRef} width={600} height={600}>
        {canvasText}
    </canvas>
  </>
}

export default Wheel