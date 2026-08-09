'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { CheckCircle2, Info, X } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  variant: 'success' | 'info';
}

interface ToastContextValue {
  showToast: (message: string, variant?: Toast['variant']) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TOAST_DURATION_MS = 3500;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, variant: Toast['variant'] = 'success') => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, message, variant }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, TOAST_DURATION_MS);
  }, []);

  function dismiss(id: string) {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="animate-ticker-in pointer-events-auto flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/95 px-4 py-2.5 text-sm text-zinc-100 shadow-2xl shadow-black/50 backdrop-blur-sm"
          >
            {toast.variant === 'success' ? (
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
            ) : (
              <Info className="h-4 w-4 shrink-0 text-cyan-400" />
            )}
            {toast.message}
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              className="ml-1 shrink-0 text-zinc-500 hover:text-zinc-200"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
