// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout';
import ClassSelection from './pages/ClassSelection';
import CharacterGear from './pages/CharacterGear';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<ClassSelection />} />
          <Route path="/gear/:className" element={<CharacterGear />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;