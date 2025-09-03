# local_client.py
import requests
import json
import os
import time
from typing import Dict, List, Optional

class ResearchPaperClient:
    def __init__(self, base_url: str):
        self.base_url = base_url.rstrip('/')
        self.session = requests.Session()
    
    def generate_paper(
        self, 
        title: str, 
        abstract: str, 
        keywords: List[str], 
        domain: str = "computer_science", 
        template: str = "ieee"
    ) -> Dict:
        """Generate a research paper via the API"""
        url = f"{self.base_url}/api/generate"
        
        payload = {
            "title": title,
            "abstract": abstract,
            "keywords": keywords,
            "domain": domain,
            "template": template
        }
        
        try:
            response = self.session.post(url, json=payload)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}
    
    def download_paper(self, paper_id: str, save_path: str = ".") -> Optional[str]:
        """Download a generated paper"""
        url = f"{self.base_url}/api/download/{paper_id}"
        
        try:
            response = self.session.get(url, stream=True)
            response.raise_for_status()
            
            # Extract filename from Content-Disposition header if available
            content_disposition = response.headers.get('Content-Disposition', '')
            if 'filename=' in content_disposition:
                filename = content_disposition.split('filename=')[1].strip('"')
            else:
                filename = f"research_paper_{paper_id}.pdf"
            
            file_path = os.path.join(save_path, filename)
            with open(file_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            
            return file_path
        except requests.exceptions.RequestException as e:
            print(f"Error downloading paper: {e}")
            return None
    
    def get_templates(self) -> Dict:
        """Get available templates"""
        url = f"{self.base_url}/api/templates"
        try:
            response = self.session.get(url)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}
    
    def get_domains(self) -> Dict:
        """Get available domains"""
        url = f"{self.base_url}/api/domains"
        try:
            response = self.session.get(url)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            return {"error": str(e)}

# Example usage
if __name__ == "__main__":
    # Replace with your Colab URL (will be printed when you run the notebook)
    COLAB_API_URL = "https://8000-gpu-t4-s-2rnep20gwkn55-b.us-west4-0.prod.colab.dev"
    
    client = ResearchPaperClient(COLAB_API_URL)
    
    # Get available templates and domains
    templates = client.get_templates()
    domains = client.get_domains()
    
    if "error" not in templates and "error" not in domains:
        print(f"Available templates: {templates['templates']}")
        print(f"Available domains: {domains['domains']}")
    
    # Generate a paper
    result = client.generate_paper(
        title="AI Applications in Healthcare",
        abstract="This paper explores the transformative impact of artificial intelligence on healthcare delivery...",
        keywords=["AI", "healthcare", "machine learning", "diagnostics"],
        domain="medical",
        template="apa"
    )
    
    if "error" not in result:
        print(f"✅ Paper generated successfully!")
        print(f"📄 Title: {result['title']}")
        print(f"📊 Plagiarism Score: {result['plagiarism_score']:.2f}%")
        print(f"🔗 Paper ID: {result['paper_id']}")
        
        # Download the paper
        download_path = client.download_paper(result['paper_id'])
        if download_path:
            print(f"💾 Paper downloaded to: {download_path}")
        else:
            print("❌ Failed to download paper")
    else:
        print(f"❌ Error: {result['error']}")