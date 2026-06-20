export function Button({ children, onClick, disabled, variant = "primary", icon, className = "" }) {
  const baseStyles = "flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold transition font-['Inter']";
  
  const variants = {
    primary: "bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-[0_4px_16px_rgba(249,115,22,0.3)] hover:shadow-lg",
    secondary: "border border-gray-200 text-gray-600 hover:bg-gray-50"
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  );
}