import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

const Dashboard = lazy(() => import('./pages/Dashboard'));
const About = lazy(() => import('./pages/About'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const Contact = lazy(() => import('./pages/Contact'));
const ReactionTime = lazy(() => import('./pages/games/ReactionTime'));
const SequenceMemory = lazy(() => import('./pages/games/SequenceMemory'));
const AimTrainer = lazy(() => import('./pages/games/AimTrainer'));
const NumberMemory = lazy(() => import('./pages/games/NumberMemory'));
const VerbalMemory = lazy(() => import('./pages/games/VerbalMemory'));
const ChimpTest = lazy(() => import('./pages/games/ChimpTest'));
const VisualMemory = lazy(() => import('./pages/games/VisualMemory'));
const TypingTest = lazy(() => import('./pages/games/TypingTest'));
const MobileTypingTest = lazy(() => import('./pages/games/MobileTypingTest'));
const StatsPage = lazy(() => import('./pages/StatsPage'));

import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <ScrollToTop />
        <Header />
        <main className="main-content">
          <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
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
              <Route path="/mobile-typing" element={<MobileTypingTest />} />
              <Route path="/about" element={<About />} />
              <Route path="/dashboard" element={<StatsPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
