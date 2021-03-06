import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESSFUL,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
} from '../types';

const Reducer = (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESSFUL:
      // store token in local browser storage
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      //   if failed auth || register || login, remove token form local storage
      // set state to default
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        loading: false,
        user: null,
        isAuthenticated: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default Reducer;
