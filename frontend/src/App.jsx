import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import UploadPage from './pages/UploadPage';
import Dashboard from './pages/Dashboard';
import ConceptView from './pages/ConceptView';
import ChatPage from './pages/ChatPage';
import HistoryPage from './pages/HistoryPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/study" element={<UploadPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/concept" element={<ConceptView />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/history" element={<HistoryPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
