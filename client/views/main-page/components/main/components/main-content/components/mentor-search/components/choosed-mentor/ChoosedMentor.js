import React from 'react';
import { connect } from 'react-redux';

import './choosed-mentor.scss';

import { unchooseMentor } from '../../../../../../../../../../actions/mentors.js';

class ChoosedMentor extends React.Component {
  unchooseMentor = () => {
    this.props.dispatch(unchooseMentor());
    localStorage.removeItem('choosedMentor');
  }

  render() {
    const { choosedMentor } = this.props;
    const { unchooseMentor } = this;

    if (!choosedMentor) {
      return null;
    }

    const avatarPath = require('../../../../../../../../../../assets/default-avatar.png');
    const closeIconPath = require('../../../../../../../../../../assets/close-cross-icon.svg');

    return (
      <div className="mentor-search__input-choosed-mentor">
        <img alt="No img" className="popup-menu__item-avatar" src={avatarPath} />
        <span className="popup-menu__item-name" >{choosedMentor.github}</span>
        <button className="close-button" onClick={unchooseMentor}>
          <img alt="No img" className="close-button__icon" src={closeIconPath} />
        </button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  choosedMentor: state.choosedMentor
})

export default connect(mapStateToProps)(ChoosedMentor);
