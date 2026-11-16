import { ArrowRight, CreditCard, MonitorPlay, Ticket } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useAppStore } from '../store/useAppStore';

const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const seatsPerRow = 10;
const tiers = [
  { name: 'Silver', price: 249 },
  { name: 'Gold', price: 349 },
  { name: 'Recliner', price: 499 },
];

const defaultLayout = rows.flatMap((row, rowIndex) =>
  Array.from({ length: seatsPerRow }, (_, seatIndex) => {
    const seatNumber = seatIndex + 1;
    const isBooked = (rowIndex + seatNumber) % 7 === 0 || (rowIndex === 3 && seatNumber > 7);
    const isSelected = rowIndex === 0 && (seatNumber === 2 || seatNumber === 3 || seatNumber === 6);
    return {
      id: `${row}${seatNumber}`,
      row,
      seatNumber,
      status: isBooked ? 'booked' : isSelected ? 'selected' : 'available',
      tier: rowIndex < 4 ? 'Silver' : rowIndex < 7 ? 'Gold' : 'Recliner',
    };
  })
);

export default function SeatSelection() {
  const navigate = useNavigate();
  const [seats, setSeats] = useState(defaultLayout);
  const selectedShowtime = useAppStore((state) => state.selectedShowtime) || { time: '06:30 PM', price: 449, screen: 'Screen 2 - LUXE' };

  const selected = useMemo(() => seats.filter((seat) => seat.status === 'selected'), [seats]);

  const total = selected.length * selectedShowtime.price;

  const toggleSeat = (id) => {
    setSeats((current) =>
      current.map((seat) => {
        if (seat.id !== id || seat.status === 'booked') return seat;
        if (seat.status === 'selected') {
          return { ...seat, status: 'available' };
        }
        if (selected.length >= 8) return seat;
        return { ...seat, status: 'selected' };
      })
    );
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-shell px-4 pb-20 pt-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-[28px] border border-white/10 bg-[#101827] p-5 sm:p-6">
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Spider-Man: Brand New Day</div>
                <h1 className="mt-2 text-3xl font-semibold text-white">Choose Your Seats</h1>
              </div>
              <div className="rounded-full border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs uppercase tracking-[0.18em] text-red-300">
                {selectedShowtime.time}
              </div>
            </div>

            <div className="mb-8 overflow-hidden rounded-[20px] border border-white/10 bg-gradient-to-r from-slate-200/20 via-white/5 to-slate-200/20 p-6">
              <div className="mx-auto h-3 w-[80%] rounded-full bg-gradient-to-r from-transparent via-white/80 to-transparent" />
              <div className="mt-2 text-center text-[10px] uppercase tracking-[0.28em] text-slate-300">Screen This Way</div>
            </div>

            <div className="space-y-3">
              {rows.map((row) => (
                <div key={row} className="grid grid-cols-[24px_1fr] items-center gap-3">
                  <div className="text-sm text-slate-400">{row}</div>
                  <div className="grid grid-cols-10 gap-2">
                    {Array.from({ length: seatsPerRow }, (_, index) => {
                      const seat = seats.find((item) => item.row === row && item.seatNumber === index + 1);
                      if (!seat) return null;

                      return (
                        <button
                          key={seat.id}
                          type="button"
                          onClick={() => toggleSeat(seat.id)}
                          disabled={seat.status === 'booked'}
                          className={`h-8 rounded-[8px] border text-[10px] font-medium ${
                            seat.status === 'booked'
                              ? 'cursor-not-allowed border-slate-700 bg-slate-800 text-slate-500'
                              : seat.status === 'selected'
                                ? 'border-red-500 bg-red-500 text-white'
                                : 'border-slate-600 bg-slate-800/80 text-slate-200 hover:border-red-500/60'
                          }`}
                        >
                          {seat.seatNumber}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="rounded-[28px] border border-white/10 bg-[#0f1728] p-5">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-slate-400">Booking summary</div>
                <h2 className="mt-2 text-2xl font-semibold text-white">₹{total || 0}</h2>
              </div>
              <div className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200">
                {selected.length}/{8} seats
              </div>
            </div>

            <div className="space-y-4 rounded-[20px] border border-white/10 bg-[#101827] p-4">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>{selectedShowtime.screen}</span>
                <span>{selectedShowtime.time}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Official price</span>
                <span>₹{selectedShowtime.price}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>Seat map</span>
                <span>{selected.length} selected</span>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {tiers.map((tier) => (
                <div key={tier.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200">
                  <span>{tier.name}</span>
                  <span>₹{tier.price}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-slate-400">
              <MonitorPlay className="h-4 w-4" />
              Fast checkout enabled
            </div>

            <button
              type="button"
              onClick={() => navigate('/checkout')}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-red-600 px-5 py-3 text-base font-semibold text-white shadow-glow"
            >
              <Ticket className="h-4 w-4" /> Pay ₹{total || selectedShowtime.price}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button type="button" className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-slate-200">
              <CreditCard className="h-4 w-4" /> Use Gift Card
            </button>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
