import React from 'react';

import './searched-mentor.scss';


class SearchedMentor extends React.Component {
  render() {
    const { mentorGithub, clickHandler } = this.props;
    const imgPath = require(`../../../../../../../../../../../../assets/default-avatar.png`)

    return (
      <div className="popup-menu__item" onClick={() => clickHandler(mentorGithub)}>
        <img alt="No Img" className="popup-menu__item-avatar" src={imgPath} />
        <span className="popup-menu__item-name">{mentorGithub}</span>
      </div>
    )
  }
}

export default SearchedMentor;