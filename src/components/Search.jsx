import React, { useState } from 'react';
import axios from 'axios';
import './Search.css'; 
import {useNavigate } from 'react-router-dom';

const Search = () => {
  const [filter, setFilter] = useState('');
  const [filteredImages, setFilteredImages] = useState([]);
  const navigate=useNavigate();

  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilter(value);
    const regex = new RegExp(`^${value.replace('x', '\\d')}`);
    const httpStatusCodes = [
      // Informational responses (100–199)
      100, 101, 102, 103,
      // Successful responses (200–299)
      200, 201, 202, 203, 204, 205, 206, 207, 208, 226,
      // Redirection messages (300–399)
      300, 301, 302, 303, 304, 305, 307, 308,
      // Client error responses (400–499)
      400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418, 421, 422, 423, 424, 425, 426, 428, 429, 431, 451,
      // Server error responses (500–599)
      500, 501, 502, 503, 504, 505, 506, 507, 508, 510, 511
    ];
    const codes = httpStatusCodes.filter(code => regex.test(code.toString()));
    const images = codes.map(code => ({ code, image: `https://http.dog/${code}.jpg` }));
    setFilteredImages(images);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const handleSave = async () => {
    const token = localStorage.getItem('token');
    const list = {
      name: filter,
      responseCodes: filteredImages.map(img => img.code),
      images: filteredImages.map(img => img.image)
    };
    try {
      await axios.post('http://localhost:5000/lists', list, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error('Error saving list:', error);
    }
  };

  return (
    <div className="container">
      <input type="text" value={filter} onChange={handleFilterChange} placeholder="Filter by response code (e.g., 2xx, 20x)" />
      <div className="images-container">
        {filteredImages.map(img => (
          <img key={img.code} src={img.image} alt={`Response code ${img.code}`} />
        ))}
      </div>
      <button onClick={handleSave}>Save List</button>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default Search;
