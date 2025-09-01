import React, { useState } from 'react';
import { FiUsers, FiUserPlus, FiMessageSquare, FiEdit, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

const Collaboration = () => {
  const [collaborators, setCollaborators] = useState([
    { id: 1, name: 'Alex Johnson', email: 'alex@example.com', role: 'Editor', status: 'active' },
    { id: 2, name: 'Sam Smith', email: 'sam@example.com', role: 'Reviewer', status: 'pending' },
  ]);
  
  const [comments, setComments] = useState([
    { id: 1, user: 'Alex Johnson', text: 'I think we should add more details to the methodology section', time: '2 hours ago', resolved: false },
    { id: 2, user: 'You', text: 'Good point, I\'ll expand on that section', time: '1 hour ago', resolved: true },
  ]);
  
  const [newComment, setNewComment] = useState('');
  const [newCollaborator, setNewCollaborator] = useState({ name: '', email: '', role: 'Viewer' });
  const [isAdding, setIsAdding] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, user: 'You', text: newComment, time: 'Just now', resolved: false }
      ]);
      setNewComment('');
    }
  };

  const handleAddCollaborator = () => {
    if (newCollaborator.name && newCollaborator.email) {
      setCollaborators([
        ...collaborators,
        { ...newCollaborator, id: collaborators.length + 1, status: 'pending' }
      ]);
      setNewCollaborator({ name: '', email: '', role: 'Viewer' });
      setIsAdding(false);
    }
  };

  const toggleCommentStatus = (id) => {
    setComments(comments.map(comment => 
      comment.id === id ? { ...comment, resolved: !comment.resolved } : comment
    ));
  };

  const removeCollaborator = (id) => {
    setCollaborators(collaborators.filter(collab => collab.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Collaboration</h1>
          <p className="text-gray-600 dark:text-gray-400">Work together with your research team in real-time</p>
        </div>
        <button
          onClick={() => setIsAdding(!isAdding)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <FiUserPlus className="mr-2" />
          Add Collaborator
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">Collaborators</h2>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {collaborators.map((collaborator) => (
                <div key={collaborator.id} className="px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                      <span className="text-indigo-800 dark:text-indigo-300 font-medium">
                        {collaborator.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{collaborator.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{collaborator.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${collaborator.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'}`}>
                      {collaborator.status}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{collaborator.role}</span>
                    <button 
                      onClick={() => removeCollaborator(collaborator.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isAdding && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Collaborator</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                  <input
                    type="text"
                    value={newCollaborator.name}
                    onChange={(e) => setNewCollaborator({...newCollaborator, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                  <input
                    type="email"
                    value={newCollaborator.email}
                    onChange={(e) => setNewCollaborator({...newCollaborator, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Role</label>
                  <select
                    value={newCollaborator.role}
                    onChange={(e) => setNewCollaborator({...newCollaborator, role: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="Viewer">Viewer</option>
                    <option value="Reviewer">Reviewer</option>
                    <option value="Editor">Editor</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setIsAdding(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddCollaborator}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Add Collaborator
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Discussion</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border-l-4 border-indigo-500 pl-4 py-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900 dark:text-white">{comment.user}</span>
                      {comment.resolved && (
                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                          <FiCheck className="mr-1" />
                          Resolved
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{comment.time}</p>
                  </div>
                  {!comment.resolved && (
                    <button
                      onClick={() => toggleCommentStatus(comment.id)}
                      className="text-gray-400 hover:text-green-500"
                      title="Mark as resolved"
                    >
                      <FiCheck />
                    </button>
                  )}
                </div>
                <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.text}</p>
              </div>
            ))}
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex space-x-3">
              <input
                type="text"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Add a comment..."
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
              />
              <button
                onClick={handleAddComment}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <FiMessageSquare />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collaboration;