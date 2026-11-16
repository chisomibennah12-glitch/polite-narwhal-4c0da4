import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock3, Play, Ticket } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { featuredMovies } from '../data/movies';

export default function Hero() {
  const [active, setActive] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isHovering) return undefined;
    const interval = setInterval(() => setActive((value) => (value + 1) % featuredMovies.length), 6000);
    return () => clearInterval(interval);
  }, [isHovering]);

  const movie = featuredMovies[active] || featuredMovies[0];

  const openTrailer = () => {
    const trailerUrl = movie.trailerUrl || movie.trailer;
    if (trailerUrl) {
      window.open(trailerUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section
      className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[#0d1322]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a]/90 via-[#141d2e]/40 to-[#0a0e1a]/20" />
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: movie.poster,
          backgroundImage: movie.posterUrl ? `linear-gradient(90deg, rgba(10,14,26,0.9), rgba(20,29,46,0.38), rgba(10,14,26,0.18)), url(${movie.posterUrl})` : movie.poster,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div className="relative min-h-[620px] px-5 py-6 sm:px-8 lg:px-10">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3 text-slate-200">
            <div className="text-[10px] uppercase tracking-[0.3em] text-red-400">Marvel Studios</div>
          </div>
          <div className="flex gap-2">
            {featuredMovies.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(index)}
                className={`h-1.5 rounded-full transition-all ${index === active ? 'w-10 bg-red-500' : 'w-6 bg-white/20'}`}
                aria-label={`Go to ${item.title}`}
              />
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute left-10 top-20 text-[12rem] font-black uppercase leading-none tracking-[-0.09em] text-red-500/20 blur-[1px]">
          {movie.heroTitle}
        </div>
        <div className="pointer-events-none absolute right-16 top-24 text-[5rem] font-black uppercase tracking-[0.12em] text-[#f4d28a]/20">
          BRAND NEW DAY
        </div>

        <div className="relative flex flex-col gap-10 pt-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-shrink-0">
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, x: -32 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative overflow-hidden rounded-[24px] border border-red-500/25 bg-[#090d18]/60 p-2 shadow-glow"
            >
              <div
                className="h-[320px] w-[220px] rounded-[18px] border border-white/10"
                style={{
                  background: movie.poster,
                  backgroundImage: movie.posterUrl ? `linear-gradient(180deg, rgba(9,13,24,0.15), rgba(9,13,24,0.75)), url(${movie.posterUrl})` : movie.poster,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-center bg-black/60 py-2 text-[10px] uppercase tracking-[0.18em] text-slate-300">
                In cinemas
              </div>
            </motion.div>
          </div>

          <div className="flex-1 max-w-[640px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -14 }}
                transition={{ duration: 0.3 }}
                className="space-y-5"
              >
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-slate-300">
                  <span>{movie.releaseDate}</span>
                  <span className="text-red-400">Now showing</span>
                </div>
                <h1 className="max-w-[550px] text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-[4rem]">
                  {movie.title}
                </h1>

                <div className="flex flex-wrap gap-2 text-[10px] font-medium uppercase tracking-[0.18em] text-slate-200">
                  {['2D, 3D, 3D SCREEN X, 4DX, EPIC 3D, +9', 'English, Telugu, +4'].map((chip) => (
                    <span key={chip} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-slate-200 backdrop-blur-sm">
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-sm text-slate-300">
                  <Clock3 className="h-4 w-4 text-slate-400" />
                  <span>{movie.duration} • {movie.genres.join(', ')} • {movie.certificate} • {movie.releaseDate}</span>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="inline-flex items-center gap-3 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-glow transition hover:scale-[1.02]"
                  >
                    <Ticket className="h-4 w-4" />
                    Book Tickets
                  </button>
                  <button
                    type="button"
                    onClick={openTrailer}
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white"
                  >
                    <Play className="h-4 w-4 fill-white" />
                    Trailer
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => setActive((value) => (value - 1 + featuredMovies.length) % featuredMovies.length)}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-white"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full bg-red-500"
              animate={{ width: `${((active + 1) / featuredMovies.length) * 100}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
          <button
            type="button"
            onClick={() => setActive((value) => (value + 1) % featuredMovies.length)}
            className="rounded-full border border-white/10 bg-white/5 p-2 text-white"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
