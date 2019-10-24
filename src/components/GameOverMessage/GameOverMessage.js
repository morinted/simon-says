import React from 'react';
import { GAME_LOSS_TYPE } from '../../constants/constants'

export default function GameOverMessage({ lossType, challengeIndex }) {

  const lossExplanation =
    lossType === GAME_LOSS_TYPE.BUTTON ?
      'You pressed the wrong button.' :
      (lossType === GAME_LOSS_TYPE.SIMON) ?
        "I didn't say Simon says!" :
        'You took too long to respond!'

  return (
    <>
      <p>{ lossExplanation }</p>
      <p>You made it through {challengeIndex} challenge{challengeIndex === 1 ? '' : 's'}.</p>
      <p><em>Press any button to restart.</em></p>
    </>
  )
}
