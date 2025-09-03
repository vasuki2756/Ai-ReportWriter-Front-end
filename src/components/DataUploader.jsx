import React, { useState } from 'react';
import { FiUpload, FiFile, FiX, FiCheck, FiBarChart2, FiTable } from 'react-icons/fi';

const DataUploader = ({ datasetFile, setDatasetFile, setProcessedData }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [processing, setProcessing] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      setDatasetFile(files[0]);
    }
  };

  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setDatasetFile(files[0]);
    }
  };

  const removeFile = () => {
    setDatasetFile(null);
    setProcessedData(null);
  };

  const processFiles = () => {
    if (!datasetFile) return;
    
    setProcessing(true);
    
    // Placeholder for AI data processing
    setTimeout(() => {
      setProcessing(false);
      setProcessedData({
        tables: [
          { id: 1, name: 'Experimental Results', rows: 24, columns: 5 },
          { id: 2, name: 'Statistical Analysis', rows: 12, columns: 4 },
        ],
        charts: [
          { id: 1, name: 'Performance Comparison', type: 'bar' },
          { id: 2, name: 'Trend Analysis', type: 'line' },
        ],
      });
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Data-to-Paper Integration</h2>
        <button
          onClick={processFiles}
          disabled={!datasetFile || processing}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
        >
          {processing ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <FiBarChart2 className="mr-2" />
              Generate Results
            </>
          )}
        </button>
      </div>
      
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragging ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-gray-300 dark:border-gray-600'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById('file-upload').click()}
      >
        <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <span className="font-medium text-indigo-600 dark:text-indigo-400">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            CSV, JSON, Excel files up to 10MB
          </p>
        </div>
        <input
          id="file-upload"
          name="file-upload"
          type="file"
          className="sr-only"
          onChange={handleFileInput}
          multiple
          accept=".csv,.json,.xlsx,.xls"
        />
      </div>
      
      {datasetFile && (
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white">Uploaded Files</h3>
          </div>
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center">
                <FiFile className="h-5 w-5 text-gray-400" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{datasetFile.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {(datasetFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  <FiCheck className="mr-1 h-3 w-3" />
                  Ready
                </span>
                <button
                  onClick={removeFile}
                  className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                >
                  <FiX className="h-5 w-5" />
                </button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DataUploader;