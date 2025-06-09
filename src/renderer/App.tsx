import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import ChatBox from '@/src/components/ChatBox';
import './global.css';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatBox />} />
      </Routes>
    </Router>
  );
}
