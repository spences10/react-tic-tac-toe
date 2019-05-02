import styled from '@emotion/styled'
import React, { useState } from 'react'

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

const BoardWrapper = styled.div`
  margin: 1rem;
`

const BoardRow = styled.div`
  &:after {
    clear: both;
    content: '';
    display: table;
  }
`

const Square = ({ value, onClick }) => {
  return <StyledSquare onClick={onClick}>{value}</StyledSquare>
}

const Board = () => {
  const [squares, setSquares] = useState(Array(9).fill(null))
  const [isNext, setNext] = useState(true)

  const renderSquare = i => {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          const nextSquares = squares.slice()
          nextSquares[i] = isNext ? 'x' : 'o'
          setNext(!isNext)
          setSquares(nextSquares)
        }}
      />
    )
  }

  return (
    <BoardWrapper>
      <BoardRow>
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </BoardRow>
      <BoardRow>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </BoardRow>
      <BoardRow>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </BoardRow>
    </BoardWrapper>
  )
}

export default Board
