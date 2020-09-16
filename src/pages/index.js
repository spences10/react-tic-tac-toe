/** @jsx h */
import { css } from 'linaria'
import { Fragment, h } from 'preact'
import { Helmet } from 'react-helmet'
import { Game } from '../components/game'

const H1Styled = css`
  text-transform: uppercase;
  color: red;
`

export default () => {
  return (
    <Fragment>
      <Helmet>
        <link rel="stylesheet" href="/styles/src/pages/index.css" />
      </Helmet>
      <header>
        <div className={H1Styled}>Hey you</div>
      </header>
      <Game />
    </Fragment>
  )
}
