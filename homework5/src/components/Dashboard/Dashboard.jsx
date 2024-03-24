import {useEffect, useState} from 'react';
import {tasksService} from '../../services/tasks';

import './Dashboard.sass';

const taskStatusEnum = {
  TO_DO: 'TO_DO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE'
};


export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);

  useEffect(() => {
    (async () => {
      let response = await tasksService.getTasksList();
      setTasks(response);
    })();
  }, []);

  const changeTaskStatus = (someTask, status = taskStatusEnum.TO_DO) => {
    let task = someTask.shift();
    if (!task) {
      return;
    }

    task.status = status;
    switch (status) {
      case taskStatusEnum.IN_PROGRESS:
        setInProgressTasks([task, ...inProgressTasks]);
        setTasks([...someTask]);
        break;
      case taskStatusEnum.DONE:
        setDoneTasks([task, ...doneTasks]);
        setInProgressTasks([...someTask]);
        break;
      case taskStatusEnum.TO_DO:
      default:
        setTasks([task, ...tasks]);
        setInProgressTasks([...someTask]);
    }
  };

  const deleteDoneTask = async (taskId) => {
    try {
      await tasksService.deleteTask(taskId);
      setDoneTasks([...doneTasks.filter(task => task.id !== taskId)])
    } catch (err) {
      console.log(err)
    }
  }

  return (
      <>
        <h1>Dashboard</h1>
        <div className={'dashboard'}>
          <ToDoColumn toDoItems={tasks} changeFirstTaskStatus={changeTaskStatus}/>
          <InProgressColumn inProgressItems={inProgressTasks} changeFirstTaskStatus={changeTaskStatus}/>
          <DoneColumn deleteLastTask={deleteDoneTask} doneItems={doneTasks}/>
        </div>
      </>
  );
}

function ToDoColumn({changeFirstTaskStatus, toDoItems = []}) {
  return (
      <div className={'column'}>
        <h3>To Do</h3>
        <TasksList tasks={toDoItems}/>
        {
          toDoItems.length ?
              <div className={'control'}>
                <button onClick={() => changeFirstTaskStatus(toDoItems, taskStatusEnum.IN_PROGRESS)}>
                  Transfer first to right
                </button>
              </div>
              : null
        }
      </div>
  );
}

function InProgressColumn({changeFirstTaskStatus, inProgressItems = []}) {
  return (
      <div className={'column'}>
        <h3>In Progress</h3>
        <TasksList tasks={inProgressItems}/>
        {
          inProgressItems.length ?
              <div className={'control'}>
                <button onClick={() => changeFirstTaskStatus(inProgressItems, taskStatusEnum.TO_DO)}>
                  Transfer first to left
                </button>
                <button onClick={() => changeFirstTaskStatus(inProgressItems, taskStatusEnum.DONE)}>
                  Transfer first to right
                </button>
              </div>
              : null
        }
      </div>
  );
}

function DoneColumn({deleteLastTask, doneItems = []}) {
  return (
      <div className={'column'}>
        <h3>Done</h3>
        <TasksList tasks={doneItems}/>
        {
          doneItems.length ?
              <div className={'control'}>
                <button onClick={() => deleteLastTask(doneItems.pop().id)}>Remove last item</button>
              </div>
              : null
        }
      </div>
  );
}

function TasksList({tasks = []}) {
  return (
      tasks.length ?
          <ul className={'tasksList'}>
            {tasks.map((task) => (
                <li key={task.id}>{task.title}</li>
            ))}
          </ul> : <p className={'emptyMessage'}>No tasks</p>
  );
}