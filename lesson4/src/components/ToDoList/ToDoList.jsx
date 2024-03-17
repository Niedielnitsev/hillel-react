import {PureComponent} from "react";
import {toDoUrl} from "../../constants.jsx"
import ToDoForm from "../ToDoForm/ToDoForm.jsx";
import "./ToDoList.sass";

export default class ToDoList extends PureComponent {

  constructor() {
    super();

    this.markCompleted = this.markCompleted.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.addNewToDo = this.addNewToDo.bind(this);
  }

  state = {
    todos: [],
  }

  async componentDidMount() {
    let request = await fetch(toDoUrl),
        response = await request.json();

    this.setState({todos: response.slice(0, 10)});
  }

  async markCompleted(item) {
    let request = await fetch(`${toDoUrl}/${item.id}`, {
          method: "PUT",
          body: JSON.stringify({completed: !item.completed}),
          headers: {
            "Content-type": "application/json"
          }
        }),
        response = await request.json();

    this.setState(actualState => ({
      todos: actualState.todos.map(element => {
        if (element.id === response.id) element = response;
        return element;
      })
    }));
  }

  async deleteItem(item) {
    await fetch(`${toDoUrl}/${item.id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json"
      }
    })

    this.setState((actualState) => ({
      todos: actualState.todos.filter((element) => element.id !== item.id),
    }));
  }

  addNewToDo = (newToDo) => {
    this.setState(actualState => ({
      todos: [...actualState.todos, newToDo]
    }))
  }

  render() {
    const todos = this.state.todos;
    return (
        <>
          <h1>To-Do List</h1>
          <ToDoForm addNewItem={this.addNewToDo}/>
          {todos.length ?
              <ol>
                {this.state.todos.map((item, index) => (
                    <li key={item.id}>
                      <input type="checkbox" checked={item.completed} onChange={() => this.markCompleted(item)}/>
                      {item.title}
                      <button onClick={() => this.deleteItem(item)}>Delete</button>
                    </li>
                ))}
              </ol>
              : <h1>It is currently empty, try to add something</h1>
          }
        </>
    )
  }
}
