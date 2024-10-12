import React from 'react';
import ImageUploader from '../components/ImageUploader';
import { GradientBackground } from '../components/GradientBackground';

const Index = () => {
  return (
    <GradientBackground>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
          <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
            Premium Image to Link Converter
          </h1>
          <ImageUploader />
        </div>
      </div>
    </GradientBackground>
  );
};

export default Index;