import {useState} from "react";

export default function useRumbleGame() {
  const [firstPlayer, setFirstPlayer] = useState({})
  const [secondPlayer, setSecondPlayer] = useState({})
  const [isBattleStarted, setIsBattleStarted] = useState(false)
  const [winnerUsername, setWinnerUsername] = useState(null)
  const [isDraw, setIsDraw] = useState(false)

  const startGame = () => {
    setIsBattleStarted(true);
  }

  const restartGame = () => {
    setFirstPlayer({});
    setSecondPlayer({});
    setIsBattleStarted(false);
    setWinnerUsername(null);
    setIsDraw(false);
  }

  return {
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
  };
}