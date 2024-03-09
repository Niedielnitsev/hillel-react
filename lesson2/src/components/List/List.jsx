import {Component} from 'react';
import './List.sass';

export default class List extends Component {

  constructor(props) {
    super(props);
    this.state = {...props};

    setTimeout(() => {
      this.state.list.push('Kyiv');
      this.setState({
        list: this.state.list,
        color: 'lightpink'
      })
    }, 1000);

    setTimeout(() => {
      this.setState({
        bgColorList: [...this.state.list.map(() => getRainbowColor())],
        list: this.state.list.sort((a, b) => a.localeCompare(b))
      })
    }, 3000);
  }

  render() {
    const {list, color, bgColorList} = this.state;
    return (
      list.length ?
        <div className="container">
          <ul>
            {list.map((item, index) => {
              return <li style={{color, background: getBackgroundColor(bgColorList, index)}} key={index}>{item}</li>
            })}
          </ul>
        </div>
      : null
    );
  }
}

function getBackgroundColor(bgColorList, index) {
  return bgColorList ? bgColorList[index] : 'white';
}

function getRainbowColor() {
  const rainbowColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
  return rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
}
