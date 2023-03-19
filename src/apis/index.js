const API_URL = 'https://api.propelinspections.com/inventory/';
const USER_LOGIN = `${API_URL}accounts/authenticate`;
const USER_REGISTER = `${API_URL}accounts/register`;
const ADD_PROPERTY = `${API_URL}properties`;
const USER_LIST_PROPERTY = `${API_URL}properties/getByUserId`;
const LIST_PROPERTY = `${API_URL}properties`;
const EDIT_PROPERTY = `${API_URL}properties`;
const DELETE_PROPERTY = `${API_URL}properties`;
const UPLOAD_IMAGE = `${API_URL}properties/upload_image`;
const FORGOT_PASS = `${API_URL}accounts/forgot-password`;
export {
  USER_REGISTER,
  API_URL,
  USER_LOGIN,
  ADD_PROPERTY,
  EDIT_PROPERTY,
  DELETE_PROPERTY,
  UPLOAD_IMAGE,
  USER_LIST_PROPERTY,
  LIST_PROPERTY,
  FORGOT_PASS,
};
