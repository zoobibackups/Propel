import {CONTACT_PERMISSION, LOCATION_PERMISSION, SET_CONTACT} from '../types';
const initialState = {
  location_permission2: false,
};
const dummyReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOCATION_PERMISSION_2':
      return {
        ...state,
        location_permission2: true,
      };
    default:
      return state;
  }
};
export default dummyReducer;
