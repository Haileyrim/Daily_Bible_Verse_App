// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Home from './pages/Home';
import Journal from './pages/Journal';
import Entries from './pages/Entries';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav style={{ padding: '1rem', background: '#eee' }}>
          <Link to="/" style={{ marginRight: '1rem' }}>Home</Link>
          <Link to="/journal" style={{ marginRight: '1rem' }}>Journal</Link>
          <Link to="/entries">Entries</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/entries" element={<Entries />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
