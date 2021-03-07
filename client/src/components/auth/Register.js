import React, { useState, useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

const Register = () => {
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  // init local state
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  // deconstruct to use below
  const { name, email, password, password2 } = user;

  // update values as typed
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // submit form
  const onSubmit = (e) => {
    e.preventDefault();
    // ensure passwords match
    if (password !== password2) {
      setAlert(' Passwords must match', 'danger');
    } else {
      console.log('Register Submit');
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} required/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
            required
            minLength="6"
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Register;
