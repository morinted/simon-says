import React from 'react';
import styles from './GameButton.module.css';

export default function GameButton({ button, onClick }) {
  const { number, color } = button
  return (
    <button
      className={styles[`${color}GameButton`]}
      onClick={() => onClick(button)}
    >
      { number }
    </button>
  );
}
