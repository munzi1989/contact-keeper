import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

const Contacts = () => {
  // initialize context API
  const contactContext = useContext(ContactContext);
  // pull contacts array from ContactState using Context API
  const { contacts, filtered } = contactContext;

  // if no contacts, render message
  if (contacts.length === 0) {
    return (
      <Fragment>
        <div className="container">
          <h3>Please add a contact...</h3>
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {/* if searching for contacts, render filtered contacts */}
        {filtered
          ? filtered.map((contact) => (
              <ContactItem key={contact.id} contact={contact} />
            ))
          : // else, return all contacts
            contacts.map((contact) => (
              <ContactItem key={contact.id} contact={contact} />
            ))}
      </Fragment>
    );
  }
};

export default Contacts;
