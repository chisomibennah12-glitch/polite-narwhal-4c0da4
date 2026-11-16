import { Bell, CalendarClock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCountdown } from '../hooks/useCountdown';
import { useAppStore } from '../store/useAppStore';

export default function ComingSoonCard({ movie }) {
  const reminderStatus = useAppStore((state) => state.reminders[movie.id] || false);
  const setReminder = useAppStore((state) => state.setReminder);
  const showToast = useAppStore((state) => state.showToast);
  const targetDate = new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000).toISOString();
  const countdown = useCountdown(targetDate);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="group flex overflow-hidden rounded-[24px] border border-white/10 bg-[#121827]"
    >
      <div
        className="h-[220px] w-[170px]"
        style={{
          background: movie.poster,
          backgroundImage: movie.posterUrl ? `linear-gradient(180deg, rgba(18,24,39,0.15), rgba(18,24,39,0.75)), url(${movie.posterUrl})` : movie.poster,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.16em] text-red-400">Releasing {movie.releaseDate}</div>
            <h3 className="mt-2 text-2xl font-semibold text-white">{movie.title}</h3>
          </div>
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-200">
            {movie.certificate}
          </span>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-slate-300">
          {movie.languages.map((lang) => (
            <span key={lang} className="rounded-full border border-white/10 bg-white/5 px-2 py-1">
              {lang}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs uppercase tracking-[0.22em] text-red-300">
            <CalendarClock className="h-4 w-4" />
            Releases in {countdown.days}d {countdown.hours}h
          </div>

          <button
            type="button"
            onClick={() => {
              const next = !reminderStatus;
              setReminder(movie.id, next);
              showToast(next ? 'Reminder set' : 'Reminder cleared', 'success');
            }}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
              reminderStatus ? 'bg-emerald-500/20 text-emerald-200' : 'bg-white/5 text-white hover:bg-white/10'
            }`}
          >
            <Bell className={`h-4 w-4 ${reminderStatus ? 'animate-ring' : ''}`} />
            {reminderStatus ? 'Reminder set' : 'Remind Me'}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
