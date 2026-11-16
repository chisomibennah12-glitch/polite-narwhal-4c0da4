import { CalendarDays, Clock3, Film, Play, Ticket } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { movies } from '../data/movies';
import { useAppStore } from '../store/useAppStore';

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = movies.find((item) => item.id === id) || movies[0];
  const setSelectedMovie = useAppStore((state) => state.setSelectedMovie);

  const handleBooking = () => {
    setSelectedMovie(movie);
    navigate('/seat-selection');
  };

  const openTrailer = () => {
    const trailerUrl = movie.trailerUrl || movie.trailer;
    if (trailerUrl) {
      window.open(trailerUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-shell px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <section className="overflow-hidden rounded-[28px] border border-white/10 bg-[#101827]">
          <div className="grid gap-8 p-6 lg:grid-cols-[260px_1fr] lg:p-8">
            <div
              className="overflow-hidden rounded-[24px] border border-red-500/20 shadow-glow"
              style={{
                background: movie.poster,
                backgroundImage: movie.posterUrl ? `linear-gradient(180deg, rgba(16,24,39,0.1), rgba(16,24,39,0.7)), url(${movie.posterUrl})` : movie.poster,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="h-[360px] w-full" />
            </div>

            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-slate-300">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-2">{movie.certificate}</span>
                <span className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-2 text-red-300">{movie.format}</span>
              </div>

              <div>
                <h1 className="text-4xl font-semibold text-white sm:text-5xl">{movie.title}</h1>
                <p className="mt-3 max-w-2xl text-slate-300">{movie.description}</p>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-slate-400">
                <span className="inline-flex items-center gap-2"><Clock3 className="h-4 w-4" /> {movie.duration}</span>
                <span className="inline-flex items-center gap-2"><Film className="h-4 w-4" /> {movie.genres.join(', ')}</span>
                <span className="inline-flex items-center gap-2"><CalendarDays className="h-4 w-4" /> {movie.releaseDate}</span>
              </div>

              <div className="flex flex-wrap gap-4">
                <button type="button" onClick={handleBooking} className="inline-flex items-center gap-2 rounded-full bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-glow">
                  <Ticket className="h-4 w-4" /> Book Tickets
                </button>
                <button type="button" onClick={openTrailer} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white">
                  <Play className="h-4 w-4 fill-white" /> Watch Trailer
                </button>
              </div>

              <div className="grid gap-4 rounded-[20px] border border-white/10 bg-[#0d1727] p-5 sm:grid-cols-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Languages</div>
                  <div className="mt-2 text-white">{movie.languages.join(', ')}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Rating</div>
                  <div className="mt-2 text-white">★ {movie.rating}/10</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">From</div>
                  <div className="mt-2 text-white">₹{movie.price}</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
