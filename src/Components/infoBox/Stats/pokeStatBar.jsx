import { useEffect, useRef } from 'react'

export const StatBar = ({ statId, statsMax, statNum, color }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const c = canvasRef.current
    if (!c) { return }
    const ctx = c.getContext('2d')

    const length = 180
    ctx.clearRect(0, 0, 190, 10)

    // Stat Type Selection
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
    // Bar length
    const decimal = statNum / maxStat
    const finalLen = length * decimal

    // Bar and Text
    ctx.fillStyle = color
    ctx.fillRect(0, 0, finalLen, 20)
    ctx.fillStyle = 'black'
    ctx.textAlign = 'right'
    ctx.font = '12px Arial'
    ctx.fillText(statNum, finalLen+20, 10)
  }, [statId, statsMax, statNum, color])

  return <canvas ref={canvasRef} width={200} height={12}></canvas>
}

export default StatBar