import React, { useState, useEffect, useCallback } from 'react'
import { isEqual } from 'lodash'
import Phrase from '../../components/ChallengeMessage/ChallengeMessage'
import {
  STATE,
  randomPhrase,
  randomButton,
  BUTTONS,
  GAME_LOSS_TYPE,
  TIMEOUT
} from '../../constants/constants'


export default function useSimonSays() {
  const [gameState, setGameState] = useState(STATE.SETUP)
  const [challengeIndex, setChallengeIndex] = useState(0)

  const [goalButton, setGoalButton] = useState(randomButton())
  const [simonSays, setSimonSays] = useState(true)
  const [phraseType, setPhraseType] = useState(randomPhrase())
  const [textColor, setTextColor] = useState(randomButton().color)

  const [lossType, setLossType] = useState('')

  const endGame = useCallback(gameLossType => {
    setLossType(gameLossType)
    setGameState(STATE.END)
  }, [setLossType, setGameState])

  // Count a success and present the user with the next challenge.
  const nextChallenge = useCallback(() => {
    const newPhrase = randomPhrase()
    const newGoalButton = randomButton()
    const newTextColor = randomButton().color

    // Slightly more likely to get Simon than not.
    const newSimonSays = Math.random() < 3 / 5


    if (newPhrase === phraseType &&
      isEqual(newGoalButton, goalButton) &&
      newSimonSays === simonSays &&
      newTextColor === textColor
    ) {
      // Challenge did not change, so reroll.
      nextChallenge()
    } else {
      setChallengeIndex(index => index + 1)
      setPhraseType(newPhrase)
      setGoalButton(newGoalButton)
      setSimonSays(newSimonSays)
      setTextColor(newTextColor)
    }
  }, [phraseType, goalButton, simonSays, textColor])

  const onButtonClick = (button) => {
    // Restart the game when it's done.
    if (gameState === STATE.END) {
      setGameState(STATE.PLAY)
      setChallengeIndex(0)
      return
    }

    // Enable timed responses after the first response.
    if (gameState === STATE.SETUP) {
      setGameState(STATE.PLAY)
    }

    // Check the clicked button against the challenge.
    if (!simonSays) {
      endGame(GAME_LOSS_TYPE.SIMON)
    } else if (isEqual(button, goalButton)) {
      nextChallenge()
    } else {
      endGame(GAME_LOSS_TYPE.BUTTON)
    }
  }

  useEffect(() => {
    // Only time the challenges once the user has started playing.
    if (gameState !== STATE.PLAY) {
      return
    }

    const challengeTimeout = setTimeout(
      () => {
        // Missed Simon-says challenge.
        if (simonSays) {
          endGame(GAME_LOSS_TYPE.TIME)
        } else {
          // They successfully didn't complete a nonSimon challenge.
          nextChallenge()
        }
      }, TIMEOUT
    )
    return () => clearTimeout(challengeTimeout)
  }, [challengeIndex, gameState, simonSays, endGame, nextChallenge])

  return (
    { onButtonClick
    , simonSaysState:
      {
        gameState,
        goalButton,
        simonSays,
        lossType,
        phraseType,
        challengeIndex
      }
    }
  )
}