import React from 'react';
import { STATE } from '../../constants/constants'
import Instructions from '../Instructions/Instructions';
import ChallengeMessage from '../ChallengeMessage/ChallengeMessage';
import GameOverMessage from '../GameOverMessage/GameOverMessage';

export default function GameText({ simonSaysState }) {
  const { goalButton, lossType, simonSays, phraseType, challengeIndex } = simonSaysState
  switch (simonSaysState.gameState) {
    case STATE.SETUP:
      return (
        <>
          <Instructions />
          <ChallengeMessage
            goalButton={goalButton}
            simonSays={simonSays}
            phraseType={phraseType}
          />
        </>
      )
    case STATE.PLAY:
      return (
        <ChallengeMessage
          goalButton={goalButton}
          simonSays={simonSays}
          phraseType={phraseType}
        />
      )
    case STATE.END:
      return (
        <GameOverMessage lossType={lossType} challengeIndex={challengeIndex} />
      )
    default:
      return 'Invalid game state!'
  }
}
