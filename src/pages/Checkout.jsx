import { Check, Lock, QrCode, ShieldCheck, Ticket } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const confettiPieces = Array.from({ length: 28 }, (_, index) => ({
  id: index,
  left: `${(index * 17) % 100}%`,
  delay: `${(index % 7) * 0.12}s`,
  color: ['#ff4d5a', '#fbbf24', '#60a5fa', '#34d399'][index % 4],
}));

export default function Checkout() {
  const navigate = useNavigate();
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setComplete(true), 1100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-shell px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <section className="rounded-[28px] border border-white/10 bg-[#101827] p-6">
            <div className="mb-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-slate-400">
              <Lock className="h-4 w-4 text-emerald-400" /> Secure checkout
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm text-slate-300">Full name</label>
                <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/40" placeholder="Aarav Mehta" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Email address</label>
                <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/40" placeholder="aarav@example.com" />
              </div>
              <div>
                <label className="mb-2 block text-sm text-slate-300">Card number</label>
                <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/40" placeholder="4242 4242 4242 4242" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-slate-300">Expiry</label>
                  <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/40" placeholder="12/29" />
                </div>
                <div>
                  <label className="mb-2 block text-sm text-slate-300">CVV</label>
                  <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500/40" placeholder="321" />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setComplete(true)}
              className="mt-8 w-full rounded-full bg-red-600 px-5 py-3 text-base font-semibold text-white shadow-glow"
            >
              Confirm Payment
            </button>
          </section>

          <aside className="rounded-[28px] border border-white/10 bg-[#0d1727] p-6">
            <div className="mb-5 flex items-center justify-between">
              <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Order summary</div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-200">2 tickets</div>
            </div>

            <div className="rounded-[22px] border border-white/10 bg-[#101827] p-4">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-white">Spider-Man: Brand New Day</div>
                  <div className="mt-2 text-sm text-slate-400">PVR ICON: Palladium, Lower Parel</div>
                </div>
                <div className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-300">IMAX</div>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex justify-between"><span>Date</span><span>30 Jul, 2026</span></div>
                <div className="flex justify-between"><span>Show time</span><span>06:30 PM</span></div>
                <div className="flex justify-between"><span>Seats</span><span>A2, A3, A4</span></div>
                <div className="flex justify-between"><span>Ticket total</span><span>₹1,347</span></div>
              </div>
            </div>

            <div className="mt-6 rounded-[22px] border border-white/10 bg-[#101827] p-4">
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-400"><Ticket className="h-4 w-4" /> E-ticket</div>
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-white">Movie Pass</div>
                  <div className="mt-1 text-xs text-slate-400">QR valid for entry</div>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                  <QrCode className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>

            <div className="mt-6 inline-flex items-center gap-2 text-sm text-emerald-300">
              <ShieldCheck className="h-4 w-4" /> 256-bit encrypted payment
            </div>
          </aside>
        </div>

        {complete && (
          <div className="relative mt-8 overflow-hidden rounded-[28px] border border-emerald-500/20 bg-emerald-500/10 p-6 text-center">
            <div className="absolute inset-0 pointer-events-none">
              {confettiPieces.map((piece) => (
                <span
                  key={piece.id}
                  className="absolute top-2 h-3 w-2 rounded-full"
                  style={{ left: piece.left, background: piece.color, animationDelay: piece.delay, animation: 'confetti 1.3s ease-out forwards' }}
                />
              ))}
            </div>
            <div className="relative flex flex-col items-center justify-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check className="h-7 w-7" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-emerald-200">Payment successful</div>
                <h2 className="mt-2 text-3xl font-semibold text-white">Your tickets are booked.</h2>
              </div>
              <button type="button" onClick={() => navigate('/')} className="rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-medium text-white">
                Back to movies
              </button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
