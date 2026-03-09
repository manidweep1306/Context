import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Analyzing from "./Analyzing";

export default function UploadPage() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("Simplified English");
  const [location, setLocation] = useState("Hyderabad");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("upload");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const mapLanguageToBackend = (uiLang) => {
      // Map UI friendly names to backend prompts if needed
      // "Simplified English", "Hinglish", "Telugish" are expected by backend prompt logic mostly
      return uiLang;
  };

  const handleGenerate = async () => {
    if (!file) {
        alert("Please select a file first.");
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

      let parsedExplanation = {};
      try {
          if (typeof response.data.explanation === 'string') {
               parsedExplanation = JSON.parse(response.data.explanation);
          } else {
               parsedExplanation = response.data.explanation;
          }
      } catch (e) {
          parsedExplanation = { 
              concept_name: "Localized Concept", 
              localized_lesson: typeof response.data.explanation === 'string' ? response.data.explanation : JSON.stringify(response.data.explanation),
              comparison_rows: []
          };
      }
      
      navigate('/concept', { state: { result: {...response.data, parsedExplanation} } });

    } catch (err) {
      console.error(err);
      setError('An error occurred: ' + (err.response?.data?.detail || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
      return <Analyzing />;
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100 min-h-screen flex">

      {/* SIDEBAR */}

      <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col fixed h-full z-20">

        <div className="p-6 flex items-center gap-3">
          <Link to="/" className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center text-white hover:bg-indigo-700 transition">
            <span className="material-symbols-outlined">auto_stories</span>
          </Link>

          <div>
            <h1 className="font-bold text-lg">Study AI</h1>
            <p className="text-xs text-slate-500">Personal Tutor</p>
          </div>
        </div>


        {/* NAV */}

        <nav className="flex-1 px-4 py-4 space-y-1">

          <SidebarItem icon="home" label="Home" to="/" />
          <SidebarItem icon="cloud_upload" label="Upload" active={activeTab === 'upload'} onClick={() => setActiveTab('upload')} />
          <SidebarItem icon="library_books" label="My Library" active={activeTab === 'library'} onClick={() => setActiveTab('library')} />
          <SidebarItem icon="history" label="Recent Activity" active={activeTab === 'history'} onClick={() => setActiveTab('history')} />

        </nav>


        {/* FOOTER SIDEBAR */}

        <div className="p-4 border-t border-slate-200 dark:border-slate-800">

          <SidebarItem icon="settings" label="Settings" />

          <div className="mt-4 p-4 rounded-xl bg-slate-100 dark:bg-slate-800">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-2">
              Storage Usage
            </p>

            <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
              <div className="bg-indigo-600 h-full w-[45%]"></div>
            </div>

            <p className="text-xs mt-2 text-slate-600 dark:text-slate-400">
              45% of 1GB used
            </p>
          </div>

        </div>

      </aside>


      {/* MAIN */}

      <main className="ml-72 flex-1 p-8 min-h-screen overflow-auto">

        <div className="max-w-4xl mx-auto">

          {activeTab === 'upload' && (
            <>
              <header className="mb-10">
                <h2 className="text-3xl font-extrabold mb-2 text-slate-900 dark:text-white">
                  Upload Study Material
                </h2>

                <p className="text-slate-500">
                  Transform complex PDF documents into easy explanations.
                </p>
              </header>


              {/* FILE UPLOAD */}

              <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">

                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-indigo-600">
                    description
                  </span>
                  <h3 className="font-bold text-lg">Document</h3>
                </div>


                <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl py-12 px-6 bg-slate-50 dark:bg-slate-800/50 hover:border-indigo-500/50 transition cursor-pointer group">

                  <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-indigo-600 text-3xl">
                      upload_file
                    </span>
                  </div>

                  <h4 className="text-lg font-bold">
                    {file ? file.name : "Click to upload or drag and drop"}
                  </h4>

                  <p className="text-sm text-slate-500 text-center max-w-xs mt-2">
                    {file ? "Ready to process" : "Upload a PDF (Max 25MB)"}
                  </p>

                  <input
                    type="file"
                    accept=".pdf,.txt"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                </label>
                
                {file && (
                    <div className="mt-4 flex justify-end">
                        <button onClick={() => setFile(null)} className="text-sm text-red-500 hover:text-red-600">Remove</button>
                    </div>
                )}

              </section>


              {/* SETTINGS (Language & Location) */}

              <div className="grid md:grid-cols-2 gap-8 mt-8">
                  
                  {/* LANGUAGE */}
                  <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">

                    <div className="flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-indigo-600">
                        translate
                      </span>
                      <h3 className="font-bold text-lg">Preferred Language</h3>
                    </div>

                    <div className="space-y-3">
                      {["Simplified English", "Hinglish", "Telugish", "Tamil"].map((lang) => (
                        <label key={lang} className="flex items-center gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                          <input
                            type="radio"
                            name="language"
                            value={lang}
                            checked={language === lang}
                            onChange={() => setLanguage(lang)}
                            className="accent-indigo-600 w-4 h-4"
                          />
                          <span className="font-medium text-sm">{lang}</span>
                        </label>
                      ))}
                    </div>

                  </section>

                  {/* LOCATION */}
                  <section className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">

                    <div className="flex items-center gap-2 mb-4">
                      <span className="material-symbols-outlined text-indigo-600">
                        location_on
                      </span>
                      <h3 className="font-bold text-lg">Your Location</h3>
                    </div>

                    <div className="space-y-4">
                        <p className="text-sm text-slate-500">We use this to give you locally relevant examples.</p>
                        <input 
                            type="text" 
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 outline-none focus:border-indigo-600 transition"
                            placeholder="e.g. Hyderabad, Mumbai, Bangalore"
                        />
                    </div>

                  </section>
              </div>


              {/* BUTTON */}

              <div className="flex flex-col items-center gap-4 mt-8">

                <button
                  className={`w-full max-w-sm bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all hover:-translate-y-1`}
                  onClick={handleGenerate}
                  disabled={loading}
                >
                  <span className="material-symbols-outlined">bolt</span>
                  Generate Explanation
                </button>

                {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 w-full max-w-sm text-center text-sm">
                        {error}
                    </div>
                )}

                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    info
                  </span>
                  AI generation usually takes 30-60 seconds
                </p>

              </div>
              
            </>
          )}

          {activeTab !== 'upload' && (
              <div className="flex flex-col items-center justify-center h-64 text-slate-500">
                  <span className="material-symbols-outlined text-6xl mb-4 text-slate-300">construction</span>
                  <h3 className="text-xl font-bold">Coming Soon</h3>
                  <p>This feature is currently under development.</p>
                  <button onClick={() => setActiveTab('upload')} className="mt-4 text-indigo-600 font-medium hover:underline">
                      Go back to Upload
                  </button>
              </div>
          )}


          {/* FOOTER */}

          <footer className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">

            <p className="text-sm text-slate-500">
              © 2024 AI Study Explainer
            </p>

          </footer>

        </div>

      </main>

    </div>
  );
}


/* SIDEBAR COMPONENT */

function SidebarItem({ icon, label, active, onClick, to }) {
  if (to) {
    return (
      <Link
        to={to}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left
        ${
          active
            ? "bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400"
            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
      >
        <span className="material-symbols-outlined">{icon}</span>
        {label}
      </Link>
    );
  }

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left
      ${
        active
          ? "bg-indigo-50 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400"
          : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
      }`}
    >
      <span className="material-symbols-outlined">{icon}</span>
      {label}
    </button>
  );
}