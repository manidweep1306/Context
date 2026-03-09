import React, { useState } from 'react';
import axios from 'axios';
import { Upload, BookOpen, MapPin, Languages, Loader2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState('Simplified English');
  const [location, setLocation] = useState('Hyderabad');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('language', language);
    formData.append('location', location);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      
      // If we got an ID, navigate to the detail view
      if (response.data.explanation_id) {
        navigate(`/explanation/${response.data.explanation_id}`);
      } else {
        // Fallback for mock mode (pass state)
        navigate('/result', { state: { data: response.data } });
      }

    } catch (err) {
      console.error(err);
      setError('An error occurred. ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
          Hyper-Local <span className="text-primary">Learning Assistant</span>
        </h1>
        <p className="text-lg text-gray-600">
          Upload notes and get explanations tailored to your city and language.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* File Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
              <Upload size={18} /> Upload Study Material
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-primary transition-colors cursor-pointer bg-gray-50 flex flex-col items-center justify-center">
              <input 
                type="file" 
                onChange={handleFileChange} 
                accept=".pdf,.txt" 
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-indigo-700 cursor-pointer" 
              />
              <p className="text-xs text-gray-400 mt-2">PDF or Text files supported</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Language Selection */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <Languages size={18} /> Language Mode
              </label>
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value)} 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
              >
                <option value="Simplified English">Simplified English</option>
                <option value="Hinglish">Hinglish (Hindi + English)</option>
                <option value="Telugish (Telugu+English)">Telugish (Telugu + English)</option>
              </select>
            </div>

            {/* Location Input */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin size={18} /> Your Location
              </label>
              <input 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                placeholder="e.g. Hyderabad, Mumbai" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
              />
            </div>
          </div>

          {/* Action Button */}
          <button 
            type="submit" 
            disabled={loading} 
            className="w-full bg-primary hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Generating Localized Context...
              </>
            ) : (
              <>
                Explain with Local Context <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
