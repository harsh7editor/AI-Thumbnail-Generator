import React from 'react';
import { FaYoutube, FaRobot } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2 text-3xl">
              <FaYoutube className="text-red-600" />
              <FaRobot className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                AI Thumbnail Generator
              </h1>
              <p className="text-sm text-gray-600">
                Create stunning YouTube thumbnails with AI
              </p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <span className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold">
              Powered by OpenAI
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
