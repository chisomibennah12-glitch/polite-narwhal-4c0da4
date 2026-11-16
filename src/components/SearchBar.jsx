import { AnimatePresence, motion } from 'framer-motion';
import { Search, Command } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchIndex } from '../data/movies';

function highlightText(text, query) {
  if (!query) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={`${part}-${index}`} className="bg-red-500/20 text-white rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    )
  );
}

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const results = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return [];

    return searchIndex.filter((item) => {
      const haystack = `${item.label} ${item.subtitle}`.toLowerCase();
      return haystack.includes(value);
    }).slice(0, 6);
  }, [query]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        inputRef.current?.focus();
      }

      if (event.key === 'Escape') {
        setQuery('');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSubmit = (nextResult) => {
    const target = nextResult || results[activeIndex] || null;
    if (!target) return;
    setQuery('');
    navigate(`/movie/${target.id}`);
  };

  return (
    <div className="relative flex-1 max-w-[640px]">
      <div className="relative overflow-hidden rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.2)]">
        <div className="flex items-center gap-3 px-4 py-3 text-slate-300">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            ref={inputRef}
            aria-label="Search movies, events, plays, sports and venues"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveIndex(0);
            }}
            onKeyDown={(event) => {
              if (event.key === 'ArrowDown') {
                event.preventDefault();
                setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
              }
              if (event.key === 'ArrowUp') {
                event.preventDefault();
                setActiveIndex((prev) => Math.max(prev - 1, 0));
              }
              if (event.key === 'Enter') {
                event.preventDefault();
                handleSubmit();
              }
            }}
            className="w-full bg-transparent text-sm text-white placeholder:text-slate-400 focus:outline-none"
            placeholder="Search for Movies, Events, Plays, Sports and Venues"
          />
          <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-200 md:flex">
            <Command className="h-3 w-3" />
            Ctrl+K
          </div>
        </div>
      </div>

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute left-0 right-0 top-[calc(100%+12px)] z-50 rounded-2xl border border-white/10 bg-[#111827]/95 p-2 shadow-2xl backdrop-blur-xl"
          >
            {results.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onMouseDown={() => handleSubmit(item)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition ${
                  index === activeIndex ? 'bg-white/8 text-white' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <div>
                  <div className="text-sm font-medium">{highlightText(item.label, query)}</div>
                  <div className="text-xs text-slate-400">{highlightText(item.subtitle, query)}</div>
                </div>
                <span className="rounded-full bg-white/5 px-2 py-1 text-[9px] uppercase tracking-[0.2em] text-slate-300">
                  {item.type}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
