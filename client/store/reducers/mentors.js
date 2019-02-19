import { SET_MENTORS_LIST } from '../../contstants/action-types';

export default (state = [], action) => {
  switch (action.type) {
    case SET_MENTORS_LIST: {
      return action.payload || [];
    }
    default: {
      return state;
    }
  }
}
