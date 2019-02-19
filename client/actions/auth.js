import { SET_AUTHORIZED_STATUS } from '../contstants/action-types';

export const setAuthStatus = (status) => {
  return {
    type: SET_AUTHORIZED_STATUS,
    payload: status
  }
}