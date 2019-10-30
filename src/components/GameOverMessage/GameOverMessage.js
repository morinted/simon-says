import React from 'react'
import { GAME_LOSS_TYPE } from '../../constants/constants'

export default function GameOverMessage({ lossType, challengeIndex }) {

  const lossExplanation = () => {
    switch(lossType) {
      case GAME_LOSS_TYPE.BUTTON:
        return 'You pressed the wrong button.'
      case GAME_LOSS_TYPE.SIMON:
        return "I didn't say Simon says!"
      case GAME_LOSS_TYPE.TIME:
      default:
        return 'You took too long to respond!'
    }
  }

  return (
    <>
      <p>{ lossExplanation() }</p>
      <p>You made it through {challengeIndex} challenge{challengeIndex === 1 ? '' : 's'}.</p>
      <p><em>Press any button to restart.</em></p>
    </>
  )
}
