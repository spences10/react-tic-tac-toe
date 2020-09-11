import { Fragment } from 'preact'
import React from 'react'
import { Game } from '../components/game'

export default () => {
  return (
    <Fragment>
      <Helmet>
        <link rel="stylesheet" href="/styles/src/pages/index.css" />
      </Helmet>
      <Game />
    </Fragment>
  )
}
