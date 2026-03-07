import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainApp from './MainApp';
import DoomscrollingLanding from './components/DoomscrollingLanding';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/doomscrolling" element={<DoomscrollingLanding />} />
        <Route path="/sleep" element={<DoomscrollingLanding />} />
      </Routes>
    </Router>
  );
};

export default App;
