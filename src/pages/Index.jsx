import React from 'react';
import ImageUploader from '../components/ImageUploader';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Image to Link Converter</h1>
      <ImageUploader />
    </div>
  );
};

export default Index;