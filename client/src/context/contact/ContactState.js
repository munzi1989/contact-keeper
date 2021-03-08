import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './ContactContext';
import ContactReducer from './ContactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS,
} from '../types';

const ContactState = (props) => {
  // 'initialState' is the same as 'state'
  const initialState = {
    //   the array of users contacts
    contacts: null,
    // the object used to edit/delete the contact in question
    current: null,
    // the array of contacts matching the regex/text
    filtered: null,
    // errors
    error: null,
  };
  //   state allows access to state, dispatch allows objects to reducer
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // GET CONTACTS
  const getContacts = async () => {
    try {
      const res = await axios.get('/api/contacts');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
      console.log(err.message);
    }
  };

  //Add Contact
  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await axios.post('/api/contacts', contact, config);
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg,
      });
      console.log(err.message);
    }
  };

  //Delete contact
  const deleteContact = (_id) => {
    dispatch({ type: DELETE_CONTACT, payload: _id });
  };

  //Set current contact
  //  adds contact to state.current to edit
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };

  //clear current contact - set state.current back to null
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update contact
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };

  // filter contacts
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };

  // clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // CLEAR CONTACTS
  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS
    })
  }

  return (
    <ContactContext.Provider
      //   value defines what data/methods are available to use from ContactContext in other components
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        updateContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts
      }}
    >
      {/* pass values to compoenets/children within Context.Provider */}
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
