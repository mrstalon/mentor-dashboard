import React from 'react';
import { connect } from 'react-redux';

import './popup-mentors-list.scss';

import filterMentors from '../../../../../../../../../../helpers/filterMentors';

import { fetchMentor } from '../../../../../../../../../../actions/mentors';

import SearchedMentor from './components/searched-mentor';


class PopupMentorsList extends React.Component {
  state = {
    searchedMentors: []
  }

  chooseMentor = (mentorGithub) => {
    this.props.dispatch(fetchMentor(mentorGithub));
    localStorage.setItem('choosedMentor', mentorGithub);
    this.props.hidePopupMenu();
  }

  static getDerivedStateFromProps(props) {
    return {
      searchedMentors: filterMentors(props.userInput, props.mentors)
    }
  }

  render() {
    const { chooseMentor } = this;
    const { searchedMentors } = this.state;

    return (
      <div className="search__popup-menu">
        {searchedMentors.length === 0 && <div className="search__popup-menu-warning">
          No mentors found
        </div>}
        {searchedMentors.map((mentor, id) => {
          return <SearchedMentor mentorGithub={mentor} key={id} clickHandler={chooseMentor} />
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  mentors: state.mentors
})

export default connect(mapStateToProps)(PopupMentorsList);