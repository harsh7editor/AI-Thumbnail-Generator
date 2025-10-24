import React from 'react';
import { FaPalette } from 'react-icons/fa';

const ThemeSelector = ({ themes, onApplyTheme }) => {
  if (!themes || themes.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <FaPalette className="mr-2 text-purple-600" />
        Theme Suggestions
      </h3>
      
      <div className="space-y-3">
        {themes.map((theme, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg p-4 hover:border-purple-400 transition cursor-pointer"
            onClick={() => onApplyTheme(theme)}
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-gray-800">{theme.name}</h4>
              <button className="text-sm text-purple-600 hover:text-purple-700 font-semibold">
                Apply
              </button>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{theme.description}</p>
            
            {/* Color Swatches */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <div
                  className="w-8 h-8 rounded border-2 border-gray-300"
                  style={{ backgroundColor: theme.primaryColor }}
                  title="Primary Color"
                />
                <div
                  className="w-8 h-8 rounded border-2 border-gray-300"
                  style={{ backgroundColor: theme.secondaryColor }}
                  title="Secondary Color"
                />
                <div
                  className="w-8 h-8 rounded border-2 border-gray-300"
                  style={{ backgroundColor: theme.textColor }}
                  title="Text Color"
                />
              </div>
              
              <div className="flex-1 text-xs text-gray-500 space-y-1">
                <div className="flex justify-between">
                  <span>Primary:</span>
                  <span className="font-mono">{theme.primaryColor}</span>
                </div>
                <div className="flex justify-between">
                  <span>Text:</span>
                  <span className="font-mono">{theme.textColor}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
