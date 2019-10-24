import React from 'react'

export default function Instructions() {
  return (
    <>
      <p>Simply press the buttons that Simon asks you to.</p>
      <p><strong>You lose</strong> if you:</p>
      <ul style={{ textAlign: 'left' }}>
        <li>Press the wrong button</li>
        <li>Do anything without Simon</li>
        <li>Take too long</li>
      </ul>
    </>
  )
}