import React, { useState, useContext, useEffect } from 'react';
// import { useHistory } from 'react-router-dom';
import AlertContext from '../../context/alert/AlertContext';
import AuthContext from '../../context/auth/AuthContext';

const Register = (props) => {
  // const history = useHistory();

  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;

  const authContext = useContext(AuthContext);
  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'User already exists') {
      setAlert(` ${error}`, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isAuthenticated, props.history]);

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
      register({
        name,
        email,
        password,
      });
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
          <input
            type="text"
            name="name"
            value={name}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
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
