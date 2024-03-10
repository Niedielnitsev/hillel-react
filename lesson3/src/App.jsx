import Table from "./components/Table/Table.jsx";
import {animals} from "./constants.jsx";
import {Component} from "react";

export default class App extends Component {

  render() {
    return (
      <>
        <div>Animals</div>
        <Table animals={animals} />
      </>
    )
  }
}
