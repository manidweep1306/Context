import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { BookOpen, MapPin, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

function ExplanationView() {
  const { id } = useParams();
  const locationState = useLocation().state;
  const [data, setData] = useState(locationState?.data || null);
  const [loading, setLoading] = useState(!data);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!data && id) {
      const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/explanations/${id}`);
          setData(response.data);
        } catch (err) {
            console.error(err);
          setError('Failed to load explanation.');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [id, data]);

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div></div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;
  if (!data) return <div className="text-center mt-10">No explanation found.</div>;

  let parsed = {};
  if (typeof data.explanation === 'string') {
      try {
        parsed = JSON.parse(data.explanation);
      } catch (e) {
        parsed = { concept_name: "Localized Concept", localized_lesson: data.explanation };
      }
  } else {
      parsed = data.explanation; // Already object
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-primary mb-6 transition-colors">
        <ArrowLeft size={18} className="mr-1" /> Back to Upload
      </Link>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-primary text-white p-8">
          <div className="flex items-center gap-2 text-indigo-200 text-sm font-medium mb-2 uppercase tracking-wide">
            <BookOpen size={16} /> {data.language} Mode
            <span className="mx-2">•</span>
            <MapPin size={16} /> {data.location} Context
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">{parsed.concept_name}</h1>
        </div>

        <div className="p-8">
          {/* Main Lesson */}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed mb-10 whitespace-pre-wrap">
            {parsed.localized_lesson}
          </div>

          {/* Comparison Table */}
          {parsed.comparison_rows && parsed.comparison_rows.length > 0 && (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4 border-b pb-2 flex items-center gap-2">
                <MapPin className="text-secondary" /> Global vs. Local ({data.location})
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200 text-gray-500 text-sm uppercase">
                      <th className="py-3 px-4 font-semibold w-1/4">Concept</th>
                      <th className="py-3 px-4 font-semibold w-1/3">Typical Example</th>
                      <th className="py-3 px-4 font-semibold w-1/3 text-secondary">Local Example</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {parsed.comparison_rows.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-100 transition-colors">
                        <td className="py-3 px-4 font-medium text-gray-900">{row.concept}</td>
                        <td className="py-3 px-4 text-gray-500 italic">{row.global_example_before}</td>
                        <td className="py-3 px-4 text-secondary font-semibold bg-green-50 rounded-r-lg">
                          {row.local_example_after}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExplanationView;
