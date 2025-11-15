'use client'
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { createContext, useContext, useState, ReactNode } from 'react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  messageHindi?: string;
}

interface ToastContextType {
  showToast: ( message: string, type: ToastType, messageHindi?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  const showToast = ( message: string,type: ToastType, messageHindi?: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, type, message, messageHindi }]);
    
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4000);
  };
  
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };
  
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full px-4">
        <AnimatePresence>
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <XCircle className="w-5 h-5" />,
    warning: <AlertCircle className="w-5 h-5" />,
    info: <Info className="w-5 h-5" />
  };
  
  const styles = {
    success: 'bg-[var(--color-success)] text-white',
    error: 'bg-[var(--color-danger)] text-white',
    warning: 'bg-[var(--color-warning)] text-white',
    info: 'bg-[var(--color-info)] text-white'
  };
  
  return (
    <motion.div
      className={`flex items-start gap-3 p-4 rounded-[var(--radius-lg)] shadow-lg ${styles[toast.type]}`}
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {icons[toast.type]}
      <div className="flex-1">
        <p>{toast.message}</p>
        {toast.messageHindi && <small className="opacity-90">{toast.messageHindi}</small>}
      </div>
      <button onClick={onClose} className="hover:opacity-80 transition-opacity">
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return context;
}
