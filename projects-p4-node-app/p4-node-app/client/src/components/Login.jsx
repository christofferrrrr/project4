// src/components/Login.jsx
import React, { useState } from 'react';
import { loginUser } from '../api/userService';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      alert(response.message);
      // Optionally redirect or store user data in state/context here
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <button onClick={() => alert('Forgot Password functionality not implemented yet')}>
        Forgot Password
      </button>
      <Link to="/register" className="link">No account? Sign up</Link>
    </div>
  );
};

export default Login;