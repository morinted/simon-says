import { sample, shuffle, range } from 'lodash'

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

export const randomButtons = buttonCount => 
{
  const colors = shuffle(Object.keys(COLORS))
  return shuffle(
    range(buttonCount)
      .map((_, index) => 
      ({number: index + 1, color: colors[index % colors.length]})
    ))
}

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

export const BUTTONCOUNT = 4
