import React from 'react';

export const GradientBackground = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      {children}
    </div>
  );
};