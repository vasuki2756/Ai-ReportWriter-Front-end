// pages/Settings.jsx
import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiGlobe, FiMoon, FiBell, FiSave } from 'react-icons/fi';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [userSettings, setUserSettings] = useState({
    name: 'Alex Johnson',
    email: 'alex@example.com',
    institution: 'University of Research',
    department: 'Computer Science',
    defaultTemplate: 'ieee',
    language: 'english',
    darkMode: false,
    notifications: true,
    autoSave: true,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
        <p className="text-gray-600 dark:text-gray-400">Manage your account preferences and application settings</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-64">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <nav className="flex flex-col">
              {['profile', 'account', 'preferences', 'notifications'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-3 text-left text-sm font-medium transition-colors ${activeTab === tab ? 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 dark:text-indigo-400' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-750'}`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Profile Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={userSettings.name}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={userSettings.email}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Institution</label>
                    <input
                      type="text"
                      name="institution"
                      value={userSettings.institution}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Department</label>
                    <input
                      type="text"
                      name="department"
                      value={userSettings.department}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'account' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Account Security</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <input
                        type="password"
                        className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'preferences' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Application Preferences</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Default Template</label>
                    <select
                      name="defaultTemplate"
                      value={userSettings.defaultTemplate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option value="ieee">IEEE Format</option>
                      <option value="springer">Springer Format</option>
                      <option value="acm">ACM Format</option>
                      <option value="elsevier">Elsevier Format</option>
                      <option value="apa">APA Format</option>
                      <option value="mla">MLA Format</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Language</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiGlobe className="text-gray-400" />
                      </div>
                      <select
                        name="language"
                        value={userSettings.language}
                        onChange={handleInputChange}
                        className="pl-10 w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                      >
                        <option value="english">English</option>
                        <option value="french">French</option>
                        <option value="spanish">Spanish</option>
                        <option value="german">German</option>
                        <option value="hindi">Hindi</option>
                        <option value="chinese">Chinese</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Dark Mode</label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Enable dark theme for the application</p>
                    </div>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        name="darkMode"
                        checked={userSettings.darkMode}
                        onChange={handleInputChange}
                        className="sr-only"
                        id="dark-mode-toggle"
                      />
                      <label
                        htmlFor="dark-mode-toggle"
                        className={`block h-6 w-10 rounded-full cursor-pointer ${userSettings.darkMode ? 'bg-indigo-600' : 'bg-gray-300'}`}
                      >
                        <span
                          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${userSettings.darkMode ? 'transform translate-x-4' : ''}`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Auto Save</label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Automatically save your work</p>
                    </div>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        name="autoSave"
                        checked={userSettings.autoSave}
                        onChange={handleInputChange}
                        className="sr-only"
                        id="auto-save-toggle"
                      />
                      <label
                        htmlFor="auto-save-toggle"
                        className={`block h-6 w-10 rounded-full cursor-pointer ${userSettings.autoSave ? 'bg-indigo-600' : 'bg-gray-300'}`}
                      >
                        <span
                          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${userSettings.autoSave ? 'transform translate-x-4' : ''}`}
                        ></span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Notification Settings</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email Notifications</label>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Receive notifications via email</p>
                    </div>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none">
                      <input
                        type="checkbox"
                        name="notifications"
                        checked={userSettings.notifications}
                        onChange={handleInputChange}
                        className="sr-only"
                        id="notifications-toggle"
                      />
                      <label
                        htmlFor="notifications-toggle"
                        className={`block h-6 w-10 rounded-full cursor-pointer ${userSettings.notifications ? 'bg-indigo-600' : 'bg-gray-300'}`}
                      >
                        <span
                          className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${userSettings.notifications ? 'transform translate-x-4' : ''}`}
                        ></span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notification Frequency</label>
                    <select
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    >
                      <option>Immediate</option>
                      <option>Daily Digest</option>
                      <option>Weekly Summary</option>
                      <option>Never</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notification Types</label>
                    <div className="space-y-2 mt-2">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="collab-notifications"
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          defaultChecked
                        />
                        <label htmlFor="collab-notifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Collaboration updates
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="paper-notifications"
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          defaultChecked
                        />
                        <label htmlFor="paper-notifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Paper generation complete
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="comment-notifications"
                          className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                          defaultChecked
                        />
                        <label htmlFor="comment-notifications" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          New comments and feedback
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-6 border-t border-gray-200 dark:border-gray-700 mt-6">
              <button
                onClick={handleSave}
                className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <FiSave className="mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;