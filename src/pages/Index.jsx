import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Lock, File } from 'lucide-react';
import FileUploader from '../components/FileUploader';

const Index = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleSearch = () => {
    // TODO: Implement file search functionality
    console.log('Search triggered');
  };

  const handleFileUploaded = (fileInfo) => {
    setUploadedFiles(prevFiles => [...prevFiles, fileInfo]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">FoxeorSecureCloud</h1>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <div className="flex items-center mb-4 sm:mb-0">
              <FileUploader onFileUploaded={handleFileUploaded} />
            </div>
            <div className="flex items-center w-full sm:w-auto mt-4 sm:mt-0">
              <Input type="text" placeholder="Search files..." className="mr-2" />
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">Your Secure Files</h2>
            {uploadedFiles.length > 0 ? (
              <ul className="space-y-2">
                {uploadedFiles.map((file, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <File className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{file.name}</span>
                    <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">View</a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 text-center py-8">
                Your files will appear here. They are encrypted and secure.
              </p>
            )}
          </div>
        </div>
      </main>
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <p className="text-sm text-gray-500">© 2024 FoxeorSecureCloud. All rights reserved.</p>
          <div className="flex items-center">
            <Lock className="h-4 w-4 mr-1 text-green-500" />
            <span className="text-sm text-gray-700">End-to-End Encrypted</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;