import React, { useReducer } from 'react';
import AlertContext from '../alert/AlertContext';
import AlertReducer from '../alert/AlertReducer';
import { SET_ALERT, REMOVE_ALERT } from '../types';
import uuid from 'uuid';

const AlertState = (props) => {
  // 'initialState' is the same as 'state'
  const initialState = [];

  //   state allows access to state, dispatch allows types to reducer
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //   Set Alert    optional timeout param
  const setAlert = (msg, type, timeout = 5000) => {
    const id = uuid.v4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });
    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, timeout);
  };

  return (
    <AlertContext.Provider
      //   value defines what data/methods are available to use from AlertContext in other components
      value={{
        alerts: state,
        setAlert
      }}
    >
      {/* pass values to compoenets/children within Alert.Provider */}
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
