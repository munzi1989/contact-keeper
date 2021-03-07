import React, { useReducer } from 'react';
import axios from 'axios';
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
    isAuthenticated: false,
    user: null,
    loading: true,
    error: null,
  };

  //   state allows access to state, dispatch allows objects to reducer
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  //  Load user, load user contacts
  const loadUser = () => {
    console.log('Load user');
  };

  // Register user, sign up
  const register = async (FormData) => {
    // add headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/users', FormData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
      console.log(err.message);
    }
  };

  // Login user, get token
  const loginUser = () => {
    console.log('Login user');
  };

  // Logout, destroy token
  const logoutUser = () => {
    console.log('Logout');
  };

  // Clear Errors
  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  return (
    <AuthContext.Provider
      //   value defines what data/methods are available to use from AuthContext in other components
      value={{
        loadUser,
        register,
        loginUser,
        logoutUser,
        clearErrors,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        user: state.user,
        loading: state.loading,
        error: state.error,
      }}
    >
      {/* pass values to compoenets/children within Auth.Provider */}
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
