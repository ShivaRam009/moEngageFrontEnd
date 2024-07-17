import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Lists = () => {
  const [lists, setLists] = useState([]);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchLists = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get('http://localhost:5000/lists', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLists(data);
    };
    fetchLists();
  }, []);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/lists/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setLists(lists.filter(list => list._id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
    navigate('/login');
  };

  return (
    <div>
      <h1>Saved Lists</h1>
      <ul>
        {lists.map(list => (
          <li key={list._id}>
            <Link to={`/lists/${list._id}`}>{list.name}</Link>
            <button onClick={() => handleDelete(list._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default Lists;
