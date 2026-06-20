export function InputField({ icon, placeholder, type = "text", value, onChange, rightIcon }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-['Inter']"
      />
      {rightIcon && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{rightIcon}</span>}
    </div>
  );
}