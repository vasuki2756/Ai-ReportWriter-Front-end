import React, { useState } from 'react';
import { FiUpload, FiFile, FiDownload, FiCheck, FiEdit, FiRefreshCw, FiEye } from 'react-icons/fi';
import TemplateSelector from '../components/TemplateSelector';
import CitationManager from '../components/CitationManager';
import DataUploader from '../components/DataUploader';
import { apiService } from '../services/api';

const PaperGenerator = () => {
  const [activeTab, setActiveTab] = useState('input');
  const [paperData, setPaperData] = useState({
    title: '',
    abstract: '',
    keywords: '',
    content: '',
    template: 'ieee',
    domain: 'engineering',
    language: 'english',
  });
  const [datasetFile, setDatasetFile] = useState(null);
  const [citations, setCitations] = useState([]);
  const [processedData, setProcessedData] = useState(null);
  const [generatedPaper, setGeneratedPaper] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [explanations, setExplanations] = useState({});
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaperData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleTemplateChange = (template) => {
    setPaperData(prev => ({ ...prev, template }));
  };
  
  const handleDomainChange = (domain) => {
    setPaperData(prev => ({ ...prev, domain }));
  };
  
  const handleLanguageChange = (language) => {
    setPaperData(prev => ({ ...prev, language }));
  };
  
  const generatePaper = async () => {
    if (!paperData.title || !paperData.domain) {
      alert('Please fill in the required fields');
      return;
    }
    
    setIsGenerating(true);
    setProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('title', paperData.title);
      formData.append('abstract', paperData.abstract);
      formData.append('domain', paperData.domain);
      formData.append('format', paperData.template);
      formData.append('keywords', paperData.keywords);
      
      if (datasetFile) {
        formData.append('dataset', datasetFile);
      }
      
      formData.append('user_citations', JSON.stringify(citations));
      
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);
      
      const result = await apiService.generatePaper(formData);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      setGeneratedPaper({
        ...paperData,
        pdfPath: result.pdf_path,
        metadata: result.metadata || {},
        flaggedSections: result.flagged_sections || [],
        content: `Generated content for "${paperData.title}" using ${paperData.template.toUpperCase()} format.`,
        citations: citations,
        figures: [
          { id: 1, caption: "Figure 1: Data visualization results" },
        ],
        explanations: {
          abstract: "This abstract was generated based on your input keywords.",
          methodology: "The methodology section was tailored to " + paperData.domain + " research standards."
        }
      });
      
      setExplanations({
        abstract: "This abstract was generated based on your input keywords.",
        methodology: "The methodology section was tailored to " + paperData.domain + " research standards."
      });
      
    } catch (error) {
      console.error('Error generating paper:', error);
      alert('Error generating paper: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const downloadPaper = () => {
    if (generatedPaper && generatedPaper.pdfPath) {
      const filename = generatedPaper.pdfPath.split('/').pop();
      apiService.downloadPaper(filename);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Research Paper Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">Create professional academic papers with AI assistance</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={generatePaper}
            disabled={isGenerating}
            className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <FiRefreshCw className="mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FiFile className="mr-2" />
                Generate Paper
              </>
            )}
          </button>
          {generatedPaper && (
            <button 
              onClick={downloadPaper}
              className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <FiDownload className="mr-2" />
              Download
            </button>
          )}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px">
            {['input', 'citations', 'data', 'preview'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium transition-colors ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600 dark:text-indigo-400 dark:border-indigo-400' : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'input' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Paper Title</label>
                <input
                  type="text"
                  name="title"
                  value={paperData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your research paper title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Abstract</label>
                <textarea
                  name="abstract"
                  value={paperData.abstract}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter a brief abstract of your research"
                ></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Keywords</label>
                <input
                  type="text"
                  name="keywords"
                  value={paperData.keywords}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter keywords separated by commas"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Content</label>
                <textarea
                  name="content"
                  value={paperData.content}
                  onChange={handleInputChange}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter your research content or leave blank for AI generation"
                ></textarea>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Template</label>
                  <select
                    name="template"
                    value={paperData.template}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="ieee">IEEE</option>
                    <option value="springer">Springer</option>
                    <option value="acm">ACM</option>
                    <option value="elsevier">Elsevier</option>
                    <option value="apa">APA</option>
                    <option value="mla">MLA</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Domain</label>
                  <select
                    name="domain"
                    value={paperData.domain}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="engineering">Engineering</option>
                    <option value="medical">Medical</option>
                    <option value="social-science">Social Science</option>
                    <option value="computer-science">Computer Science</option>
                    <option value="physics">Physics</option>
                    <option value="biology">Biology</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Language</label>
                  <select
                    name="language"
                    value={paperData.language}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
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
            </div>
          )}
          
          {activeTab === 'citations' && (
            <CitationManager citations={citations} setCitations={setCitations} />
          )}
          
          {activeTab === 'data' && (
            <DataUploader 
              datasetFile={datasetFile} 
              setDatasetFile={setDatasetFile} 
              setProcessedData={setProcessedData} 
            />
          )}
          
          {activeTab === 'preview' && (
            <div className="space-y-6">
              {isGenerating ? (
                <div className="space-y-4">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-indigo-600 h-2.5 rounded-full animate-progress" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-center text-gray-600 dark:text-gray-400">
                    Generating your research paper... {progress}%
                  </p>
                </div>
              ) : generatedPaper ? (
                <div className="space-y-6">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{generatedPaper.title}</h2>
                    
                    {/* Paper metadata */}
                    {generatedPaper.metadata && (
                      <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-2">Paper Metadata</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div><span className="font-medium">Format:</span> {generatedPaper.template.toUpperCase()}</div>
                          <div><span className="font-medium">Domain:</span> {generatedPaper.domain}</div>
                          <div><span className="font-medium">Pages:</span> {generatedPaper.metadata.page_count}</div>
                          <div><span className="font-medium">Words:</span> {generatedPaper.metadata.word_count}</div>
                          <div><span className="font-medium">File Size:</span> {(generatedPaper.metadata.file_size / 1024).toFixed(1)} KB</div>
                        </div>
                      </div>
                    )}
                    
                    {/* Plagiarism flags */}
                    {generatedPaper.flaggedSections && generatedPaper.flaggedSections.length > 0 && (
                      <div className="mb-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <h3 className="font-medium text-yellow-800 dark:text-yellow-300 mb-2">Plagiarism Check Results</h3>
                        <ul className="list-disc pl-5 text-sm">
                          {generatedPaper.flagged_sections.map((section, index) => (
                            <li key={index}>
                              {section.section}: {section.similarity * 100}% similarity
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      <p>Template: {generatedPaper.template.toUpperCase()}</p>
                      <p>Domain: {generatedPaper.domain}</p>
                      <p>Language: {generatedPaper.language}</p>
                    </div>
                    
                    <div className="prose dark:prose-invert max-w-none">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Abstract</h3>
                      <p className="mb-6">{generatedPaper.abstract}</p>
                      
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Content</h3>
                      <p className="mb-6">{generatedPaper.content}</p>
                      
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">AI Explanations</h3>
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                        <p className="text-sm"><strong>Abstract:</strong> {explanations.abstract}</p>
                        <p className="text-sm mt-2"><strong>Methodology:</strong> {explanations.methodology}</p>
                      </div>
                      
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Citations</h3>
                      <ul className="list-disc pl-5 mb-6">
                        {generatedPaper.citations.map(citation => (
                          <li key={citation.id} className="mb-2">
                            {citation.authors} ({citation.year}). {citation.title}. <em>{citation.journal}</em>.
                          </li>
                        ))}
                      </ul>
                      
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Figures</h3>
                      <ul className="list-disc pl-5">
                        {generatedPaper.figures.map(figure => (
                          <li key={figure.id} className="mb-2">
                            {figure.caption}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                      <FiEdit className="mr-2" />
                      Edit Paper
                    </button>
                    <button className="flex items-center px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                      <FiEye className="mr-2" />
                      Check Plagiarism
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FiFile className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900 dark:text-white">No paper generated yet</h3>
                  <p className="mt-1 text-gray-500 dark:text-gray-400">Generate a paper to see the preview</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaperGenerator;