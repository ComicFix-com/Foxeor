import React from 'react';
import ImageUploader from '../components/ImageUploader';
import { GradientBackground } from '../components/GradientBackground';
import { Button } from '@/components/ui/button';

const Index = () => {
  const handleDonate = () => {
    window.location.href = "upi://pay?pa=adnanmuhammad4393@okicici&pn=Adnan+Muhammad&am=99&tn=donating";
  };

  return (
    <GradientBackground>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
          <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Foxeor: Premium Image to Link Converter
          </h1>
          <ImageUploader />
          <div className="mt-8 text-center">
            <Button
              onClick={handleDonate}
              className="bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Donate ₹99
            </Button>
          </div>
        </div>
      </div>
    </GradientBackground>
  );
};

export default Index;