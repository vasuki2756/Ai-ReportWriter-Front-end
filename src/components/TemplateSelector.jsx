// components/TemplateSelector.jsx
import React from 'react';

const TemplateSelector = ({ selectedTemplate, onTemplateChange }) => {
  const templates = [
    { id: 'ieee', name: 'IEEE Format', description: 'Standard format for engineering and computer science papers' },
    { id: 'springer', name: 'Springer Format', description: 'Common format for scientific journals and publications' },
    { id: 'acm', name: 'ACM Format', description: 'Format for computing machinery publications' },
    { id: 'elsevier', name: 'Elsevier Format', description: 'Format for medical and scientific journals' },
    { id: 'apa', name: 'APA Format', description: 'American Psychological Association format' },
    { id: 'mla', name: 'MLA Format', description: 'Modern Language Association format' },
  ];

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Select Template Format</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => onTemplateChange(template.id)}
            className={`border rounded-lg p-4 cursor-pointer transition-all ${selectedTemplate === template.id ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'}`}
          >
            <div className="flex items-start">
              <div className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 ${selectedTemplate === template.id ? 'border-indigo-500 bg-indigo-500' : 'border-gray-300 dark:border-gray-600'}`}>
                {selectedTemplate === template.id && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                )}
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-gray-900 dark:text-white">{template.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{template.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;