import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight, MapPin } from 'lucide-react';

function History() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8000/explanations');
        setHistory(response.data);
      } catch (err) {
        console.error("Failed to fetch history", err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
        <Clock className="text-primary" /> Learning History
      </h1>

      <div className="grid gap-4">
        {history.length === 0 ? (
          <p className="text-gray-500 text-center py-10">No explanations saved yet.</p>
        ) : (
          history.map((item) => (
            <Link 
              to={`/explanation/${item.id}`} 
              key={item.id} 
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex justify-between items-center group"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                  {item.concept_name}
                </h3>
                <div className="text-sm text-gray-500 mt-1 flex gap-4">
                  <span className="flex items-center gap-1"><MapPin size={14} /> {item.location}</span>
                  <span>{new Date(item.created_at).toLocaleDateString()}</span>
                  <span className="bg-gray-100 px-2 py-0.5 rounded text-xs">{item.language}</span>
                </div>
              </div>
              <ArrowRight className="text-gray-300 group-hover:text-primary transition-colors" />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default History;
