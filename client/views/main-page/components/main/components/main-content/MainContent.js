import React from 'react'
import { connect } from 'react-redux';

import './main-content.scss'

import { fetchMentors, fetchMentor } from '../../../../../../actions/mentors';

import MentorSearch from './components/mentor-search';
import MentorTable from './components/mentor-table';

class MainContent extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchMentors())

    const mentorName = localStorage.getItem('choosedMentor');
    if (mentorName) {
      this.props.dispatch(fetchMentor(mentorName))
    }
  }

  render() {
    const { choosedMentor, isUserAuthed } = this.props;

    return (
      <section className="main-content">
        {isUserAuthed && <MentorSearch choosedMentor={choosedMentor} />}
        {isUserAuthed && choosedMentor && <MentorTable mentor={choosedMentor} />}
        {isUserAuthed && !choosedMentor && <h1 className="main-content__warning">No mentor choosed</h1>}
        {!isUserAuthed && <h1 className="main-content__warning">Вы не вошли в аккаунт, доступ запрещен</h1>}
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  choosedMentor: state.choosedMentor,
  isUserAuthed: state.isUserAuthed
})

export default connect(mapStateToProps)(MainContent)