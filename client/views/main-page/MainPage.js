import React from 'react'

import './main-page.scss'

import Header from './components/header'
import Main from './components/main'


class MainPage extends React.Component {

  render() {
    return (
      <div className="main-page">
        <Header/>
        <Main />
      </div>
    )
  }
}

export default MainPage