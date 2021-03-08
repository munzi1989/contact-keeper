import React, { Fragment, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Spinner from '../layout/Spinner';

const Contacts = () => {
  // initialize context API
  const contactContext = useContext(ContactContext);
  // pull contacts array from ContactState using Context API
  const { contacts, filtered, getContacts, loading } = contactContext;

  useEffect(() => {
    getContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if no contacts, render message
  if (contacts !== null && contacts.length === 0 && !loading) {
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
        {contacts !== null && !loading ? (
          <TransitionGroup>
            {/* if searching for contacts, render filtered contacts */}
            {filtered
              ? filtered.map((contact) => (
                  <CSSTransition
                    key={contact._id}
                    timeout={500}
                    classNames="item"
                  >
                    <ContactItem contact={contact} />
                  </CSSTransition>
                ))
              : // else, return all contacts
                contacts.map((contact) => (
                  <CSSTransition
                    key={contact._id}
                    timeout={500}
                    classNames="item"
                  >
                    <ContactItem contact={contact} />
                  </CSSTransition>
                ))}
          </TransitionGroup>
        ) : (
          <Spinner />
        )}
      </Fragment>
    );
  }
};

export default Contacts;
