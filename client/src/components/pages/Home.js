import React, { useContext, useEffect } from 'react';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import ContactContext from '../../context/contact/ContactContext';
import AuthContext from '../../context/auth/AuthContext';

const Home = () => {
  // init context
  const contactContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  // deconstruct to use below
  const { contacts } = contactContext;
  const { loadUser, loading } = authContext;

  // load user to keep authentication/user data after redirect from login/register page
  useEffect(() => {
    loadUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid-2">
      <div>
        <ContactForm />
      </div>
      <div >
        {/* if contacts, render search bar */}
        {contacts !== null && !loading && contacts.length !== 0 && (
          <ContactFilter />
        )}
          <Contacts />
      </div>
    </div>
  );
};

export default Home;
