import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import EmitterEditorPage from './modules/EMITTEREDITOR/EmitterEditorPage';
import HomePage from './modules/HOMEPAGE/HomePage';

import './assets/style/theme.css';
import './assets/style/layout.css';
import './assets/style/form.css';
import MainMenuBlock from './components/Template/MainMenu/MainMenuBlock';

function App() {
  return (
    <Router>
      <MainMenuBlock />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/emitter" element={<EmitterEditorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
