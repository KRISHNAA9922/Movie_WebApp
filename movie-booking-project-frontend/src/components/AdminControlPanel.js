import React, { useState } from 'react';
import axios from 'axios';

const AdminControlPanel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAddAdmin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/admin/signup', {
        email,
        password,
      });
      alert('Admin added successfully: ' + response.data.admin.email);
    } catch (error) {
      alert('Error adding admin: ' + error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Add New Admin</h2>
      <form onSubmit={handleAddAdmin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Admin</button>
      </form>
    </div>
  );
};

export default AdminControlPanel;
