import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import { SongsList, SongForm } from 'feature/songs';
import { Dashboard } from 'feature/dashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="page-wrapper">
          <div id="loading-icon-bx"></div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/songs" element={<SongsList />} />
            {/* <Route path="/songs/add-song" element={<SongForm />} />
            <Route path="/songs/:id/edit" element={<SongForm />} /> */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
