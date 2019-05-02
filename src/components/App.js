import { keyframes } from '@emotion/core'
import styled from '@emotion/styled'
import React, { Component } from 'react'
import { calculateWinner } from '../helpers'
import logo from '../images/logo.svg'
import { Button, GlobalStyle, theme1 } from '../theme/globalStyle'
import Board from './Board'

const AppWrapper = styled.div`
  text-align: center;
`

const AppHeader = styled.div`
  height: 12rem;
  padding: 1rem;
  color: ${props => props.theme.dark};
  background-color: ${props => props.theme.primary};
`

const AppTitle = styled.h1`
  font-weight: 900;
`

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const AppLogo = styled.img`
  animation: ${rotate360} infinite 2s linear;
  height: 80px;
  &:hover {
    animation: ${rotate360} infinite 0.5s linear;
  }
`

const AppIntro = styled.p`
  color: ${props => props.theme.dark};
  font-size: large;
  code {
    font-size: 1.3rem;
  }
`

const GameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const GameBoard = styled.div`
  flex-basis: auto;
`

const GameInfo = styled.div`
  flex-basis: auto;
`

class App extends Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null),
      },
    ],
    xIsNext: true,
    stepNumber: 0,
    theme: theme1,
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 ? false : true,
    })
  }

  handleClick(i) {
    const history = this.state.history.slice(
      0,
      this.state.stepNumber + 1
    )
    const current = history[this.state.stepNumber]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length,
    })
  }

  render() {
    const history = this.state.history
    const current = history[this.state.stepNumber]
    const winner = calculateWinner(current.squares)

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
    }

    const moves = history.map((step, move) => {
      const desc = move ? 'Move #' + move : 'Game start'
      return (
        <li key={move}>
          <Button onClick={() => this.jumpTo(move)}>{desc}</Button>
        </li>
      )
    })

    return (
      <div>
        <AppWrapper>
          <GlobalStyle />
          <AppHeader>
            <AppLogo src={logo} className="App-logo" alt="logo" />
            <AppTitle>React tic-tac-toe</AppTitle>
          </AppHeader>
          <AppIntro>
            Follow along of the tutorial{' '}
            <underline>
              <code>
                https://facebook.github.io/react/tutorial/tutorial.html
              </code>
              .
            </underline>
          </AppIntro>
          <GameWrapper>
            <GameBoard>
              <Board
                squares={current.squares}
                onClick={i => this.handleClick(i)}
              />
            </GameBoard>
            <GameInfo>
              <div>{status}</div>
              <ol>{moves}</ol>
            </GameInfo>
          </GameWrapper>
        </AppWrapper>
      </div>
    )
  }
}

export default App
