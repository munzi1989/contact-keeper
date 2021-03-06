import React, { useContext } from 'react';
import ContactContext from '../../context/contact/ContactContext';
import PropTypes from 'prop-types';

const ContactItem = ({ contact }) => {
  // initialize context
  const contactContext = useContext(ContactContext);

  // pull function to delete from context
  const { deleteContact } = contactContext;

  // deconstruct from contact prop
  const { name, id, phone, email, type } = contact;

  const onDelete = () => {
    deleteContact(id);
  };

  return (
    <div className="card bg-light">
      <h3 className="text-primary text-left">
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i>
            {' '}{email}
          </li>
        )}
        {phone && (
          <li>
            <i className="fas fa-phone"></i>
            {' '}{phone}
          </li>
        )}
      </ul>
      <p>
        <button className="btn btn-dark btn-sm">Edit</button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
