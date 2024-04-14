const gitHubApiUrl = 'https://api.github.com/users/';

export const gitHubUserService = {
  getUser: (username) => fetch(`${gitHubApiUrl}${username}`).then(
      response => {
        if (!response.ok) {
          throw new Error('Username not exist.')
        }
        return response.json()
      }
  ),
  getUserRepos: (username) => fetch(`${gitHubApiUrl}${username}/repos`).then(response => response.json()),
}
