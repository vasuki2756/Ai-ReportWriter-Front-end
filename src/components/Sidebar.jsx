import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiFileText, 
  FiBook, 
  FiShield, 
  FiUsers, 
  FiSettings
} from 'react-icons/fi';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/', icon: FiHome, label: 'Dashboard' },
    { path: '/generator', icon: FiFileText, label: 'Paper Generator' },
    { path: '/citations', icon: FiBook, label: 'Citation Manager' },
    { path: '/plagiarism', icon: FiShield, label: 'Plagiarism Checker' },
    { path: '/collaboration', icon: FiUsers, label: 'Collaboration' },
    { path: '/settings', icon: FiSettings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-56 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'shadow-xl' : ''} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col h-full`}>
        <div className="p-5 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
              <FiFileText className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">ResearchAI</h1>
              <p className="text-xs text-gray-600 dark:text-gray-400">Academic Paper Generator</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                location.pathname === item.path 
                  ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-l-4 border-indigo-500 dark:border-indigo-400' 
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-800 hover:text-white dark:hover:bg-gray-700'
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className={`mr-3 h-5 w-5 ${
                location.pathname === item.path 
                  ? 'text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-500 dark:text-gray-400 hover:text-white dark:hover:text-gray-400'
              }`} />
              <span className="font-medium hover:text-white dark:hover:text-gray-300">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;