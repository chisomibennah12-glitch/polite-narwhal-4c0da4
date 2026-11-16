import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Info } from 'lucide-react';

export default function Toast({ toast, onDismiss }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 18, scale: 0.98 }}
          className="fixed bottom-6 right-6 z-[120] flex items-center gap-3 rounded-2xl border border-white/10 bg-[#121827]/90 px-4 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.35)] backdrop-blur-xl"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
            {toast.type === 'success' ? <CheckCircle2 className="h-4 w-4" /> : <Info className="h-4 w-4" />}
          </div>
          <div className="text-sm text-white">{toast.message}</div>
          <button type="button" onClick={onDismiss} className="ml-2 text-xs text-slate-300 hover:text-white">
            Dismiss
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
