import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import PaperGenerator from './pages/PaperGenerator';
import CitationManager from './components/CitationManager';
import PlagiarismChecker from './pages/PlagiarismChecker';
import Collaboration from './pages/Collaboration';
import Settings from './pages/Settings';
import './App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <Router>
      <div className={`flex h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            sidebarOpen={sidebarOpen} 
            setSidebarOpen={setSidebarOpen} 
            darkMode={darkMode} 
            setDarkMode={setDarkMode} 
          />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/generator" element={<PaperGenerator />} />
              <Route path="/citations" element={<CitationManager />} />
              <Route path="/plagiarism" element={<PlagiarismChecker />} />
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