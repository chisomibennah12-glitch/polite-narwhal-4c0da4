import { useAppStore } from '../store/useAppStore';

export default function Footer() {
  const selectedCity = useAppStore((state) => state.selectedCity);

  return (
    <footer className="mt-20 border-t border-white/10 bg-[#0B1019]/80">
      <div className="mx-auto max-w-shell px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-4 text-2xl font-semibold text-red-500">CinePass</div>
            <p className="max-w-xs text-sm leading-7 text-slate-400">
              Discover immersive stories, book seamless tickets, and step into unforgettable cinema moments.
            </p>
          </div>

          <div>
            <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Movies in {selectedCity}</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Action Movies</li>
              <li>Bollywood Blockbusters</li>
              <li>IMAX Screenings</li>
              <li>Upcoming Releases</li>
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Entertainment</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Live Concerts</li>
              <li>Stand-up Comedy</li>
              <li>Theatrical Plays</li>
              <li>Sporting Leagues</li>
            </ul>
          </div>

          <div>
            <div className="mb-4 text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-400">Support & Legal</div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Corporate Governance</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
          <span>© 2026 CinePass India Private Limited. All rights reserved.</span>
          <div className="flex gap-5">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
