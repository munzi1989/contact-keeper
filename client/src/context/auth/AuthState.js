import React, { useReducer } from 'react';
import AuthContext from '../auth/AuthContext';
import AuthReducer from '../auth/AuthReducer';
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

const AuthState = (props) => {
  // 'initialState' is the same as 'state'
  const initialState = {
    //   get token from browsers local storage
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    user: null,
    loading: true,
    error: null,
  };

  //   state allows access to state, dispatch allows objects to reducer
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //  Load user, load user contacts

  // Register user, sign up

  // Login user, get token

  // Logout, destroy token

  // Clear Errors

  return (
    <AuthContext.Provider
      //   value defines what data/methods are available to use from AuthContext in other components
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
      }}
    >
      {/* pass values to compoenets/children within Context.Provider */}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
