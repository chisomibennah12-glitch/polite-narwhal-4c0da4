import { AnimatePresence, motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';
import { formatOptions, languageOptions } from '../data/movies';
import { useAppStore } from '../store/useAppStore';

export default function FilterBar() {
  const languageFilters = useAppStore((state) => state.languageFilters);
  const formatFilters = useAppStore((state) => state.formatFilters);
  const toggleLanguage = useAppStore((state) => state.toggleLanguage);
  const toggleFormat = useAppStore((state) => state.toggleFormat);
  const clearFilters = useAppStore((state) => state.clearFilters);

  return (
    <div className="flex flex-col gap-4 rounded-[22px] border border-white/10 bg-[#111827]/70 p-4 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">Languages:</span>
        <AnimatePresence mode="popLayout">
          <motion.div layout className="flex flex-wrap gap-2">
            {languageOptions.map((language) => {
              const active = languageFilters.includes(language);
              return (
                <motion.button
                  layout
                  key={language}
                  type="button"
                  onClick={() => toggleLanguage(language)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    active ? 'border-red-500 bg-red-500 text-white shadow-glow' : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                  }`}
                >
                  {language}
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400">Format:</span>
        <AnimatePresence mode="popLayout">
          <motion.div layout className="flex flex-wrap gap-2">
            {formatOptions.map((format) => {
              const active = formatFilters.includes(format);
              return (
                <motion.button
                  layout
                  key={format}
                  type="button"
                  onClick={() => toggleFormat(format)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    active ? 'border-white/40 bg-transparent text-white' : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                  }`}
                >
                  {format}
                </motion.button>
              );
            })}
          </motion.div>
        </AnimatePresence>

        <button type="button" onClick={clearFilters} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.18em] text-slate-300">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Clear
        </button>
      </div>
    </div>
  );
}
