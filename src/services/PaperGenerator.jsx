// src/pages/PaperGenerator.jsx

import React, { useState } from 'react';
import { generatePaper, checkPlagiarism, downloadPaper } from '../services/api';
import TemplateSelector from '../components/TemplateSelector';
import CitationManager from '../components/CitationManager';
import DataUploader from '../components/DataUploader';

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
  const [generatedPaper, setGeneratedPaper] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [explanations, setExplanations] = useState({});
  const [validationReport, setValidationReport] = useState(null);

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
    setIsGenerating(true);
    setProgress(0);
    
    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 300);
      
      // Prepare data for API
      const requestData = {
        title: paperData.title,
        abstract: paperData.abstract,
        keywords: paperData.keywords.split(',').map(k => k.trim()),
        domain: paperData.domain,
        template: paperData.template,
        content: paperData.content,
      };
      
      // Call API to generate paper
      const response = await generatePaper(requestData);
      
      clearInterval(progressInterval);
      setProgress(100);
      
      if (response.status === 'success') {
        setGeneratedPaper(response.paper);
        setExplanations({
          abstract: "This abstract was generated based on your input keywords.",
          methodology: "The methodology section was tailored to " + paperData.domain + " research standards."
        });
        
        // Validate the generated paper
        await validateGeneratedPaper(response.paper);
      } else {
        alert('Error generating paper: ' + response.message);
      }
    } catch (error) {
      console.error('Error generating paper:', error);
      alert('Error generating paper: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const validateGeneratedPaper = async (paper) => {
    try {
      const validationData = {
        title: paper.title,
        abstract: paper.abstract,
        content: paper.content,
        domain: paper.domain,
        template: paper.template,
        citations: paper.citations,
      };
      
      const response = await fetch(`${API_BASE_URL}/validate-paper`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validationData),
      });
      
      if (response.ok) {
        const validationResult = await response.json();
        setValidationReport(validationResult.validation_report);
      }
    } catch (error) {
      console.error('Error validating paper:', error);
    }
  };

  const downloadPaper = async () => {
    try {
      const requestData = {
        title: paperData.title,
        abstract: paperData.abstract,
        keywords: paperData.keywords.split(',').map(k => k.trim()),
        domain: paperData.domain,
        template: paperData.template,
        content: paperData.content,
      };
      
      const blob = await downloadPaper(requestData);
      
      // Create a download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${paperData.title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading paper:', error);
      alert('Error downloading paper: ' + error.message);
    }
  };

  // ... rest of your component code

  return (
    <div className="space-y-6">
      {/* Your existing JSX code */}
      
      {/* Add validation report section */}
      {validationReport && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Paper Validation Report</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Overall Score</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {validationReport.overall_score.toFixed(1)}%
              </div>
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-gray-750 rounded-lg">
              <div className="text-sm text-gray-500 dark:text-gray-400">Structural Validity</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {validationReport.structural_validity ? '✓ Valid' : '✗ Invalid'}
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="text-md font-medium text-gray-900 dark:text-white mb-2">Recommendations</h4>
            <ul className="list-disc pl-5 space-y-1">
              {validationReport.recommendations.map((rec, index) => (
                <li key={index} className="text-sm text-gray-700 dark:text-gray-300">{rec}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
      
      {/* Your existing JSX code */}
    </div>
  );
};

export default PaperGenerator;