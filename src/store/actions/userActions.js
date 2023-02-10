import {USER_LOGIN, USER_REIGSTER} from '../types';
export const userLogin = data => {
  return dispatch => {
    dispatch({
      type: USER_LOGIN,
      payload: data,
    });
  };
};

export const registerUser = data => {
  return dispatch => {
    dispatch({
      type: USER_REIGSTER,
      payload: data,
    });
  };
};
