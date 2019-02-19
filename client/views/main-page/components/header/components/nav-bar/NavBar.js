import React from 'react'
import { connect } from 'react-redux'

import './nav-bar.scss'

import { setAuthStatus } from '../../../../../../actions/auth'

class NavBar extends React.Component {
  handleLogout = () => {
    fetch('/auth/logout')
      .then((res) => {
        if (res.ok) {
          this.props.dispatch(setAuthStatus(false))
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    const { handleLogout } = this
    const { isUserAuthed } = this.props
    const logo = require('../../../../../../assets/logo.svg')

    return (
        <nav className="nav-bar">
          <img className="nav-bar__logo" src={logo} />
          <div className="auth-bar">
            {!isUserAuthed && <a href="/auth/github" className="auth-bar__link">Login</a>}
            {isUserAuthed && <button onClick={handleLogout} className="auth-bar__link">Logout</button>}
          </div>
        </nav>
    )
  }
}

const mapStateToProps = (state) => ({
  isUserAuthed: state.isUserAuthed,
})

export default connect(mapStateToProps)(NavBar)
