import React from 'react';
import { FaDownload, FaSpinner, FaCheckCircle } from 'react-icons/fa';

const ThumbnailPreview = ({ thumbnail, loading }) => {
  /**
   * Download the thumbnail
   */
  const handleDownload = async () => {
    if (!thumbnail || !thumbnail.url) return;

    try {
      const response = await fetch(thumbnail.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = thumbnail.filename || 'thumbnail.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      // Fallback to opening in new tab
      window.open(thumbnail.url, '_blank');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Preview</h2>

      <div className="space-y-4">
        {/* Preview Area */}
        <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <FaSpinner className="text-5xl text-primary animate-spin mx-auto mb-4" />
                <p className="text-gray-600 font-semibold">Generating your thumbnail...</p>
                <p className="text-sm text-gray-500 mt-2">This may take 10-30 seconds</p>
              </div>
            </div>
          ) : thumbnail ? (
            <div className="absolute inset-0">
              <img
                src={thumbnail.url}
                alt="Generated Thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg
                  className="w-24 h-24 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="font-semibold">No thumbnail yet</p>
                <p className="text-sm mt-1">Fill the form and click Generate</p>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnail Info */}
        {thumbnail && (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2 text-green-700">
                <FaCheckCircle />
                <span className="font-semibold text-sm">Thumbnail generated successfully!</span>
              </div>
            </div>

            {/* Metadata */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Dimensions</p>
                <p className="font-semibold text-gray-800">
                  {thumbnail.metadata?.width} × {thumbnail.metadata?.height}
                </p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-gray-600">Format</p>
                <p className="font-semibold text-gray-800 uppercase">
                  {thumbnail.metadata?.format || 'PNG'}
                </p>
              </div>
            </div>

            {thumbnail.aiGenerated && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-blue-700 text-sm">
                  <span className="font-semibold">AI Generated Background</span>
                </p>
                {thumbnail.prompt && (
                  <p className="text-xs text-blue-600 mt-1 line-clamp-2">
                    {thumbnail.prompt}
                  </p>
                )}
              </div>
            )}

            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-semibold hover:from-green-600 hover:to-green-700 transition flex items-center justify-center space-x-2 shadow-lg"
            >
              <FaDownload />
              <span>Download Thumbnail</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThumbnailPreview;
