import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import InteractiveBackground from './components/InteractiveBackground';
import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import SeatSelection from './pages/SeatSelection';
import Checkout from './pages/Checkout';

export default function App() {
  return (
    <BrowserRouter>
      <div className="relative min-h-screen bg-[#0A0E1A] text-white">
        <InteractiveBackground />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/seat-selection" element={<SeatSelection />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
