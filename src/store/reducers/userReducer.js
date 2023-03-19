import {USER_LOGIN, USER_LOGOUT} from '../types';
const initialState = {
  user: null,
  is_logged_in: false,
  token: '',
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        user: action.payload,
        is_logged_in: true,
      };
    case USER_LOGOUT:
      return {
        ...state,
        user: null,
        is_logged_in: false,
      };
    default:
      return state;
  }
};
export default userReducer;
