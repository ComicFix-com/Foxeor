import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Lock, File, Loader2, Heart } from 'lucide-react';
import FileUploader from '../components/FileUploader';

const Index = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const handleFileUploaded = (fileInfo) => {
    setUploadedFiles(prevFiles => [...prevFiles, fileInfo]);
    setUploadingFiles(prevFiles => prevFiles.filter(f => f.name !== fileInfo.name));
  };

  const handleFileUploadStart = (fileName) => {
    setUploadingFiles(prevFiles => [...prevFiles, { name: fileName }]);
  };

  const handleDonate = () => {
    window.location.href = 'upi://pay?pa=adnanmuhammad4393@okicici&pn=Adnan+Muhammad&am=89&tn=donating for Foxeor';
  };

  const filteredFiles = uploadedFiles.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const allFiles = [...uploadingFiles, ...filteredFiles];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Foxeor</h1>
          <Button onClick={handleDonate} className="bg-green-500 hover:bg-green-600 text-white">
            <Heart className="h-4 w-4 mr-2" />
            Donate ₹89
          </Button>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <div className="mb-6">
            <FileUploader onFileUploaded={handleFileUploaded} onFileUploadStart={handleFileUploadStart} />
          </div>
          <div className="flex flex-col sm:flex-row items-center w-full mb-6 space-y-2 sm:space-y-0 sm:space-x-2">
            <Input 
              type="text" 
              placeholder="Search files..." 
              className="w-full sm:w-auto"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button onClick={handleSearch} className="w-full sm:w-auto">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
          <div className="border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">Your Secure Files</h2>
            {allFiles.length > 0 ? (
              <ul className="space-y-2">
                {allFiles.map((file, index) => (
                  <li key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-md">
                    {file.url ? (
                      <>
                        <File className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 truncate flex-grow">{file.name}</span>
                        <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm whitespace-nowrap">View</a>
                      </>
                    ) : (
                      <>
                        <Loader2 className="h-4 w-4 text-gray-500 animate-spin flex-shrink-0" />
                        <span className="text-sm text-gray-700 truncate flex-grow">{file.name}</span>
                        <span className="text-sm text-gray-500 whitespace-nowrap">Uploading...</span>
                      </>
                    )}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
          <p className="text-sm text-gray-500">© 2024 Foxeor. All rights reserved.</p>
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