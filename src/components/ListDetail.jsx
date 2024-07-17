import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './ListDetail.css';

const ListDetail = () => {
  const { id } = useParams();
  const [list, setList] = useState(null);
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchList = async () => {
      const token = localStorage.getItem('token');
      const { data } = await axios.get(`http://localhost:5000/lists/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setList(data);
      setName(data.name);
    };
    fetchList();
  }, [id]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    await axios.put(`http://localhost:5000/lists/${id}`, { name, responseCodes: list.responseCodes }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate('/lists');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
    navigate('/login');
  };

  if (!list) return <div>Loading...</div>;

  return (
    <div className="list-detail-container">
      <h1>{name}</h1>
      <div className="images-container">
        {list.responseCodes.map((code, index) => (
          <img key={index} src={`https://http.dog/${code}.jpg`} alt={`Response code ${code}`} />
        ))}
      </div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleSave}>Save Changes</button>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default ListDetail;
