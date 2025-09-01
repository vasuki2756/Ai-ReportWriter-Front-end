import React, { useState } from 'react';
import { FiFileText, FiUpload, FiCheckCircle, FiAlertCircle, FiBarChart2, FiRefreshCw } from 'react-icons/fi';

const PlagiarismChecker = () => {
  const [document, setDocument] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [results, setResults] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleCheckPlagiarism = () => {
    if (!document.trim()) return;
    
    setIsChecking(true);
    setProgress(0);
    
    // Placeholder for AI plagiarism checking
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsChecking(false);
          setResults({
            overallScore: 12,
            sources: [
              { id: 1, title: "Similar Research Paper", url: "https://example.com/paper1", similarity: 8 },
              { id: 2, title: "Academic Journal Article", url: "https://example.com/paper2", similarity: 4 },
            ],
            suggestions: [
              "Consider rephrasing the highlighted sentences in the introduction section",
              "Add proper citations for the statistical methods described in section 3.2"
            ]
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Plagiarism Checker</h1>
          <p className="text-gray-600 dark:text-gray-400">Ensure your paper is original and properly cited</p>
        </div>
        <button
          onClick={handleCheckPlagiarism}
          disabled={isChecking || !document.trim()}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {isChecking ? (
            <>
              <FiRefreshCw className="mr-2 animate-spin" />
              Checking...
            </>
          ) : (
            <>
              <FiCheckCircle className="mr-2" />
              Check Plagiarism
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
            <h2 className="text-lg font-medium text-gray-900 dark:text-white">Input Document</h2>
          </div>
          <div className="p-4">
            <textarea
              value={document}
              onChange={(e) => setDocument(e.target.value)}
              rows={15}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
              placeholder="Paste your research paper content here to check for plagiarism..."
            ></textarea>
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {document.length} characters
              </div>
              <div className="flex space-x-2">
                <button className="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <FiUpload className="mr-1.5" />
                  Upload File
                </button>
                <button className="flex items-center px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <FiFileText className="mr-1.5" />
                  Load Sample
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {isChecking ? (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Checking Document</h3>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div 
                    className="bg-indigo-600 h-2.5 rounded-full" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Comparing your document against millions of academic papers and publications...
                </p>
              </div>
            </div>
          ) : results ? (
            <>
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Plagiarism Score</h3>
                  <div className={`flex items-center px-3 py-1 rounded-full ${results.overallScore < 15 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' : results.overallScore < 30 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'}`}>
                    <FiBarChart2 className="mr-1.5" />
                    {results.overallScore}% similarity
                  </div>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {results.overallScore < 15 ? (
                    <div className="flex items-start">
                      <FiCheckCircle className="text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Your document shows low similarity to existing sources. Great job maintaining originality!</span>
                    </div>
                  ) : results.overallScore < 30 ? (
                    <div className="flex items-start">
                      <FiAlertCircle className="text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Your document has moderate similarity to existing sources. Consider reviewing the highlighted sections.</span>
                    </div>
                  ) : (
                    <div className="flex items-start">
                      <FiAlertCircle className="text-red-500 mt-0.5 mr-2 flex-shrink-0" />
                      <span>Your document shows high similarity to existing sources. Significant revision is recommended.</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Similarity Sources</h3>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {results.sources.map((source) => (
                    <div key={source.id} className="px-4 py-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{source.title}</h4>
                          <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                            {source.url}
                          </a>
                        </div>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                          {source.similarity}% match
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">Improvement Suggestions</h3>
                </div>
                <div className="p-4">
                  <ul className="space-y-3">
                    {results.suggestions.map((suggestion, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 h-5 w-5 text-indigo-500 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-12 text-center">
              <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No results yet</h3>
              <p className="mt-1 text-gray-500 dark:text-gray-400">Check your document for plagiarism to see results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlagiarismChecker;