import React, { Fragment, useContext, useState } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactStats = () => {
  const contactContext = useContext(ContactContext);
  const { contacts } = contactContext;

  const numOfContacts = contacts.length;
  const professional = contacts.filter((contact) => {
    return contact.type === 'professional';
  }).length;

  const personal = contacts.filter((contact) => {
    return contact.type === 'personal';
  }).length;

  return (
    <Fragment>
      <span>
        <h2 className="badge">
          You have {numOfContacts} {numOfContacts > 1 ? 'contacts' : 'contact'}
        </h2>
        <h4 className="badge">
          You have {professional}{' '}
          <span className="badge badge-success">professional</span>{' '}
          {professional > 1 || professional === 0 ? 'contacts' : 'contact'}
        </h4>
        <h4 className="badge">
          You have {personal} <span className='badge badge-primary'>personal</span>{' '}
          {personal > 1|| personal === 0 ? 'contacts' : 'contact'}
        </h4>
      </span>
    </Fragment>
  );
};

export default ContactStats;
