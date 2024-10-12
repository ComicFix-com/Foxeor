import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, Search, Lock } from 'lucide-react';
import ImageUploader from '../components/ImageUploader';

const Index = () => {
  const handleSearch = () => {
    // TODO: Implement file search functionality
    console.log('Search triggered');
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
              <ImageUploader />
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
            <p className="text-gray-500 text-center py-8">
              Your files will appear here. They are encrypted and secure.
            </p>
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