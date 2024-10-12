import React from 'react';
import ImageUploader from '../components/ImageUploader';

const Index = () => {
  const handleDonate = () => {
    window.location.href = "upi://pay?pa=adnanmuhammad4393@okicici&pn=Adnan+Muhammad&am=89&tn=donating";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">
      <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-gray-800">
          Foxeor: Image to Link
        </h1>
        <ImageUploader onDonate={handleDonate} />
      </div>
    </div>
  );
};

export default Index;