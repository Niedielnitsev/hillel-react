const tasksApiUrl = 'https://65ef5bb3ead08fa78a5055fb.mockapi.io/list';

export const tasksService = {
  getTasksList: () => fetch(tasksApiUrl).then(response => response.json()),
  deleteTask: (id) => fetch(`${tasksApiUrl}/${id}`, {method: 'DELETE'}).then(response => response.json()),
}