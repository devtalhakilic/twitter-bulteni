import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Quiz from './Quiz.jsx'; // Henüz bu dosyayı oluşturmadık

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz/:id" element={<Quiz />} />
    </Routes>
  );
}

export default App;