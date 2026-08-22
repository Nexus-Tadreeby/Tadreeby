export function Button({ children, onClick, disabled, variant = "primary", icon, className = "" }) {
  const baseStyles = "flex items-center gap-2 px-7 py-3 rounded-full text-sm font-bold transition font-['Inter']";
  
  const variants = {
    primary: "bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-[0_4px_16px_rgba(249,115,22,0.3)] hover:shadow-lg",
 
    secondary: "border border-gray-200 text-gray-600 hover:bg-gray-50",
    
    gold: "bg-gradient-to-br from-[#FCA83E] to-[#f59a2a] hover:from-[#f59a2a] hover:to-[#e8891e] disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-[0_4px_16px_rgba(252,168,62,0.35)] hover:shadow-lg",

    blue: "bg-gradient-to-br from-[#1677FF] to-[#0a5fc9] hover:from-[#0a5fc9] hover:to-[#084ba3] disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-[0_4px_16px_rgba(22,119,255,0.35)] hover:shadow-lg",
  
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