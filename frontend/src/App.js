import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThumbnailForm from './components/ThumbnailForm';
import ThumbnailPreview from './components/ThumbnailPreview';
import ThumbnailSuggestions from './components/ThumbnailSuggestions';
import ThemeSelector from './components/ThemeSelector';
import Header from './components/Header';
import { generateThumbnail, getThumbnailSuggestions, getThemeSuggestions } from './services/api';

function App() {
  const [loading, setLoading] = useState(false);
  const [currentThumbnail, setCurrentThumbnail] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [themes, setThemes] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    style: 'modern',
    textColor: '#FFFFFF',
    backgroundColor: '#6366F1',
    backgroundImage: null
  });

  /**
   * Handle form submission to generate thumbnail
   */
  const handleGenerateThumbnail = async (data) => {
    setLoading(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append('title', data.title);
      formDataObj.append('description', data.description || '');
      formDataObj.append('keywords', data.keywords || '');
      formDataObj.append('style', data.style);
      formDataObj.append('textColor', data.textColor);
      formDataObj.append('backgroundColor', data.backgroundColor);
      
      if (data.backgroundImage) {
        formDataObj.append('backgroundImage', data.backgroundImage);
      }

      const result = await generateThumbnail(formDataObj);
      
      if (result.success) {
        setCurrentThumbnail(result);
        toast.success('Thumbnail generated successfully!');
      } else {
        toast.error('Failed to generate thumbnail');
      }
    } catch (error) {
      console.error('Error generating thumbnail:', error);
      toast.error(error.message || 'Failed to generate thumbnail');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get multiple thumbnail suggestions
   */
  const handleGetSuggestions = async () => {
    if (!formData.title) {
      toast.error('Please enter a title first');
      return;
    }

    setLoading(true);
    try {
      const result = await getThumbnailSuggestions({
        title: formData.title,
        description: formData.description,
        keywords: formData.keywords,
        count: 3
      });

      setSuggestions(result.suggestions || []);
      toast.success('Suggestions generated!');
    } catch (error) {
      console.error('Error getting suggestions:', error);
      toast.error('Failed to get suggestions');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Get theme suggestions based on content
   */
  const handleGetThemes = async () => {
    if (!formData.title) {
      toast.error('Please enter a title first');
      return;
    }

    setLoading(true);
    try {
      const result = await getThemeSuggestions({
        title: formData.title,
        description: formData.description,
        keywords: formData.keywords
      });

      setThemes(result.themes || []);
      toast.success('Theme suggestions generated!');
    } catch (error) {
      console.error('Error getting themes:', error);
      toast.error('Failed to get theme suggestions');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Apply a theme to form data
   */
  const handleApplyTheme = (theme) => {
    setFormData({
      ...formData,
      backgroundColor: theme.primaryColor,
      textColor: theme.textColor
    });
    toast.info(`Applied theme: ${theme.name}`);
  };

  /**
   * Select a suggestion as current thumbnail
   */
  const handleSelectSuggestion = (suggestion) => {
    setCurrentThumbnail(suggestion);
    toast.success('Suggestion selected!');
  };

  return (
    <div className="min-h-screen pb-12">
      <Header />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6">
            <ThumbnailForm 
              formData={formData}
              setFormData={setFormData}
              onGenerate={handleGenerateThumbnail}
              onGetSuggestions={handleGetSuggestions}
              onGetThemes={handleGetThemes}
              loading={loading}
            />

            {themes.length > 0 && (
              <ThemeSelector 
                themes={themes}
                onApplyTheme={handleApplyTheme}
              />
            )}
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <ThumbnailPreview 
              thumbnail={currentThumbnail}
              loading={loading}
            />

            {suggestions.length > 0 && (
              <ThumbnailSuggestions 
                suggestions={suggestions}
                onSelect={handleSelectSuggestion}
              />
            )}
          </div>
        </div>
      </div>

      <ToastContainer 
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
