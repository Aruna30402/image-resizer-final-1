import React, { useState } from 'react';
import ImageUploader from './components/ImageUploader';
import ResizeOptions from './components/ResizeOptions';
import ProcessingStatus from './components/ProcessingStatus';
import './App.css';

function App() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [resizeOptions, setResizeOptions] = useState({
    width: 800,
    height: 600,
    format: 'jpg',
    maintainAspectRatio: true
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('');

  const handleFilesUpload = (files) => {
    setUploadedFiles(files);
  };

  const handleResizeOptionsChange = (options) => {
    setResizeOptions(options);
  };

  const handleProcess = async () => {
    if (uploadedFiles.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    setIsProcessing(true);
    setProcessingStatus('Preparing images for processing...');

    try {
      const formData = new FormData();
      
      // Add images to form data
      uploadedFiles.forEach((file) => {
        formData.append('images', file);
      });

      // Add resize options
      Object.keys(resizeOptions).forEach((key) => {
        formData.append(key, resizeOptions[key]);
      });

      setProcessingStatus('Processing images and creating zip file...');

      const response = await fetch('/api/resize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process images');
      }

      setProcessingStatus('Downloading zip file...');

      // Get the blob from the response
      const blob = await response.blob();
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `resized_images_${Date.now()}.zip`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setProcessingStatus('Download completed successfully!');
      
      // Clear uploaded files after successful processing
      setTimeout(() => {
        setUploadedFiles([]);
        setProcessingStatus('');
        setIsProcessing(false);
      }, 2000);

    } catch (error) {
      console.error('Error processing images:', error);
      setProcessingStatus(`Error: ${error.message}`);
      setIsProcessing(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🖼️ Image Resizer Tool</h1>
        <p>Upload multiple images, resize them to your preferred dimensions, and download as a zip folder</p>
      </header>

      <main className="App-main">
        <div className="container">
          <ImageUploader 
            onFilesUpload={handleFilesUpload}
            uploadedFiles={uploadedFiles}
            disabled={isProcessing}
          />
          
          <ResizeOptions 
            options={resizeOptions}
            onChange={handleResizeOptionsChange}
            disabled={isProcessing}
          />

          <div className="process-section">
            <button 
              className="process-btn"
              onClick={handleProcess}
              disabled={uploadedFiles.length === 0 || isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Process & Download Images'}
            </button>
          </div>

          {isProcessing && (
            <ProcessingStatus status={processingStatus} />
          )}
        </div>
      </main>

      <footer className="App-footer">
        <p>Supports: JPEG, PNG, GIF, WebP, BMP, TIFF • Max file size: 50MB • Max files: 20</p>
      </footer>
    </div>
  );
}

export default App;
