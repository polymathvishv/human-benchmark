import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Static imports — required for SSR (renderToString can't await lazy())
// Vite still code-splits these per-route in the client build automatically
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import SciencePage from './pages/SciencePage';
import ScienceArticleDetail from './pages/ScienceArticleDetail';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Contact from './pages/Contact';
import TermsOfService from './pages/TermsOfService';
import ReactionTime from './pages/games/ReactionTime';
import SequenceMemory from './pages/games/SequenceMemory';
import AimTrainer from './pages/games/AimTrainer';
import NumberMemory from './pages/games/NumberMemory';
import VerbalMemory from './pages/games/VerbalMemory';
import ChimpTest from './pages/games/ChimpTest';
import VisualMemory from './pages/games/VisualMemory';
import TypingTest from './pages/games/TypingTest';
import MobileTypingTest from './pages/games/MobileTypingTest';
import StatsPage from './pages/StatsPage';
import LeaderboardPage from './pages/LeaderboardPage';
import BattlePage from './pages/BattlePage';
import BattleRoomPage from './pages/BattleRoomPage';

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <ScrollToTop />
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/battle" element={<BattlePage />} />
            <Route path="/battle/:roomCode" element={<BattleRoomPage />} />
            <Route path="/reaction-time" element={<ReactionTime />} />
            <Route path="/sequence-memory" element={<SequenceMemory />} />
            <Route path="/aim-trainer" element={<AimTrainer />} />
            <Route path="/number-memory" element={<NumberMemory />} />
            <Route path="/verbal-memory" element={<VerbalMemory />} />
            <Route path="/chimp-test" element={<ChimpTest />} />
            <Route path="/visual-memory" element={<VisualMemory />} />
            <Route path="/typing" element={<TypingTest />} />
            <Route path="/mobile-typing" element={<MobileTypingTest />} />
            <Route path="/science" element={<SciencePage />} />
            <Route path="/science/:slug" element={<ScienceArticleDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<StatsPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
