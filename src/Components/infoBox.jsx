import { Grid } from '@mui/material'
import { useEffect, useRef } from 'react'
import pikaPng from '../Images/pikachu.png'
import pikaGif from '../Images/pikachubby.gif'

const InfoBox = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    ctx.strokeStyle = 'black'
    ctx.lineJoin = 'bevel'
    ctx.lineWidth = 5

    const images = [pikaGif, pikaPng, pikaGif, pikaPng, pikaGif, pikaPng]

    const rectWidth = 45
    const rectHeight = 45
    const spacing = 20

    images.forEach((src, i) => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        const y = i * (rectHeight + spacing) + 5
        ctx.drawImage(img, 5, y, rectWidth, rectHeight)
        ctx.strokeStyle = 'black'
        ctx.lineWidth = 2
        ctx.strokeRect(5, y, rectWidth, rectHeight)
      }
    })
  }, [])

  return <>
      <Grid
        size={1.5}
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 2,
        }}
      >
        <canvas
          ref={canvasRef}
          width={60}
          height={380}
        >
          Tree
        </canvas>
      </Grid>
      <Grid size={10.5}>sdfsdfsdfsdfsdfsdfsdfsdf</Grid>
    </>
}

export default InfoBox