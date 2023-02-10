import {USER_LOGIN} from '../types';
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
        user: action.payload.user,
        is_logged_in: true,
        token: action.payload.token,
      };

    default:
      return state;
  }
};
export default userReducer;
