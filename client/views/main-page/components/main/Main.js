import React from 'react'

import './main.scss'

import MainContent from './components/main-content'
import BackgroundSlider from './components/background-slider'

class Main extends React.Component {
  render() {
    return (
      <main className="main">
        <BackgroundSlider />
        <MainContent />
      </main>
    )
  }
}

export default Main
