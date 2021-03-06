import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Navbar = ({ title, icon }) => {
  return (
    <div className="navbar bg-primary">
      <h1>
        <i className={icon} /> {title}
      </h1>
      <span>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </span>
    </div>
  );
};

Navbar.Propytypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: 'Contact Keeper',
  icon: 'far fa-id-card',
};

export default Navbar;
