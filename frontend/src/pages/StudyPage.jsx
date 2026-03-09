import { useState } from 'react'
import axios from 'axios'
import '../App.css'
import { useNavigate } from 'react-router-dom';

function StudyPage() {
  const [file, setFile] = useState(null)
  const [language, setLanguage] = useState('Simplified English')
  const [location, setLocation] = useState('Hyderabad')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value)
  }

  const handleLocationChange = (e) => {
    setLocation(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!file) {
      alert('Please select a file')
      return
    }

    setLoading(true)
    setError(null)
    setResult(null)

    const formData = new FormData()
    formData.append('file', file)
    formData.append('language', language)
    formData.append('location', location)

    try {
      const response = await axios.post('http://localhost:8000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      
      let parsedExplanation = {};
      try {
          // If the AI returns a JSON string, try to parse it
          // The backend might return it as an object already if user fixed parsing
          if (typeof response.data.explanation === 'string') {
               parsedExplanation = JSON.parse(response.data.explanation);
          } else {
               parsedExplanation = response.data.explanation;
          }
      } catch (e) {
          // Fallback if AI returns raw text
          parsedExplanation = { 
              concept_name: "Localized Concept", 
              localized_lesson: typeof response.data.explanation === 'string' ? response.data.explanation : JSON.stringify(response.data.explanation),
              comparison_rows: []
          };
      }
      setResult({ ...response.data, parsedExplanation });
      
    } catch (err) {
      console.error(err)
      setError('An error occurred while processing the file. ' + (err.response?.data?.alert || err.message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white mb-8">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <span className="material-symbols-outlined text-indigo-400">auto_stories</span>
            <span className="font-bold">AI Study Explainer</span>
        </div>
        <button onClick={() => navigate('/')} className="text-sm hover:underline">Back to Home</button>
      </div>

      <h1>🌏 Hyper-Local Learning Assistant</h1>
      <div className="card">
        <p>
          Upload your notes and get explanations tailored to your <b>local context</b> ({location}).
        </p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center', maxWidth: '500px', margin: '0 auto' }}>
          
          <div style={{width: '100%', textAlign: 'left'}}>
            <label style={{display: 'block', marginBottom: '0.5rem'}}>1. Upload PDF/Text:</label>
            <input type="file" onChange={handleFileChange} accept=".pdf,.txt" required style={{width: '100%'}} />
          </div>
          
          <div style={{width: '100%', textAlign: 'left'}}>
            <label style={{display: 'block', marginBottom: '0.5rem'}}>2. Select Language Mode:</label>
            <select id="language" value={language} onChange={handleLanguageChange} style={{ padding: '0.5rem', width: '100%' }}>
              <option value="Simplified English">Simplified English</option>
              <option value="Hinglish">Hinglish (Hindi + English)</option>
              <option value="Telugish (Telugu+English)">Telugish (Telugu + English)</option>
            </select>
          </div>

          <div style={{width: '100%', textAlign: 'left'}}>
             <label style={{display: 'block', marginBottom: '0.5rem'}}>3. Your Location (City/State):</label>
             <input type="text" value={location} onChange={handleLocationChange} placeholder="e.g. Hyderabad, Mumbai, Chennai" style={{ padding: '0.5rem', width: '100%' }} />
          </div>
          
          <button type="submit" disabled={loading} style={{marginTop: '1rem', width: '100%'}}>
            {loading ? 'Generating Localized Explanation...' : 'Explain with Local Context'}
          </button>
        </form>

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

        {result && result.parsedExplanation && (
          <div style={{ marginTop: '2rem', textAlign: 'left', border: '1px solid #444', padding: '2rem', borderRadius: '12px', background: '#333', color: 'white' }}>
            
            <h2 style={{ color: '#4CAF50', marginTop: 0 }}>{result.parsedExplanation.concept_name}</h2>
            
            <div style={{ fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem', whiteSpace: 'pre-wrap' }}>
                {result.parsedExplanation.localized_lesson}
            </div>

            {result.parsedExplanation.comparison_rows && result.parsedExplanation.comparison_rows.length > 0 && (
                <div>
                    <h3 style={{borderBottom: '1px solid #666', paddingBottom: '0.5rem'}}>Global vs. Local Context ({location})</h3>
                    <div style={{overflowX: 'auto'}}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
                            <thead>
                                <tr style={{background: '#222'}}>
                                    <th style={{padding: '10px', border: '1px solid #555', textAlign: 'left'}}>Scientific Concept</th>
                                    <th style={{padding: '10px', border: '1px solid #555', textAlign: 'left'}}>Typical Textbook Example</th>
                                    <th style={{padding: '10px', border: '1px solid #555', textAlign: 'left'}}>Local Example ({location})</th>
                                </tr>
                            </thead>
                            <tbody>
                                {result.parsedExplanation.comparison_rows.map((row, index) => (
                                    <tr key={index} style={{background: index % 2 === 0 ? 'transparent' : '#2a2a2a'}}>
                                        <td style={{padding: '10px', border: '1px solid #555', fontWeight: 'bold'}}>{row.concept}</td>
                                        <td style={{padding: '10px', border: '1px solid #555', color: '#aaa'}}>{row.global_example_before}</td>
                                        <td style={{padding: '10px', border: '1px solid #555', color: '#81C784', fontWeight: 'bold'}}>{row.local_example_after}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
          </div>
        )}
      </div>
    </>
  )
}

export default StudyPage