import React from 'react'
import './Square.css'

class Square extends React.Component {
  constructor() {
    super();
    this.state = {
      value: null,
    }
  }
  render() {
    return (
      <button className="square" onClick={() => this.setState({value: 'X'})}>
        {this.state.value}
      </button>
    )
  }
}

export default Square
