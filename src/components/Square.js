import React from 'react'
import styled from 'styled-components'

const StyledSquare = styled.button`
  background: #fff;
  border: 2px solid #999;
  float: left;
  font-size: 48px;
  font-weight: bold;
  line-height: 34px;
  height: 50px;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  width: 50px;
  &:focus {
    outline: none;
  }
`

class Square extends React.Component {
  constructor() {
    super()
    this.state = {
      value: null
    }
  }
  render() {
    return (
      <StyledSquare onClick={() => this.props.onClick()}>
        {this.props.value}
      </StyledSquare>
    )
  }
}

export default Square
