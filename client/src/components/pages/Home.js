import React, { useContext } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import ContactContext from '../../context/contact/ContactContext';

const Home = () => {
  // init context
  const contactContext = useContext(ContactContext);
  // deconstruct to use below
  const { contacts } = contactContext;
  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div>
        {/* if contacts, render search bar */}
        {contacts.length !== 0 && <ContactFilter />}
        <Contacts />
      </div>
    </div>
  );
};

export default Home;
