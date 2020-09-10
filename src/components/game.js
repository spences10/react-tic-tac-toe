import React, { useReducer } from 'react'

function makeGrid(rows, columns, mapper) {
  return Array(rows)
    .fill()
    .map(() => Array(columns).fill().map(mapper))
}

// clone deep object
const clone = x => JSON.parse(JSON.stringify(x))

const newGrid = () => makeGrid(3, 3, () => null)

// check row and cols
function checkThree(a, b, c) {
  // if any are null return false
  if (!a || !b || !c) return false
  // check for winning condition
  return a === b && b === c
}

/**
 * flatten array
 * ES2019 Array.prototype.flat()
 * or
 * return a new array with the previous array spread into it
 * then spread ann items in the current item, and
 * start with an empty array
 */

const flatArray = arr =>
  arr.reduce((acc, cur) => [...acc, ...cur], [])

// check for win on all possible combinations
function checkForWin(gridFlat) {
  const [nw, n, ne, w, c, e, sw, s, se] = gridFlat

  // pass in rows
  // pass columns
  // pass diagonals
  return (
    checkThree(nw, n, ne) ||
    checkThree(w, c, e) ||
    checkThree(sw, s, se) ||
    checkThree(nw, w, sw) ||
    checkThree(n, c, s) ||
    checkThree(ne, e, se) ||
    checkThree(nw, c, se) ||
    checkThree(ne, c, sw)
  )
}

function checkForDraw(gridFlat) {
  return (
    !checkForWin(gridFlat) &&
    gridFlat.filter(Boolean).length === gridFlat.length
  )
}

const NEXT_TURN = {
  O: 'X',
  X: 'O',
}

const getInitialState = () => ({
  grid: newGrid(),
  turn: 'X',
  status: 'inProgress',
})

const reducer = (state, action) => {
  if (state.status === 'win' && action.type !== 'RESET') {
    return state
  }
  switch (action.type) {
    case 'RESET':
      return getInitialState()

    case 'CLICK': {
      const { x, y } = action.payload
      const { grid, turn } = state

      // check if x or o are there already
      if (grid[y][x]) {
        return state
      }

      const nextState = clone(state)

      nextState.grid[y][x] = turn

      const flatGrid = flatArray(nextState.grid)

      if (checkForWin(flatGrid)) {
        nextState.status = 'win'
        return nextState
      }

      if (checkForDraw(flatGrid)) {
        return getInitialState()
      }

      nextState.turn = NEXT_TURN[turn]

      return nextState
    }

    default:
      return state
  }
}

export const Game = () => {
  const [state, dispatch] = useReducer(reducer, getInitialState())
  const { grid, status, turn } = state

  const handleClick = (x, y) => {
    dispatch({ type: 'CLICK', payload: { x, y } })
  }

  const reset = () => {
    dispatch({ type: 'RESET' })
  }

  return (
    <div css={{ display: 'inline-block' }}>
      <div css={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>Next turn: {turn}</div>
        <div>{status === 'win' ? `${turn} won!` : null}</div>
        <button onClick={reset} type="button">
          Reset
        </button>
        <Grid grid={grid} handleClick={handleClick} />
      </div>
    </div>
  )
}

function Grid({ grid, handleClick }) {
  return (
    <div css={{ display: 'inline-block' }}>
      <div
        style={{
          backgroundColor: '#444',
          display: 'grid',
          gridAutoRows: `repeat(${grid.length}, 1fr)`,
          gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`,
          gridGap: 2,
        }}
      >
        {grid.map((row, rowIndex) =>
          row.map((value, columnIndex) => (
            <Cell
              key={`${columnIndex}-${rowIndex}`}
              onClick={() => {
                handleClick(columnIndex, rowIndex)
              }}
              value={value}
            />
          ))
        )}
      </div>
    </div>
  )
}

function Cell({ value, onClick }) {
  return (
    <div css={{ backgroundColor: '#fff', width: 100, height: 100 }}>
      <button
        type="button"
        css={{ width: '100%', height: '100%' }}
        onClick={onClick}
      >
        {value}
      </button>
    </div>
  )
}
