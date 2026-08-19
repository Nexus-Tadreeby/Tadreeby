import React, { createContext, useContext, useState, useCallback } from "react";
import { Lock, AlertCircle, CheckCircle2, Info, X, ShieldAlert } from "lucide-react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback((message, type = "auth", duration = 6000) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      
      {/* Toast Notification Container */}
      <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

const ToastItem = ({ toast, onClose }) => {
  const { type, message } = toast;

  // const getStyle = () => {
  //   switch (type) {
  //     case "warning":
  //     case "auth":
  //       return {
  //         bg: "bg-red-50/95 border-red-300/90 text-red-950 shadow-[0_10px_30px_rgba(220,38,38,0.25)]",
  //         iconBg: "bg-red-100 text-red-600 border border-red-200/80",
  //         icon: <ShieldAlert className="h-5 w-5 text-red-600" />,
  //         badge: "Authentication Required",
  //       };
  //     case "error":
  //       return {
  //         bg: "bg-red-50/95 border-red-300/90 text-red-950 shadow-[0_10px_30px_rgba(239,68,68,0.25)]",
  //         iconBg: "bg-red-100 text-red-600 border border-red-200/80",
  //         icon: <AlertCircle className="h-5 w-5" />,
  //         badge: "Access Restricted",
  //       };
  //     case "success":
  //       return {
  //         bg: "bg-emerald-50/95 border-emerald-200/90 text-emerald-950 shadow-[0_8px_25px_rgba(16,185,129,0.2)]",
  //         iconBg: "bg-emerald-100 text-emerald-600",
  //         icon: <CheckCircle2 className="h-5 w-5" />,
  //         badge: "Success",
  //       };
  //     default:
  //       return {
  //         bg: "bg-blue-50/95 border-blue-200/90 text-blue-950 shadow-[0_8px_25px_rgba(37,99,235,0.2)]",
  //         iconBg: "bg-blue-100 text-blue-600",
  //         icon: <Info className="h-5 w-5" />,
  //         badge: "Notification",
  //       };
  //   }
  // };


  // ToastContext.jsx – inside ToastItem
  const getStyle = () => {
    switch (type) {
      case "auth":
      case "warning":
        return {
          bg: "bg-red-50/95 border-red-300/90 text-red-950 shadow-[0_10px_30px_rgba(220,38,38,0.25)]",
          iconBg: "bg-red-100 text-red-600 border border-red-200/80",
          icon: <ShieldAlert className="h-5 w-5 text-red-600" />,
          badge: "Authentication Required",
        };
      case "error":
        return {
          bg: "bg-red-50/95 border-red-300/90 text-red-950 shadow-[0_10px_30px_rgba(239,68,68,0.25)]",
          iconBg: "bg-red-100 text-red-600 border border-red-200/80",
          icon: <AlertCircle className="h-5 w-5" />,
          badge: "Server Error", // ✅ changed from "Access Restricted"
        };
      case "validation":
        return {
          bg: "bg-yellow-50/95 border-yellow-300/90 text-yellow-950 shadow-[0_10px_30px_rgba(234,179,8,0.2)]",
          iconBg: "bg-yellow-100 text-yellow-600",
          icon: <AlertCircle className="h-5 w-5" />,
          badge: "Validation Error",
        };
      case "success":
        return {
          bg: "bg-emerald-50/95 border-emerald-200/90 text-emerald-950 shadow-[0_8px_25px_rgba(16,185,129,0.2)]",
          iconBg: "bg-emerald-100 text-emerald-600",
          icon: <CheckCircle2 className="h-5 w-5" />,
          badge: "Success",
        };
      default:
        return {
          bg: "bg-blue-50/95 border-blue-200/90 text-blue-950 shadow-[0_8px_25px_rgba(37,99,235,0.2)]",
          iconBg: "bg-blue-100 text-blue-600",
          icon: <Info className="h-5 w-5" />,
          badge: "Notification",
        };
    }
  };

  const style = getStyle();

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-2xl border backdrop-blur-xl transition-all duration-300 transform animate-scale-up ${style.bg}`}
    >
      <div className={`p-2 rounded-xl shrink-0 ${style.iconBg}`}>{style.icon}</div>

      <div className="flex-1 min-w-0 pr-1">
        <p className="text-[11px] font-extrabold uppercase tracking-wider opacity-75">
          {style.badge}
        </p>
        <p className="text-xs sm:text-sm font-semibold mt-0.5 leading-snug">
          {message}
        </p>
      </div>

      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-700 p-1 rounded-lg hover:bg-black/5 transition cursor-pointer shrink-0"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
