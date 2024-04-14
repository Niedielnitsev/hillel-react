import React, {useContext} from "react";

import "./Player.sass";
import RumbleContext from "../../contexts/RumbleContext.js";

export default function Player({player}) {
  const {isBattleStarted, winnerUsername, isDraw} = useContext(RumbleContext);
  return (
      <div className={"playerInfo"}>
        {winnerUsername && winnerUsername === player.username ? <h3>Winner!</h3>
            : winnerUsername && winnerUsername !== player.username ? <h3>Looser</h3>
            : null}
        {isDraw ? <h3>Friendship won!</h3> : null}
        <img src={player.avatar} alt={player.username}/>
        <h3>{player.username}</h3>
        {isBattleStarted ?
            <ul>
              <li>Followers: {player.followers}</li>
              <li>Stars: {player.repoStars}</li>
              <li><b>Total score: {player.totalScore}</b></li>
            </ul>
            : null
        }
      </div>
  );
}