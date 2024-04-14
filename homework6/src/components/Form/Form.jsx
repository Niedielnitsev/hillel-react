import React from 'react'
import './Form.sass'

import {gitHubUserService} from '../../services/github'

export default function Form({player, playerName, setPlayer}) {

  const [error, setError] = React.useState(null)
  const getPlayerInfo = async (username) => {
    try {
      return await gitHubUserService.getUser(username);
    } catch (err) {
      setError(err.message)
    }
  }

  const getPlayerRepos = async (username) => {
    try {
      return await gitHubUserService.getUserRepos(username);
    } catch (err) {
      console.log(err)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    const username = e.target.name.value;
    const playerInfo = await getPlayerInfo(username);
    if (!playerInfo) {
      return;
    }
    const playerRepos = await getPlayerRepos(username);
    const playerReposStars = playerRepos.reduce((acc, repo) => acc + repo.stargazers_count, 0)
    setPlayer({
      ...player,
      username: playerInfo.login,
      avatar: playerInfo.avatar_url,
      followers: playerInfo.followers,
      repoStars: playerReposStars,
      totalScore: playerInfo.followers + playerReposStars,
    })
  }

  return (
      <form onSubmit={handleSubmit} >
        <label>Choose <b>{playerName}</b> username:</label>
        <input type="text" name="name" placeholder={playerName} />
        {error ? <p className={'error'}>{error}</p> : null}
        <button type="submit">Submit</button>
      </form>
  )
}
