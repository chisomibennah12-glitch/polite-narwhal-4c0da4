import { Bell, ChevronDown, MapPin, Menu, Sparkles, UserCircle2, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useAppStore } from '../store/useAppStore';

const navItems = [
  { label: 'Movies', to: '/' },
  { label: 'Stream', to: '/stream' },
  { label: 'Events', to: '/events' },
  { label: 'Plays', to: '/plays' },
  { label: 'Sports', to: '/sports' },
  { label: 'Offers', to: '/offers' },
];

export default function Navbar() {
  const [cityOpen, setCityOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const selectedCity = useAppStore((state) => state.selectedCity);
  const cities = useAppStore((state) => state.cities);
  const setCity = useAppStore((state) => state.setCity);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b1019]/70 backdrop-blur-xl">
      <div className="mx-auto max-w-shell px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-4 lg:min-w-[220px]">
            <div className="text-2xl font-semibold text-red-500">CinePass</div>
            <div className="relative">
              <button
                type="button"
                onClick={() => setCityOpen((value) => !value)}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
              >
                <MapPin className="h-4 w-4 text-red-400" />
                {selectedCity}
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </button>
              {cityOpen && (
                <div className="absolute left-0 top-[calc(100%+10px)] w-40 rounded-2xl border border-white/10 bg-[#0f1523] p-2 shadow-2xl">
                  {cities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => {
                        setCity(city);
                        setCityOpen(false);
                      }}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm ${
                        city === selectedCity ? 'bg-red-500/15 text-red-300' : 'text-slate-300 hover:bg-white/5'
                      }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="hidden flex-1 justify-center lg:flex">
            <SearchBar />
          </div>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `relative px-3 py-2 text-sm font-medium transition ${isActive ? 'text-red-400' : 'text-slate-300 hover:text-white'}`
                }
              >
                {item.label}
                <span className="absolute inset-x-2 bottom-0 h-px bg-red-500 opacity-0 transition group-hover:opacity-100" />
              </NavLink>
            ))}
            <button type="button" className="relative rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 transition hover:rotate-12 hover:text-white">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-[#0b1019]" />
            </button>
            <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-red-600 text-white shadow-glow">
              <UserCircle2 className="h-6 w-6" />
            </button>
          </div>

          <button type="button" className="ml-auto rounded-full border border-white/10 bg-white/5 p-2 text-slate-200 lg:hidden" onClick={() => setMobileOpen((value) => !value)}>
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="mt-4 space-y-4 rounded-[20px] border border-white/10 bg-[#0f1729]/90 p-4 lg:hidden">
            <SearchBar />
            <div className="flex flex-wrap gap-2">
              {navItems.map((item) => (
                <NavLink key={item.label} to={item.to} className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs uppercase tracking-[0.2em] text-slate-200">
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
