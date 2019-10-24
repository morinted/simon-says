import { sample } from 'lodash'

export const STATE = {
  SETUP: 'SETUP',
  PLAY: 'PLAY',
  END: 'END'
}

export const COLORS = {
  red: 'red',
  orange: 'orange',
  blue: 'blue',
  green: 'green',
  purple: 'purple',
  pink: 'pink',
  yellow: 'yellow'
}
export const randomColor = () => sample(COLORS)

// Buttons can be colored yellow, red, blue, green, purple, orange, pink
export const BUTTONS = [
  { number: 1, color: 'yellow' },
  { number: 2, color: 'red' },
  { number: 3, color: 'blue' },
  { number: 4, color: 'green' }
]
export const randomButton = () => sample(BUTTONS)

// The attribute that Simon uses to describe the button.
export const PHRASE = {
  COLOR: 'COLOR',
  NUMBER: 'NUMBER'
}
export const randomPhrase = () => sample(PHRASE)

export const GAME_LOSS_TYPE = {
  BUTTON: 'BUTTON',
  TIME: 'TIME',
  SIMON: 'SIMON'
}

export const TIMEOUT = 2000
