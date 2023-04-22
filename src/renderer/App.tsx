import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import { Settings, Hello, SamplePage, Dashboard, NoPage } from './pages';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SamplePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/hello" element={<Hello />} />
        <Route path="/Settings" element={<Settings />} />
        <Route path="/sample-page" element={<SamplePage />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </Router>
  );
}
