import React from 'react';
import { FaCheck } from 'react-icons/fa';

const ThumbnailSuggestions = ({ suggestions, onSelect }) => {
  if (!suggestions || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Suggestions</h3>
      
      <div className="grid grid-cols-1 gap-4">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="group relative cursor-pointer rounded-lg overflow-hidden border-2 border-gray-200 hover:border-primary transition"
            onClick={() => onSelect(suggestion)}
          >
            <div className="relative" style={{ paddingBottom: '56.25%' }}>
              <img
                src={suggestion.url}
                alt={`Suggestion ${index + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition">
                  <button className="bg-white text-primary px-4 py-2 rounded-lg font-semibold flex items-center space-x-2 shadow-lg">
                    <FaCheck />
                    <span>Select This</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-3 bg-gray-50">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700 capitalize">
                  Style: {suggestion.style}
                </span>
                {suggestion.aiGenerated && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    AI Generated
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThumbnailSuggestions;
