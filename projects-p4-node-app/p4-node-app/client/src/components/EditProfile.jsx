// components/EditProfile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditProfile = () => {
  const [user, setUser] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    sex: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get('/api/users/me'); // Adjust the API endpoint to get the logged-in user info
        setUser(response.data);
      } catch (error) {
        setError('Error fetching user profile');
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/users/${user._id}`, user); // Adjust the API endpoint for updating the user
      alert('Profile updated successfully');
    } catch (error) {
      setError('Error updating profile');
    }
  };

  return (
    <div>
      <h1>Edit Profile</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstname" value={user.firstname} onChange={handleChange} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastname" value={user.lastname} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleChange} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={user.phone} onChange={handleChange} />
        </div>
        <div>
          <label>Sex:</label>
          <select name="sex" value={user.sex} onChange={handleChange}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default EditProfile;
