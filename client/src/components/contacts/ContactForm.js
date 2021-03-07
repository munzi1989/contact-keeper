import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext);

  const { addContact, current, clearCurrent, updateContact } = contactContext;

  useEffect(() => {
    if (current !== null) {
      // fills form with state.current data
      setContact(current);
    } else {
      // if state.current === null, form is set to default values
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
    }
    // only fire if state.current or contactContext is changed
  }, [contactContext, current]);

  //   initialize local state and update method locally
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal',
  });

  //   deconstruct for usage in form
  const { name, email, phone, type } = contact;

  // update state values as they are typed in
  const onChange = (e) =>
    // fills form with param values
    setContact({ ...contact, [e.target.name]: e.target.value });

  //   update state through context methods to add contact
  const onSubmit = (e) => {
    e.preventDefault();
    if (current === null) {
      // use addContact method from context to add contact to array
      addContact(contact);
      // return form to default values
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal',
      });
      console.log(`Contact added: ${JSON.stringify(contact)} `);
    } else {
      // if current, update contact with current data
      updateContact(contact);
      console.log(`Updated Contact: ${JSON.stringify(contact)}`)
    }
    clearForm();
  };

  const clearForm = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="text-primary">
        {current ? 'Update Contact' : 'Add Contact'}
      </h2>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={onChange}
      />
      <input
        type="email"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onChange}
      />
      <input
        type="text"
        placeholder="Phone"
        name="phone"
        value={phone}
        onChange={onChange}
      />
      <h5>Contact Type</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}
      Personal{' '}
      <input
        type="radio"
        name="type"
        value="professional"
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}
      Professional
      <div>
        <input
          type="submit"
          value={current ? 'Update Contact' : 'Add Contact'}
          className="btn btn-primary btn-block"
        />
        {current && (
          <input
            type="submit"
            value="Cancel"
            className="btn btn-danger btn-block"
            onClick={clearForm}
            style={{ textAlign: 'center' }}
          />
        )}
      </div>
    </form>
  );
};

export default ContactForm;
