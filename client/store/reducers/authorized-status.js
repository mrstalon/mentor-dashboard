import { SET_AUTHORIZED_STATUS } from '../../contstants/action-types';

export default (state = false, action) => {
  switch (action.type) {
    case SET_AUTHORIZED_STATUS: {
      return action.payload;
    }
    default: {
      return state;
    }
  }
}