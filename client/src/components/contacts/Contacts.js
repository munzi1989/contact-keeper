import React, { Fragment, useContext } from 'react';
import ContactContext from '../../context/contact/ContactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
    // initialize context API
  const contactContext = useContext(ContactContext);
    // pull contacts array from ContactState using Context API
  const { contacts } = contactContext;

  return (
    <Fragment>
        {/* map through contacts and render w/ ContactItem component */}
      {contacts.map((contact) => (
        <ContactItem key={contact.id} contact={contact}/>
      ))}
    </Fragment>
  );
};

export default Contacts;
