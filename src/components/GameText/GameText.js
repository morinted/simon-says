import React from 'react';
import { STATE } from '../../constants/constants'
import Instructions from '../Instructions/Instructions';
import ChallengeMessage from '../ChallengeMessage/ChallengeMessage';
import GameOverMessage from '../GameOverMessage/GameOverMessage';
import ClickTime from '../ClickTime/ClickTime';

export default function GameText({ simonSaysState }) {
  const { goalButton, lossType, simonSays, phraseType, challengeIndex, gameState, clickTimes } = simonSaysState
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
        <>
          <ClickTime 
          gameState={gameState}
          clickTimes={clickTimes}
          />
          <ChallengeMessage
            goalButton={goalButton}
            simonSays={simonSays}
            phraseType={phraseType}
          />
        </>
      )
    case STATE.END:
      return (
        <>
          <ClickTime 
          gameState={gameState}
          clickTimes={clickTimes}
          />
          <GameOverMessage lossType={lossType} challengeIndex={challengeIndex} />
        </>
      )
    default:
      return 'Invalid game state!'
  }
}
