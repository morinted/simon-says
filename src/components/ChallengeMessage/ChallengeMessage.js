import React from 'react';
import styles from './ChallengeMessage.module.css';
import { PHRASE } from '../../constants/constants'

export default function ChallengeMessage(
  {
    goalButton,
    simonSays,
    phraseType,
    textColor
  }) {

  const prompt = simonSays ? 'Simon says press' : 'Press'
  const buttonDescription =
      phraseType === PHRASE.COLOR ?
        `the ${goalButton.color} button` :
        `button number ${goalButton.number}`

  return (
    <p className={styles.challengeMessage}>
      {prompt} {buttonDescription}
    </p>
  )
}
