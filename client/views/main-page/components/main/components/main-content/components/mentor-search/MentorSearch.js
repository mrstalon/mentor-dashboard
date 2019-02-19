import React from 'react'

import './mentor-search.scss'

import PopupMentorsList from './components/popup-mentors-list';
import ChoosedMentor from './components/choosed-mentor';

class MentorInput extends React.Component {
  state = {
    userInput: ''
  }

  handleInputChange = (e) => {
    this.setState({userInput: e.target.value});
  }

  hidePopupMenu = () => {
    this.setState({ userInput: '' });
  }

  render() {
    const { handleInputChange, hidePopupMenu } = this;
    const { userInput } = this.state;
    const { choosedMentor } = this.props;

    return (
      <div className="mentor-search">
        <input
          className="mentor-search__input"
          placeholder={choosedMentor ? '' : 'Enter mentor github'}
          value={userInput}
          onChange={handleInputChange}
        />
        {choosedMentor && <ChoosedMentor />}
        {userInput && <PopupMentorsList userInput={userInput} hidePopupMenu={hidePopupMenu} />}
      </div>
    )
  }
}

export default MentorInput
