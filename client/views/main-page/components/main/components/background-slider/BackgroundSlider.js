import React from 'react'
import cx from 'classnames'

import './background-slider.scss'

import headerBgList from '../../../../../../contstants/header-bg-list';

class BackgroundSlider extends React.Component {
  state = {
    intervalId: null,
    bgImages: null,
    currentBgPosition: 0,
    loadedCount: 0
  }

  componentDidMount() {
    this.preloadImgsPath()
  }

  setAnimationInterval = () => {
    const slide = () => {
      const { currentBgPosition } = this.state
      let nextBgPosition
      if (currentBgPosition + 1 >= headerBgList.length) {
        nextBgPosition = 0
      } else {
        nextBgPosition = currentBgPosition + 1
      }
      this.setState({
        currentBgPosition: nextBgPosition
      })
    }

    return setInterval(slide, 3000)
  }

  componentWillUnmount() {
    const { currentBgPosition } = this.state
    clearInterval(currentBgPosition)
  }

  preloadImgsPath = () => {
    const bgImages = headerBgList.map((imgName) => require(`../../../../../../assets/${imgName}`))
    this.setState({ bgImages })
  }

  handleImgLoad = () => {
    this.setState((state) => ({
      loadedCount: state.loadedCount + 1
    }), () => {
      const { loadedCount, bgImages } = this.state
      if (loadedCount === bgImages.length) {
        const intervalId = this.setAnimationInterval()
        this.setState({ intervalId })
      }
    })
  }

  render() {
    const { bgImages, currentBgPosition } = this.state
    const { handleImgLoad } = this

    if (!bgImages) {
      return null
    }

    return (
      <React.Fragment>
        {bgImages.map((imgPath, id) => {
          const isCurrent = currentBgPosition === id
          return (
            <img
              alt="No img"
              onLoad={handleImgLoad}
              key={id}
              className={cx('main__bg-image', { 'active': isCurrent, 'out': !isCurrent  })}
              src={imgPath}
            />
          )
        })}
      </React.Fragment>
    )
  }
}

export default BackgroundSlider