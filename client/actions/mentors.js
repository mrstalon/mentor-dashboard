import { SET_MENTORS_LIST, SET_CHOOSED_MENTOR, UNCHOOSE_CHOOSED_MENTOR } from '../contstants/action-types';

import { setAuthStatus } from './auth';

import apiWorker from '../helpers/apiWorker';

export const fetchMentors = () => {
  const request = apiWorker.fetchMentors();

  return (dispatch) => {
    request.then((mentors) => {
      dispatch(setAuthStatus(true))
      dispatch({
        type: SET_MENTORS_LIST,
        payload: mentors
      })
    })
      .catch(err => {
        if (err === 401) {
          dispatch(setAuthStatus(false))
        }
      })
  }
}

export const fetchMentor = (mentorGithub) => {
  const request = apiWorker.fetchMentor(mentorGithub);

  return (dispatch) => {
    request.then((mentor) => {
      dispatch(setAuthStatus(true))
      dispatch({
        type: SET_CHOOSED_MENTOR,
        payload: mentor
      })
    })
      .catch(err => {
      if (err === 401) {
        dispatch(setAuthStatus(false))
      }
    })
  }
}

export const unchooseMentor = () => ({
  type: UNCHOOSE_CHOOSED_MENTOR
})