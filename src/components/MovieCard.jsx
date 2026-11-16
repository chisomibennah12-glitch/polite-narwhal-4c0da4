import { motion } from 'framer-motion';
import { Play, Star } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TrailerModal from './TrailerModal';

export default function MovieCard({ movie }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();

  const handleMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left) / rect.width;
    const offsetY = (event.clientY - rect.top) / rect.height;
    setTilt({
      x: (0.5 - offsetY) * 16,
      y: (offsetX - 0.5) * 16,
    });
  };

  const openTrailer = () => {
    window.open(movie.trailerUrl || movie.trailer, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        onMouseMove={handleMove}
        onMouseLeave={() => setTilt({ x: 0, y: 0 })}
        onClick={openTrailer}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-2px)`,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ y: -8 }}
        className="group relative overflow-hidden rounded-[20px] border border-white/10 bg-[#121827] shadow-[0_18px_50px_rgba(0,0,0,0.35)]"
      >
        <div
          className="relative h-[360px] overflow-hidden"
          style={{
            background: movie.poster,
            backgroundImage: movie.posterUrl ? `linear-gradient(180deg, rgba(12,18,30,0.25), rgba(12,18,30,0.7)), url(${movie.posterUrl})` : movie.poster,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#090d18]/80 via-transparent to-transparent" />
          <div
            className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.14), rgba(239,28,38,0.18), transparent 60%)',
              transform: 'translateX(-10%)',
            }}
          />
          <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full border border-[#ffffff20] bg-[#0d1322]/75 px-2.5 py-1 text-xs font-semibold text-white/90 backdrop-blur-sm">
            <Star className="h-3 w-3 fill-[#FBBF24] text-[#FBBF24]" />
            {movie.rating}/10
          </div>

          <div className="absolute right-3 top-3 rounded-full border border-white/10 bg-black/30 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
            {movie.format}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-slate-300">
              {movie.genres.join(' / ')}
            </div>
          </div>

          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition duration-300 group-hover:opacity-100">
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                openTrailer();
              }}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-black/55 px-4 py-2 text-sm font-medium text-white backdrop-blur-md"
            >
              <Play className="h-4 w-4 fill-white text-white" />
              Watch Trailer
            </button>
          </div>
        </div>

        <div className="space-y-3 p-4">
          <div className="text-[11px] uppercase tracking-[0.2em] text-slate-400">{movie.languages.join(', ')}</div>
          <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>{movie.duration}</span>
            <span>{movie.certificate}</span>
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="text-sm text-slate-400">From ₹{movie.price}</div>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                navigate(`/movie/${movie.id}`);
              }}
              className="rounded-full bg-[#E50914] px-4 py-2 text-sm font-medium text-white shadow-glow transition hover:scale-[1.02]"
            >
              Book Now
            </button>
          </div>
        </div>
      </motion.article>

      <TrailerModal isOpen={showTrailer} onClose={() => setShowTrailer(false)} url={movie.trailer} />
    </>
  );
}
