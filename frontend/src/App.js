import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css"

const serverHost = process.env.REACT_APP_SERVER_HOST || 'localhost';
const serverPort = process.env.REACT_APP_SERVER_PORT || 5000;
const serverUrl = `http://${serverHost}:${serverPort}`;

console.log(serverUrl);

axios.defaults.baseURL = 'http://localhost:5000';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      console.log(response.data);
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const createUser = async () => {
    try {
      await axios.post('/users', { name, email });
      fetchUsers();
      setName('');
      setEmail('');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div>
      <h1>User Management</h1>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <button onClick={createUser}>Create User</button>

      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            <span>{user.user_name} - {user.user_email}</span>
            <button onClick={() => deleteUser(user.user_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
