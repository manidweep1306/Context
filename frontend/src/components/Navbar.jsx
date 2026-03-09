import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, History as HistoryIcon, Home } from 'lucide-react';

function Navbar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path ? 'text-primary bg-indigo-50 font-medium' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50';

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
              <BookOpen className="text-secondary" />
              <span>Learn<span className="text-gray-900">Local</span></span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <Link 
              to="/" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive('/')}`}
            >
              <Home size={18} /> <span className="hidden sm:inline">Home</span>
            </Link>
            <Link 
              to="/history" 
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive('/history')}`}
            >
              <HistoryIcon size={18} /> <span className="hidden sm:inline">History</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
