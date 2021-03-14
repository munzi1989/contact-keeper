import React, { useContext, useRef, useEffect, Fragment } from 'react';
import ContactContext from '../../context/contact/ContactContext';

const ContactFilter = () => {
  //  init context
  const contactContext = useContext(ContactContext);
  // deconstruct from context to use below
  const { filtered, clearFilter, filterContacts } = contactContext;

  const text = useRef('');

  useEffect(() => {
    if (filtered === null) {
      text.current.value = '';
    }
  });

  //   filter contacts based on text in search bar
  const onChange = (e) => {
    if (text.current.value !== '') {
      filterContacts(e.target.value);
    } else {
      clearFilter();
    }
  };

  //   clear button handler
  const clear = () => {
    clearFilter();
  };

  return (
    <Fragment>
      <form>
        <input
          ref={text}
          type="text"
          placeholder="Find Contacts..."
          onChange={onChange}
        />
      </form>
      {/* render clear button if filtered state has content */}
      {filtered && (
        <input
          type="submit"
          value="Clear Filter"
          className="btn btn-danger btn-block"
          onClick={clear}
          style={{ textAlign: 'center' }}
        />
      )}
    </Fragment>
  );
};

export default ContactFilter;
