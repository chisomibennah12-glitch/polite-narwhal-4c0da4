import { ArrowRight, Clapperboard, Film, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const icons = {
  IMAX: Clapperboard,
  LUXE: Film,
  '4DX': Sparkles,
};

export default function ImmersionCard({ title, label, subtitle, description, accent, handleSelect, iconKey }) {
  const Icon = icons[iconKey] || Clapperboard;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#131b2b]"
      onClick={handleSelect}
    >
      <div className="relative h-[360px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#101827] via-[#172133] to-[#0b1020]" />
        <div className="absolute inset-0 opacity-80" style={{ background: accent }} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,rgba(5,8,20,0.82)_100%)]" />
        <div className="absolute inset-0 transition duration-500 group-hover:scale-110" style={{ background: accent, filter: 'blur(14px)', opacity: 0.28 }} />

        <div className="relative z-10 flex h-full flex-col justify-end p-7">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-black/25 backdrop-blur-sm">
            <Icon className="h-7 w-7 text-white" />
          </div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.26em] text-slate-200">{label}</div>
          <h3 className="mt-2 text-3xl font-semibold tracking-[0.04em] text-white">{title}</h3>
          <p className="mt-3 text-sm text-slate-300">{subtitle}</p>
          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-300">{description}</p>
          <button
            type="button"
            onClick={handleSelect}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white"
          >
            <span>{title === 'IMAX Laser 4K' ? 'Explore IMAX Screens' : title === 'PVR LUXE & Directors' ? 'View LUXE Theatres' : 'Find 4DX Showtimes'}</span>
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
