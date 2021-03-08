import React, { useContext} from 'react';
import ContactContext from '../../context/contact/ContactContext';
import AlertContext from '../../context/alert/AlertContext';
import PropTypes from 'prop-types';

// contact prop obtained from Contacts.js map
const ContactItem = ({ contact }) => {
  // initialize context
  const contactContext = useContext(ContactContext);
  const alertContext = useContext(AlertContext);

  // pull function to delete from context
  const { deleteContact, setCurrent, clearCurrent } = contactContext;
  const {setAlert} = alertContext;

  // deconstruct from contact prop to use below
  const { name, _id, phone, email, type } = contact;

  //   handle onClick for delete contact button
  const onDelete = () => {
    deleteContact(_id);
    clearCurrent();
    setAlert(' Contact Deleted', 'success')
    console.log(`Deleted Contact ${JSON.stringify(contact)}`);

  };

  return (
    <div className="card bg-light" >
      <h3 className="text-primary text-left">
        {name}{' '}
        <span
          style={{ float: 'right' }}
          className={
            'badge ' +
            (type === 'professional' ? 'badge-success' : 'badge-primary')
          }
        >
          {/* capitalize first letter */}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </h3>
      <ul className="list">
        {/* if email, render data*/}
        {email && (
          <li>
            <i className="fas fa-envelope-open"></i> {email}
          </li>
        )}
        {/* if phone, render data*/}
        {phone && (
          <li>
            <i className="fas fa-phone"></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className="btn btn-dark btn-sm"
          onClick={() => setCurrent(contact)}
        >
          Edit
        </button>
        <button className="btn btn-danger btn-sm" onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

// type-checking
ContactItem.propTypes = {
  contact: PropTypes.object.isRequired,
};

export default ContactItem;
