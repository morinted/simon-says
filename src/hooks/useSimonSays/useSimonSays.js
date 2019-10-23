import React, { useState, useEffect, useCallback } from 'react'
import { sample, isEqual } from 'lodash'

const STATE = {
  SETUP: 'SETUP',
  PLAY: 'PLAY',
  END: 'END'
}

// Buttons can be colored yellow, red, blue, green, purple, orange, pink
const BUTTONS = [
  { number: 1, color: 'yellow' },
  { number: 2, color: 'red' },
  { number: 3, color: 'blue' },
  { number: 4, color: 'green' }
]
const randomButton = () => sample(BUTTONS)

// The attribute that Simon uses to describe the button.
const PHRASE = {
  COLOR: 'COLOR',
  NUMBER: 'NUMBER'
}
const randomPhrase = () => sample(PHRASE)

const GAME_LOSS_TYPE = {
  BUTTON: 'BUTTON',
  TIME: 'TIME',
  SIMON: 'SIMON'
}

const TIMEOUT = 2000

export default function useSimonSays() {
  const [gameState, setGameState] = useState(STATE.SETUP)
  const [challengeIndex, setChallengeIndex] = useState(0)

  const [goalButton, setGoalButton] = useState(randomButton())
  const [simonSays, setSimonSays] = useState(true)
  const [phrase, setPhrase] = useState(randomPhrase())

  const [lossType, setLossType] = useState('')

  const endGame = useCallback(gameLossType => {
    setLossType(gameLossType)
    setGameState(STATE.END)
  }, [setLossType, setGameState])

  // Count a success and present the user with the next challenge.
  const nextChallenge = useCallback(() => {
    const newPhrase = randomPhrase()
    const newGoalButton = randomButton()
    const newSimonSays = sample(
      // Slightly more likely to get Simon than not.
      [true, true, true, false, false]
    )

    if (newPhrase === phrase &&
      isEqual(newGoalButton, goalButton) &&
      newSimonSays === simonSays
    ) {
      // Challenge did not change, so reroll.
      nextChallenge()
    } else {
      setChallengeIndex(index => index + 1)
      setPhrase(newPhrase)
      setGoalButton(newGoalButton)
      setSimonSays(newSimonSays)
    }
  }, [phrase, goalButton, simonSays])

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

  // Get a string describing the current challenge or loss type.
  const getGameMessage = () => {
    const buttonDescription =
      phrase === PHRASE.COLOR ?
        `the ${goalButton.color} button` :
        `button number ${goalButton.number}`

    switch (gameState) {
      case STATE.END:
        if (lossType === GAME_LOSS_TYPE.BUTTON) {
          return 'You pressed the wrong button.'
        } else if (lossType === GAME_LOSS_TYPE.SIMON) {
          return "I didn't say Simon says!"
        } else {
          return 'You took too long to respond!'
        }

      case STATE.SETUP:
      case STATE.PLAY:
      default:
        return (
          `${
            simonSays ? 'Simon says press' : 'Press'
          } ${buttonDescription}`
        )
    }
  }

  // Get additional info for the beginning or end of the game.
  const getInfo = () => {
    switch (gameState) {
      case STATE.SETUP:
        return <>
          <p>Simply press the buttons that Simon asks you to.</p>
          <p><strong>You lose</strong> if you:</p>
          <ul style={{ textAlign: 'left' }}>
            <li>Press the wrong button</li>
            <li>Do anything without Simon</li>
            <li>Take too long</li>
          </ul>
          </>
      case STATE.END:
        return <>
          <p>You made it through {challengeIndex} challenge{challengeIndex === 1 ? '' : 's'}.</p>
          <p>Press any button to restart.</p>
        </>
      default:
        return ''
    }
  }

  return (
    { buttons: BUTTONS
    , onButtonClick
    , message: getGameMessage()
    , gameInfo: getInfo()
    }
  )
}