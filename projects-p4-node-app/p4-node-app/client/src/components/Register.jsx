// src/components/Register.jsx
import React, { useState } from 'react';
import { registerUser } from '../api/userService';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    sex: '',
    password: '',
    confirmPassword: '',
    isactive: true,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    // Name validation
    if (!/^[A-Za-z]+$/.test(formData.firstname)) {
      newErrors.firstname = 'First name should contain letters only';
    }
    if (!/^[A-Za-z]+$/.test(formData.lastname)) {
      newErrors.lastname = 'Last name should contain letters only';
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Phone number validation
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number should be 10 digits';
    }

    // Password validation
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      newErrors.password = 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character';
    }

    // Password confirmation validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await registerUser({ ...formData, phone: `+63${formData.phone}` });
        alert(response.message);
      } catch (error) {
        setServerError(error.message || 'Server error');
      }
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="firstname"
          placeholder="First Name"
          onChange={handleChange}
        />
        {errors.firstname && <p className="error">{errors.firstname}</p>}
        
        <input
          type="text"
          name="lastname"
          placeholder="Last Name"
          onChange={handleChange}
        />
        {errors.lastname && <p className="error">{errors.lastname}</p>}
        
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        {errors.email && <p className="error">{errors.email}</p>}
        
        <div className="phone-input">
          <span>+63</span>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            onChange={handleChange}
          />
        </div>
        {errors.phone && <p className="error">{errors.phone}</p>}
        
        <div className="radio-group">
          <label>
            <input
              type="radio"
              name="sex"
              value="Male"
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="sex"
              value="Female"
              onChange={handleChange}
            />
            Female
          </label>
        </div>
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        {errors.password && <p className="error">{errors.password}</p>}
        
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        
        <button type="submit">Register</button>
      </form>
      {serverError && <p className="error">{serverError}</p>}
      <Link to="/login" className="link">Already have an account? Login</Link>
    </div>
  );
};

export default Register;