import React from 'react';
import styles from './App.module.css';
import useSimonSays from '../../hooks/useSimonSays/useSimonSays';
import GameButton from '../GameButton/GameButton';
import { chunk } from 'lodash'

function App() {
  const { buttons, onButtonClick, message, gameInfo } = useSimonSays()
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        { gameInfo }
        <p className={styles.gameMessage}>{ message }</p>
        { chunk(buttons, Math.ceil(buttons.length / 3)).map(
            (buttonRow, rowIndex) =>
              <div key={rowIndex}>
                { buttonRow.map(button =>
                    <GameButton key={button.number} button={button} onClick={onButtonClick} />
                  )
                }
              </div>
          )
        }
      </header>
    </div>
  );
}

export default App;
