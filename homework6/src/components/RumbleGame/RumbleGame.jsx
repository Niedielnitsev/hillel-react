import React, {useEffect} from "react";

import Form from "../Form/Form.jsx";
import Player from "../Player/Player.jsx";
import GameButton from "../GameButton/GameButton.jsx";
import RumbleContext from "../../contexts/RumbleContext.js";
import useRumbleGame from "../../hooks/UseRumbleGame.js";
import './RumbleGame.sass'

export default function RumbleGame() {
  const {
    firstPlayer,
    setFirstPlayer,
    secondPlayer,
    setSecondPlayer,
    isBattleStarted,
    setIsBattleStarted,
    winnerUsername,
    setWinnerUsername,
    isDraw,
    setIsDraw,
    startGame,
    restartGame,
  } = useRumbleGame();

  useEffect(() => {
    if (isBattleStarted) {
      if (firstPlayer.totalScore > secondPlayer.totalScore) {
        setWinnerUsername(firstPlayer.username);
      } else if (firstPlayer.totalScore === secondPlayer.totalScore) {
        setIsDraw(true);
      } else {
        setWinnerUsername(secondPlayer.username);
      }
    }

  }, [isBattleStarted])

  return (
      <>
        <RumbleContext.Provider value={{
          firstPlayer,
          setFirstPlayer,
          secondPlayer,
          setSecondPlayer,
          isBattleStarted,
          setIsBattleStarted,
          winnerUsername,
          isDraw,
          setIsDraw,
          restartGame,
          startGame,
        }}>
          <div className={'columns'}>
            {firstPlayer.username ?
                <Player key={1} player={firstPlayer}/>
                : <Form key={1} player={firstPlayer} setPlayer={setFirstPlayer} playerName={'Player 1'}/>
            }
            {secondPlayer.username ?
                <Player key={2} player={secondPlayer}/>
                : <Form key={2} player={secondPlayer} setPlayer={setSecondPlayer} playerName={'Player 2'}/>
            }
          </div>
          <GameButton />
        </RumbleContext.Provider>
      </>
  )
}