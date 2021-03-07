import React, { useState } from 'react';

const Login = () => {
    // init local state
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
// deconstruct to use below
  const { email, password} = user;
// update values as typed
  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
// submit form
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Login Submit');
  };

  return (
    <div className="form-container">
      <h1>
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
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
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
};

export default Login;
