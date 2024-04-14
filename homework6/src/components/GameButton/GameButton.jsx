import React, {useContext} from "react";

import RumbleContext from "../../contexts/RumbleContext.js";
import './GameButton.sass'

export default function GameButton() {
  const {firstPlayer, secondPlayer, isBattleStarted, startGame, restartGame} = useContext(RumbleContext);
  const playersReady = firstPlayer.username && secondPlayer.username;

  const handleBattle = () => {
    startGame();
  }

  const handleRestart = () => {
    restartGame();
  }

  return (
      <div className={'GameButton'}>
        {isBattleStarted ? <button onClick={handleRestart}>Restart</button>
          : playersReady ? <button onClick={handleBattle}>Battle!</button>
          : null
        }
      </div>
  );
}
