import React from 'react';
import { FiMenu, FiMoon, FiSun, FiBell, FiUser, FiSearch } from 'react-icons/fi';

const Header = ({ sidebarOpen, setSidebarOpen, darkMode, setDarkMode }) => {
  return (
    <header className={`flex items-center justify-between p-4 border-b ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
      <div className="flex items-center">
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="mr-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <FiMenu className="text-gray-700 dark:text-gray-300" />
        </button>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input 
            type="text" 
            placeholder="Search papers, citations..." 
            className={`pl-10 pr-4 py-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'}`}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          {darkMode ? 
            <FiSun className="text-yellow-400" /> : 
            <FiMoon className="text-gray-700" />
          }
        </button>
        
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative">
          <FiBell className="text-gray-700 dark:text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
            U
          </div>
          <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>User Name</span>
        </div>
      </div>
    </header>
  );
};

export default Header;