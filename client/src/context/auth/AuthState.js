import React, { useReducer } from 'react';
import axios from 'axios';
import SetAuthToken from '../../utils/SetAuthToken';
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
  CLEAR_ERRORS
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

  //  LOAD USER, load user contacts
  const loadUser = async () => {
    // if valid token, set user token to use globally for axios
    if (localStorage.token) {
      SetAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get('/api/auth');

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
      });
      console.log(err.message);
    }
  };

  // REGISTER USER, sign up
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
      // load user after register is successful
      loadUser();
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
      console.log(err.message);
    }
  };

  // LOGIN USER, get token
  const loginUser = async (FormData) => {
    // add headers
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const res = await axios.post('/api/auth', FormData, config);
      dispatch({
        type: LOGIN_SUCCESSFUL,
        payload: res.data,
      });
      // load user after register is successful
      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
      console.log(err.message);
    }
  };

  // LOGOUT, destroy token
  const logoutUser = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  // CLEAR ERRORS
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
