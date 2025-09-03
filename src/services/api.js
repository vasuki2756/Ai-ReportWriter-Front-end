// src/services/api.js
const API_BASE_URL = 'http://localhost:8000';

export const apiService = {
  // Generate research paper
  generatePaper: async (formData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/generate-paper`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate paper');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Download generated paper
  downloadPaper: (filename) => {
    window.open(`${API_BASE_URL}/download-paper/${filename}`, '_blank');
  },

  // Check plagiarism
  checkPlagiarism: async (text, referenceTexts = null) => {
    try {
      const response = await fetch(`${API_BASE_URL}/check-plagiarism`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          reference_texts: referenceTexts
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to check plagiarism');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  // Get paper metadata
  getPaperMetadata: async (filename) => {
    try {
      const response = await fetch(`${API_BASE_URL}/paper-metadata/${filename}`);
      
      if (!response.ok) {
        throw new Error('Failed to get paper metadata');
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },
};