# ResearchAI - Academic Paper Generator Frontend

A professional and elegant React frontend for an AI-powered research paper generation tool that creates academic papers in standard formats (IEEE, Springer, etc.), ensuring correct citations, formatting, and plagiarism-free structured content.

## Features

### Core Functionality
- **Multi-Format Output**: Support for multiple publisher templates (IEEE, Springer, ACM, Elsevier, etc.) with one-click formatting
- **Smart Citation Agent**: Auto-fetch real citations from Google Scholar / CrossRef API with verification
- **Plagiarism-Aware Generation**: Integrated plagiarism checker to ensure content uniqueness
- **Interactive Workflow**: Human-in-the-loop approach allowing users to approve/reject sections and collaborate
- **Data-to-Paper Integration**: Upload raw data (CSV, JSON) to automatically generate tables, graphs, and discussions
- **AI Consistency Checker**: Review papers for consistency and completeness
- **Explainable Writing Suggestions**: Provides reasoning for writing decisions to help users learn
- **Multilingual Support**: Generate papers in multiple languages with auto-translation
- **Collaboration Mode**: Real-time co-editing with AI suggestions for research teams
- **Research Domain Personalization**: Different styles for various academic disciplines

### User Interface
- **Responsive Design**: Fully responsive layout that works seamlessly on desktop, tablet, and mobile devices
- **Dark/Light Mode**: Toggle between light and dark themes for comfortable usage in any environment
- **Intuitive Navigation**: Clean sidebar navigation with clear visual feedback for active states
- **Professional Aesthetics**: Modern, clean interface designed specifically for academic research

## Technology Stack

- **Frontend Framework**: React 18
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **Icons**: React Icons (Feather Icons)
- **State Management**: React Hooks
- **Build Tool**: Create React App / Vite

## Project Structure
src/
├── App.css # Global styles and custom CSS
├── App.jsx # Main app component with routing
├── components/ # Reusable UI components
│ ├── Header.jsx # Application header with search and user controls
│ ├── Sidebar.jsx # Navigation sidebar
│ ├── TemplateSelector.jsx # Template selection component
│ ├── CitationManager.jsx # Citation management interface
│ └── DataUploader.jsx # Data upload and processing component
└── pages/ # Page components
├── Dashboard.jsx # Main dashboard with statistics and quick actions
├── PaperGenerator.jsx # Core paper generation interface
├── CitationManager.jsx # Citation management page
├── PlagiarismChecker.jsx # Plagiarism checking interface
├── Collaboration.jsx # Real-time collaboration features
└── Settings.jsx # User settings and preferences


## Getting Started

### Prerequisites
- Node.js (v14.0.0 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/researchai-frontend.git
   cd researchai-frontend
2. Install dependencies
   npm install
3. Start the development server:
   npm start

Building for Production
To create a production build:
  npm run build
The built files will be in the build directory, ready to be deployed.

Browser Support
This application supports all modern browsers:

Chrome (version 90+)
Firefox (version 88+)
Safari (version 14+)
Edge (version 90+)

Acknowledgments
React team for the amazing framework
Tailwind CSS for the utility-first CSS framework
Feather Icons for the beautiful icon set
All the academic researchers who provided feedback and requirements
Future Enhancements
Integration with more academic databases
Support for additional citation formats
Enhanced collaboration features with real-time editing
Mobile application for on-the-go research
AI-powered research suggestions based on user history


