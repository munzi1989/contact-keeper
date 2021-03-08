import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/AuthContext';
import ContactContext from '../../context/contact/ContactContext';

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logoutUser, user } = authContext;

  const contactContext = useContext(ContactContext);
  const {clearContacts} = contactContext;

  const onLogout = () => {
    logoutUser();
    clearContacts();
    console.log('User Logged out');
  };

  const authLinks = (
    <Fragment>
      <span>Hello {user && user.name}!</span>
      <a href="#!" onClick={onLogout}>
        <i className="fas fa-sign-out-alt btn btn-sm">
          <span className="hide-"></span> Logout
        </i>
      </a>
    </Fragment>
  );
  const guestLinks = (
    <Fragment>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </Fragment>
  );

  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <span>{isAuthenticated ? authLinks : guestLinks}</span>
    </div>
  );
};

// type checking
Navbar.Propytypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'far fa-id-card',
};

export default Navbar;
