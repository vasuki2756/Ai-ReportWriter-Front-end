import React from 'react';
import { FiFileText, FiUsers, FiBook, FiBarChart2, FiClock, FiCheckCircle, FiAlertCircle, FiPlus, FiSettings, FiCpu, FiShield, FiGlobe } from 'react-icons/fi';

const Dashboard = () => {
  const stats = [
    { name: 'Papers Generated', value: '12', change: '+2', icon: FiFileText, color: 'bg-indigo-500' },
    { name: 'Active Collaborators', value: '5', change: '+1', icon: FiUsers, color: 'bg-green-500' },
    { name: 'Citations Managed', value: '48', change: '+12', icon: FiBook, color: 'bg-blue-500' },
    { name: 'Plagiarism Checks', value: '8', change: '+3', icon: FiBarChart2, color: 'bg-purple-500' },
  ];
  
  const recentPapers = [
    { id: 1, title: 'Machine Learning Approaches for Climate Prediction', template: 'IEEE', status: 'completed', date: '2023-06-15' },
    { id: 2, title: 'Blockchain Applications in Healthcare', template: 'Springer', status: 'in-progress', date: '2023-06-10' },
    { id: 3, title: 'Quantum Computing Algorithms', template: 'ACM', status: 'draft', date: '2023-06-05' },
  ];
  
  const recentActivity = [
    { id: 1, user: 'Alex Johnson', action: 'commented on', target: 'Machine Learning Approaches', time: '2 hours ago' },
    { id: 2, user: 'You', action: 'generated', target: 'Blockchain Applications', time: '5 hours ago' },
    { id: 3, user: 'Sam Smith', action: 'added citations to', target: 'Quantum Computing', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's what's happening with your research papers.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
            <div className="flex items-center">
              <div className={`flex-shrink-0 p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.name}</p>
                <div className="flex items-baseline">
                  <p className="text-2xl font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                  <p className="ml-2 text-sm font-medium text-green-500">{stat.change}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750 flex items-center justify-between">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Papers</h2>
            <button className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
              <FiPlus className="mr-1" />
              New Paper
            </button>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentPapers.map((paper) => (
              <div key={paper.id} className="px-4 py-3 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">{paper.title}</h3>
                  <div className="flex items-center mt-1 text-xs text-gray-500 dark:text-gray-400">
                    <span>{paper.template}</span>
                    <span className="mx-2">•</span>
                    <span>{paper.date}</span>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    paper.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                    paper.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                  }`}>
                    {paper.status === 'completed' ? <FiCheckCircle className="mr-1" /> : 
                     paper.status === 'in-progress' ? <FiClock className="mr-1" /> : 
                     <FiFileText className="mr-1" />}
                    {paper.status.charAt(0).toUpperCase() + paper.status.slice(1).replace('-', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 text-center">
            <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
              View all papers
            </button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Recent Activity</h2>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="px-4 py-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                    <span className="text-indigo-800 dark:text-indigo-300 font-medium text-sm">
                      {activity.user.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-900 dark:text-white">
                      <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="px-4 py-3 bg-gray-50 dark:bg-gray-750 text-center">
            <button className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
              View all activity
            </button>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Quick Actions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mb-3">
                <FiFileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Generate Paper</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg mb-3">
                <FiBook className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Manage Citations</span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg mb-3">
                <FiUsers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">Collaborate</span>
            </button>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Application Settings</h2>
            <button className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
              <FiSettings className="mr-1" />
              Advanced Settings
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg mr-4">
                  <FiCpu className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">AI Preferences</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Configure AI generation settings</p>
                </div>
              </div>
              <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                Configure
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-4">
                  <FiShield className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Plagiarism Settings</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Set plagiarism detection sensitivity</p>
                </div>
              </div>
              <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                Adjust
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                  <FiGlobe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">Language & Domain</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Set default language and research domain</p>
                </div>
              </div>
              <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300">
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;