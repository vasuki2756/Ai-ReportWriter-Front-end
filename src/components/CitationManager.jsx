import React, { useState } from 'react';
import { FiSearch, FiPlus, FiExternalLink, FiEdit2, FiTrash2, FiCheck, FiX } from 'react-icons/fi';

const CitationManager = () => {
  const [citations, setCitations] = useState([
    { id: 1, authors: "Smith, J. et al.", title: "Advanced Research Methods", year: 2022, journal: "Journal of AI Research", doi: "10.1234/jar.2022.12345", verified: true },
    { id: 2, authors: "Johnson, M. et al.", title: "Data Analysis Techniques", year: 2021, journal: "Science Today", doi: "10.5678/st.2021.67890", verified: false },
  ]);
  
  const [newCitation, setNewCitation] = useState({ authors: '', title: '', year: '', journal: '', doi: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const handleAddCitation = () => {
    if (newCitation.authors && newCitation.title) {
      setCitations([...citations, { ...newCitation, id: citations.length + 1, verified: false }]);
      setNewCitation({ authors: '', title: '', year: '', journal: '', doi: '' });
      setIsAdding(false);
    }
  };

  const handleDeleteCitation = (id) => {
    setCitations(citations.filter(citation => citation.id !== id));
  };

  const handleVerifyCitation = (id) => {
    setCitations(citations.map(citation => 
      citation.id === id ? { ...citation, verified: !citation.verified } : citation
    ));
  };

  const fetchCitation = () => {
    // Placeholder for AI citation fetching
    setIsFetching(true);
    setTimeout(() => {
      setIsFetching(false);
      alert("AI citation fetching would be implemented here");
    }, 1500);
  };

  const filteredCitations = citations.filter(citation =>
    citation.authors.toLowerCase().includes(searchTerm.toLowerCase()) ||
    citation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    citation.journal.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Citation Manager</h2>
        <div className="flex space-x-3">
          <button
            onClick={fetchCitation}
            disabled={isFetching}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
          >
            {isFetching ? "Fetching..." : "AI Fetch Citations"}
          </button>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search citations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <button
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <FiPlus className="mr-2" />
            Add Citation
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Add New Citation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Authors</label>
              <input
                type="text"
                value={newCitation.authors}
                onChange={(e) => setNewCitation({...newCitation, authors: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Smith, J. et al."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
              <input
                type="text"
                value={newCitation.title}
                onChange={(e) => setNewCitation({...newCitation, title: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Paper Title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Year</label>
              <input
                type="text"
                value={newCitation.year}
                onChange={(e) => setNewCitation({...newCitation, year: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="2023"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Journal</label>
              <input
                type="text"
                value={newCitation.journal}
                onChange={(e) => setNewCitation({...newCitation, journal: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="Journal Name"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">DOI</label>
              <input
                type="text"
                value={newCitation.doi}
                onChange={(e) => setNewCitation({...newCitation, doi: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                placeholder="10.1234/example.2023.12345"
              />
            </div>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={() => setIsAdding(false)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddCitation}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Add Citation
            </button>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Citation</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Year</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Journal</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCitations.length > 0 ? (
                filteredCitations.map((citation) => (
                  <tr key={citation.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{citation.authors}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{citation.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {citation.year}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {citation.journal}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${citation.verified ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'}`}>
                        {citation.verified ? 'Verified' : 'Pending Verification'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button 
                          onClick={() => handleVerifyCitation(citation.id)}
                          className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          title={citation.verified ? 'Mark as unverified' : 'Verify citation'}
                        >
                          {citation.verified ? <FiX /> : <FiCheck />}
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                          <FiEdit2 />
                        </button>
                        <button 
                          onClick={() => handleDeleteCitation(citation.id)}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                        >
                          <FiTrash2 />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300">
                          <FiExternalLink />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                    No citations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-700 dark:text-gray-300">
          Showing <span className="font-medium">{filteredCitations.length}</span> of <span className="font-medium">{citations.length}</span> citations
        </div>
        <button className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          <FiExternalLink className="mr-2" />
          Export Citations
        </button>
      </div>
    </div>
  );
};

export default CitationManager;