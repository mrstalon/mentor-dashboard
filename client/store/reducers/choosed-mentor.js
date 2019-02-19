import { SET_CHOOSED_MENTOR, UNCHOOSE_CHOOSED_MENTOR } from '../../contstants/action-types.js';

export default (state = null, action) => {
  switch (action.type) {
    case SET_CHOOSED_MENTOR: {
      return action.payload || null;
    }
    case UNCHOOSE_CHOOSED_MENTOR: {
      return null;
    }
    default: {
      return state;
    }
  }
}