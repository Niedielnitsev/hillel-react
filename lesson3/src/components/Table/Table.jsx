import {PureComponent} from "react";

import "./Table.sass";

export default class Table extends PureComponent {
  state = {...this.props};
  animalsLength = this.state.animals.length;

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.markRandomAnimalSelected();

      this.changeBorder();
    }, 2000);
  }

  markRandomAnimalSelected() {
    this.setState((actualState) => {
      const unselectedAnimals = actualState.animals.filter(animal => !animal.isSelected);
      const randomIndex = Math.floor(Math.random() * unselectedAnimals.length);
      const selectedAnimal = unselectedAnimals[randomIndex];

      return {
        animals: actualState.animals.map(animal => animal === selectedAnimal ? {...animal, isSelected: true} : animal)
      }
    })
  }

  changeBorder() {
    this.setState((actualState) => {
      const selectedLength = actualState.animals.filter(animal => animal.isSelected).length;
      const isAllSelected = selectedLength === this.animalsLength;
      const isHalfSelected = (!isAllSelected && selectedLength >= this.animalsLength / 2)

      if (isAllSelected) {
        this.componentWillUnmount()
        return {
          border: "20px"
        }
      } else if (isHalfSelected) {
        return {
          border: "10px"
        }
      }
      return {
        border: actualState.border
      }
    })
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const animals = this.state.animals;
    return (
        animals.length ?
            <table style={{borderWidth: this.state.border}}>
              <tbody>
              {animals.map((animal, index) => {
                return (
                    <tr key={index} className={animal.isSelected ? "selected" : null}>
                      <td>{animal.type}</td>
                      <td>{animal.icon}</td>
                    </tr>
                )
              })}
              </tbody>
            </table>
        : null
    )
  }
}
