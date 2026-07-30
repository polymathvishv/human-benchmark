import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import ReactionTime from './pages/games/ReactionTime';
import SequenceMemory from './pages/games/SequenceMemory';
import AimTrainer from './pages/games/AimTrainer';
import NumberMemory from './pages/games/NumberMemory';
import VerbalMemory from './pages/games/VerbalMemory';
import ChimpTest from './pages/games/ChimpTest';
import VisualMemory from './pages/games/VisualMemory';
import TypingTest from './pages/games/TypingTest';
// Import other games here...

function App() {
  return (
    <div className="app-container">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/reaction-time" element={<ReactionTime />} />
          <Route path="/sequence-memory" element={<SequenceMemory />} />
          <Route path="/aim-trainer" element={<AimTrainer />} />
          <Route path="/number-memory" element={<NumberMemory />} />
          <Route path="/verbal-memory" element={<VerbalMemory />} />
          <Route path="/chimp-test" element={<ChimpTest />} />
          <Route path="/visual-memory" element={<VisualMemory />} />
          <Route path="/typing" element={<TypingTest />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contact" element={<Contact />} />
          {/* Add other routes here later */}
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
