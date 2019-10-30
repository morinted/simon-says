import { useState, useEffect, useCallback } from 'react'
import { isEqual, sample } from 'lodash'
import {
  STATE,
  randomPhrase,
  randomButtons,
  GAME_LOSS_TYPE,
  TIMEOUT,
  BUTTONCOUNT,
} from '../../constants/constants'


export default function useSimonSays() {
  const [gameState, setGameState] = useState(STATE.SETUP)
  const [challengeIndex, setChallengeIndex] = useState(0)
  
  const [buttons, setButtons] = useState(randomButtons(BUTTONCOUNT))

  const [goalButton, setGoalButton] = useState(sample(buttons))
  const [simonSays, setSimonSays] = useState(true)
  const [phraseType, setPhraseType] = useState(randomPhrase())

  const[clickTimes, setClickTimes] = useState([])
  const[challengeStart, setChallengeStart] = useState(0)


  const [lossType, setLossType] = useState('')

  const endGame = useCallback(gameLossType => {
    setLossType(gameLossType)
    setGameState(STATE.END)
  }, [setLossType, setGameState])

  // Count a success and present the user with the next challenge.
  const nextChallenge = useCallback(() => {
    const newButtons = randomButtons(BUTTONCOUNT)
    const newPhrase = randomPhrase()
    const newGoalButton = sample(newButtons)

    // Slightly more likely to get Simon than not.
    const newSimonSays = Math.random() < 3 / 5


    if (newPhrase === phraseType &&
      isEqual(newGoalButton, goalButton) &&
      newSimonSays === simonSays
    ) {
      // Challenge did not change, so reroll.
      nextChallenge()
    } else {
      setChallengeIndex(index => index + 1)
      setPhraseType(newPhrase)
      setGoalButton(newGoalButton)
      setSimonSays(newSimonSays)
      setButtons(newButtons)
      setChallengeStart(Date.now())
    }
  }, [phraseType, goalButton, simonSays])

  const onButtonClick = (button) => {
    // Restart the game when it's done.
    if (gameState === STATE.END) {
      setGameState(STATE.PLAY)
      setChallengeIndex(0)
      setChallengeStart(Date.now())
      setClickTimes([])
      return
    }

    // Enable timed responses after the first response.
    if (gameState === STATE.SETUP) {
      setGameState(STATE.PLAY)
    }
    // Ignores first click time.
    else
    {
      setClickTimes(clickTimes.concat(Date.now() - challengeStart))
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
        challengeIndex,
        buttons,
        clickTimes,
      }
    }
  )
}