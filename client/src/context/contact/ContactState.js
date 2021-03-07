import React, { useReducer } from 'react';
import uuid from 'uuid';
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
} from '../types';

const ContactState = (props) => {
  // 'initialState' is the same as 'state'
  const initialState = {
    //   the array of users contacts
    contacts: [
      {
        id: 1,
        name: 'Jill Johnson',
        email: 'me@me.com',
        phone: '111-111-1111',
        type: 'personal',
      },
      {
        id: 2,
        name: 'Mike Michaelson',
        email: 'you@me.com',
        phone: '222-222-2222',
        type: 'personal',
      },
      {
        id: 3,
        name: 'Jeff Jefferson',
        email: 'us@me.com',
        phone: '333-333-3333',
        type: 'professional',
      },
    ],
    // the object used to edit/delete the contact in question
    current: null,
    // the array of contacts matching the regex/text
    filtered: null,
  };
  //   state allows access to state, dispatch allows objects to reducer
  const [state, dispatch] = useReducer(ContactReducer, initialState);

  //Add Contact
  const addContact = (contact) => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };

  //Delete contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
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

  return (
    <ContactContext.Provider
      //   value defines what data/methods are available to use from ContactContext in other components
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        deleteContact,
        updateContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
      }}
    >
      {/* pass values to compoenets/children within Context.Provider */}
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
