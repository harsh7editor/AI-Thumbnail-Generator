import React, { useState } from 'react';
import { FaUpload, FaMagic, FaPalette, FaImage } from 'react-icons/fa';

const ThumbnailForm = ({ formData, setFormData, onGenerate, onGetSuggestions, onGetThemes, loading }) => {
  const [imagePreview, setImagePreview] = useState(null);

  /**
   * Handle input changes
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  /**
   * Handle file upload
   */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        backgroundImage: file
      });

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Remove uploaded image
   */
  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      backgroundImage: null
    });
    setImagePreview(null);
  };

  /**
   * Handle form submission
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onGenerate(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <FaImage className="mr-2 text-primary" />
        Create Thumbnail
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Video Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter your video title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
            required
          />
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of your video"
            rows="3"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition resize-none"
          />
        </div>

        {/* Keywords Input */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Keywords
          </label>
          <input
            type="text"
            name="keywords"
            value={formData.keywords}
            onChange={handleChange}
            placeholder="tech, tutorial, gaming (comma separated)"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
          />
        </div>

        {/* Style Selection */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Style
          </label>
          <select
            name="style"
            value={formData.style}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition"
          >
            <option value="modern">Modern</option>
            <option value="bold">Bold</option>
            <option value="minimal">Minimal</option>
            <option value="vibrant">Vibrant</option>
            <option value="professional">Professional</option>
          </select>
        </div>

        {/* Color Pickers */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Text Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                name="textColor"
                value={formData.textColor}
                onChange={handleChange}
                className="w-12 h-12 rounded cursor-pointer"
              />
              <input
                type="text"
                value={formData.textColor}
                onChange={(e) => setFormData({ ...formData, textColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                name="backgroundColor"
                value={formData.backgroundColor}
                onChange={handleChange}
                className="w-12 h-12 rounded cursor-pointer"
              />
              <input
                type="text"
                value={formData.backgroundColor}
                onChange={(e) => setFormData({ ...formData, backgroundColor: e.target.value })}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Background Image (Optional)
          </label>
          
          {!imagePreview ? (
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition">
              <FaUpload className="text-3xl text-gray-400 mb-2" />
              <span className="text-sm text-gray-600">Click to upload or drag & drop</span>
              <span className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 10MB</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button
            type="submit"
            disabled={loading || !formData.title}
            className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            <FaMagic />
            <span>{loading ? 'Generating...' : 'Generate Thumbnail'}</span>
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onGetSuggestions}
              disabled={loading || !formData.title}
              className="bg-secondary text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed text-sm"
            >
              Get Suggestions
            </button>

            <button
              type="button"
              onClick={onGetThemes}
              disabled={loading || !formData.title}
              className="bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed text-sm flex items-center justify-center space-x-1"
            >
              <FaPalette />
              <span>Get Themes</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ThumbnailForm;
