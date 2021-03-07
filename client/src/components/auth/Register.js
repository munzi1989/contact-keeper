import React, { useState } from 'react';

const Register = () => {
    // init local state
  const [user, setUser ] = useState({
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
  const onSubmit = e => {
      e.preventDefault();
      console.log('Register Submit')
  }

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" name="name" value={name} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={email} onChange={onChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm</label>
          <input
            type="password"
            name="password2"
            value={password2}
            onChange={onChange}
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
