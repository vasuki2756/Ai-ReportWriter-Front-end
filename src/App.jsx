// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import PaperGenerator from './pages/PaperGenerator';
import CitationsPage from './pages/CitationsPage';

import PlagiarismPage from "./pages/PlagiarismPage";
import Collaboration from './pages/Collaboration';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`app-container ${darkMode ? 'dark' : ''}`}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {sidebarOpen && (
          <div 
            className="sidebar-backdrop open"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}
        
        <div className="main-content">
          <Header 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
          />
          
          <main className="content-area">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/generator" element={<PaperGenerator />} />
              <Route path="/citations" element={<CitationsPage />} />
              <Route path="/plagiarism" element={<PlagiarismPage />} />
              <Route path="/collaboration" element={<Collaboration />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;