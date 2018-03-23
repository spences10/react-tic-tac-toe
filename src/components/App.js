import React, { Component } from 'react'
import styled, { keyframes, ThemeProvider } from 'styled-components'

import { theme1, theme2, Button } from '../theme/globalStyle'
import ThemeSelect from './ThemeSelect'

import Board from './Board'
import { calculateWinner } from '../helpers'

import logo from '../logo.svg'
import './App.css'

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

class App extends Component {
  state = {
    history: [
      {
        squares: Array(9).fill(null)
      }
    ],
    xIsNext: true,
    stepNumber: 0,
    theme: theme1
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 ? false : true
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
          squares: squares
        }
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    })
  }

  handleThemeChange = e => {
    let theme = e.target.value
    theme === 'theme1' ? (theme = theme1) : (theme = theme2)
    this.setState({ theme })
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
          <a href="#" onClick={() => this.jumpTo(move)}>
            {desc}
          </a>
        </li>
      )
    })

    return (
      <ThemeProvider theme={this.state.theme}>
        <AppWrapper>
          <AppHeader>
            <AppLogo src={logo} className="App-logo" alt="logo" />
            <AppTitle>React tic-tac-toe</AppTitle>
          </AppHeader>
          <AppIntro>
            Follow along of the tutorial{' '}
            <underline>
              <code>
                https://facebook.github.io/react/tutorial/tutorial.html
              </code>.
            </underline>
          </AppIntro>
          <div className="game">
            <div className="game-board">
              <Board
                squares={current.squares}
                onClick={i => this.handleClick(i)}
              />
            </div>
            <div className="game-info">
              <div>{status}</div>
              <ol>{moves}</ol>
            </div>
          </div>
          <ThemeSelect handleThemeChange={this.handleThemeChange} />
        </AppWrapper>
      </ThemeProvider>
    )
  }
}

export default App
