import React from 'react'
import { STATE } from '../../constants/constants'

export default function ClickTime({ gameState, clickTimes }) {
  if(clickTimes.length)
  {
    const averageClickTime = ((clickTimes.reduce((time, total) => total + time, 0)/clickTimes.length)/1000).toFixed(2)
    return (<p>Average selection time {gameState === STATE.PLAY ? "is" : "was"} { averageClickTime } seconds</p> )
  }
  return <p></p>
}
