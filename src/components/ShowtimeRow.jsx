import { motion } from 'framer-motion';
import { MapPin, Ticket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

const statusStyles = {
  Available: 'border-green-500/50 bg-green-500/5 text-green-300',
  'Filling Fast': 'border-amber-500/50 bg-amber-500/5 text-amber-300',
  'Almost Full': 'border-red-500/50 bg-red-500/5 text-red-300',
};

export default function ShowtimeRow({ cinema }) {
  const navigate = useNavigate();
  const setSelectedShowtime = useAppStore((state) => state.setSelectedShowtime);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="rounded-[24px] border border-white/10 bg-[#101827]/80 p-5 backdrop-blur-xl"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-white">{cinema.name}</h3>
            <span className="rounded-full border border-yellow-400/50 bg-yellow-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-yellow-200">
              {cinema.badge}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <MapPin className="h-4 w-4 text-slate-500" />
            {cinema.location}
          </div>
          <div className="flex flex-wrap gap-2">
            {cinema.amenities.map((amenity) => (
              <span key={amenity} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-slate-300">
                {amenity}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {cinema.showtimes.map((show) => (
            <button
              key={show.id}
              type="button"
              className={`group relative flex min-w-[120px] flex-col gap-1 rounded-2xl border p-3 text-left shadow-lg transition hover:-translate-y-0.5 hover:border-red-500/50 ${statusStyles[show.status]}`}
              onClick={() => {
                setSelectedShowtime(show);
                navigate('/seat-selection');
              }}
              title={`${show.screen} • ${show.seats} seats left`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-lg font-semibold text-white">{show.time}</span>
                <Ticket className="h-4 w-4 opacity-70" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.16em] text-slate-300">{show.status}</span>
              <span className="mt-2 text-xs text-slate-300">{show.screen.split(' - ')[0]} • ₹{show.price}</span>
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
