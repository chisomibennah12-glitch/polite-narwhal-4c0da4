import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import ComingSoonCard from '../components/ComingSoonCard';
import FilterBar from '../components/FilterBar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import ImmersionCard from '../components/ImmersionCard';
import MovieCard from '../components/MovieCard';
import Navbar from '../components/Navbar';
import ShowtimeRow from '../components/ShowtimeRow';
import Toast from '../components/Toast';
import { cinemaRows, generateDateTabs } from '../data/cinemas';
import { movies } from '../data/movies';
import { upcomingMovies } from '../data/upcoming';
import { useAppStore } from '../store/useAppStore';

const immersionCards = [
  {
    title: 'IMAX Laser 4K',
    label: 'UNMATCHED CLARITY',
    subtitle: 'Blue panel',
    description: 'Sharper pixels, deeper contrast, and a wider frame that puts you inside the action.',
    accent: 'linear-gradient(135deg, rgba(37,99,235,0.32), rgba(14,165,233,0.18), rgba(10,14,26,0.9))',
    iconKey: 'IMAX',
    filter: 'IMAX 3D',
  },
  {
    title: 'PVR LUXE & Directors',
    label: 'SUPREME LUXURY',
    subtitle: 'Gold tier comfort',
    description: 'A designer lounge experience with plush recliners and precision surround sound.',
    accent: 'linear-gradient(135deg, rgba(234,179,8,0.26), rgba(120,119,198,0.18), rgba(10,14,26,0.9))',
    iconKey: 'LUXE',
    filter: 'Dolby Atmos',
  },
  {
    title: '4DX Motion Seats',
    label: 'SENSORY OVERLOAD',
    subtitle: 'Green motion cinema',
    description: 'Feel the impact with motion seats, wind, scents and dynamic effects built for spectacle.',
    accent: 'linear-gradient(135deg, rgba(34,197,94,0.26), rgba(16,185,129,0.18), rgba(10,14,26,0.9))',
    iconKey: '4DX',
    filter: '4DX',
  },
];

export default function Home() {
  const selectedCity = useAppStore((state) => state.selectedCity);
  const languageFilters = useAppStore((state) => state.languageFilters);
  const formatFilters = useAppStore((state) => state.formatFilters);
  const toggleFormat = useAppStore((state) => state.toggleFormat);
  const toast = useAppStore((state) => state.toast);
  const dismissToast = useAppStore((state) => state.dismissToast);
  const [dateTab, setDateTab] = useState('today');

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) => {
      const languageMatch = languageFilters.some((lang) => movie.languages.includes(lang));
      const formatMatch = formatFilters.length === 0 || formatFilters.some((fmt) => movie.format.includes(fmt) || movie.format === fmt);
      return languageMatch && formatMatch;
    });
  }, [languageFilters, formatFilters]);

  const dateTabs = generateDateTabs();

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-shell px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="pt-6">
          <Hero />
        </motion.div>

        <div className="mt-8">
          <FilterBar />
        </div>

        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">In theatres now</div>
              <h2 className="mt-2 text-3xl font-semibold text-white">Now Showing in {selectedCity}</h2>
            </div>
            <button type="button" className="inline-flex items-center gap-2 text-sm font-medium text-slate-200">
              Explore All Movies <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {filteredMovies.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-white/10 bg-[#101827]/60 p-10 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-400">
                <Sparkles className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-semibold text-white">No movies match your filters</h3>
              <p className="mt-2 text-slate-400">Try a different language or format to view other titles.</p>
              <button
                type="button"
                onClick={() => useAppStore.getState().clearFilters()}
                className="mt-5 rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white"
              >
                Clear all
              </button>
            </div>
          )}
        </section>

        <section className="mt-20">
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Ultimate immersion</div>
            <h2 className="mt-2 text-4xl font-semibold text-white">Experience Cinema Like Never Before</h2>
            <p className="mt-3 text-base text-slate-400">
              Choose from state-of-the-art projection and sound technologies designed for absolute realism.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {immersionCards.map((card) => (
              <ImmersionCard
                key={card.title}
                {...card}
                handleSelect={() => {
                  toggleFormat(card.filter);
                  document.getElementById('showtimes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
              />
            ))}
          </div>
        </section>

        <section id="showtimes" className="mt-20">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Real-time availability</div>
              <h2 className="mt-2 text-3xl font-semibold text-white">Cinemas Near You & Showtimes</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {dateTabs.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setDateTab(tab.value)}
                  className={`rounded-full px-4 py-2 text-sm font-medium ${
                    dateTab === tab.value ? 'bg-red-500 text-white shadow-glow' : 'border border-white/10 bg-white/5 text-slate-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {cinemaRows.map((cinema) => (
              <ShowtimeRow key={cinema.id} cinema={cinema} />
            ))}
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Coming soon</div>
              <h2 className="mt-2 text-3xl font-semibold text-white">Advance Booking Open</h2>
            </div>
            <div className="text-sm text-slate-400">Secure your seats early</div>
          </div>

          <div className="grid gap-5 xl:grid-cols-3">
            {upcomingMovies.map((movie) => (
              <ComingSoonCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
      <Toast toast={toast} onDismiss={dismissToast} />
    </>
  );
}
