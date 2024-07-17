import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Search from './components/Search';
import Lists from './components/Lists';
import ListDetail from './components/ListDetail';

const App = () => {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <div>
        {token ? (
          <>
            <nav>
              <Link to="/search">Search</Link>
              <Link to="/lists">Lists</Link>
              <button onClick={() => { localStorage.removeItem('token'); window.location.href = '/login'; }}>Logout</button>
            </nav>
            <Routes>
              <Route path="/search" element={<Search />} />
              <Route path="/lists" element={<Lists />} />
              <Route path="/lists/:id" element={<ListDetail />} />
              
            </Routes>
          </>
        ) : (
          <>
            <nav>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </nav>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
};

export default App;
