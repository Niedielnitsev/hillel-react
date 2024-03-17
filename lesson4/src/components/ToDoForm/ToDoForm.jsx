import {PureComponent} from "react";
import {toDoUrl, DEFAULT_TODO} from "../../constants.jsx";
import "./ToDoForm.sass";

export default class ToDoForm extends PureComponent {

  constructor() {
    super();

    this.handleTitle = this.handleTitle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCompleted = this.handleCompleted.bind(this);
  }

  state = {
    newToDo: DEFAULT_TODO,
  };

  handleTitle(event) {
    this.setState((actualState) => ({newToDo: {...actualState.newToDo, title: event.target.value}}))
  }

  handleCompleted(event) {
    this.setState((actualState) => ({newToDo: {...actualState.newToDo, completed: event.target.value}}))
  }

  async handleSubmit(event) {
    event.preventDefault();

    try {
      let request = await fetch(toDoUrl, {
            method: "POST",
            body: JSON.stringify({
              title: this.state.newToDo.title,
              completed: this.state.newToDo.completed
            }),
            headers: {
              "Content-type": "application/json"
            }
          }),
          response = await request.json();

      const addNewItem = this.props.addNewItem;
      addNewItem(response);
      this.setState(() => ({newToDo: DEFAULT_TODO}));

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="title">
            Title: <input type="text" id="title" value={this.state.newToDo.title} onChange={this.handleTitle}/>
          </label>
          <label htmlFor="checkbox">
            Completion: <input type="checkbox" checked={this.state.newToDo.completed} id="completed"
                               onChange={this.handleCompleted}/>
          </label>
          <button type="submit">Add</button>
        </form>
    )
  }
}