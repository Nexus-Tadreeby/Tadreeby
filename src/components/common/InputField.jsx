export function InputField({
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
  rightIcon,
  maxLength,
  id,
  name,
  status = "idle",
}) {
  const renderStatusIcon = () => {
    if (status === "checking") {
      return (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-blue-200 bg-blue-50">
          <span className="h-2.5 w-2.5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
        </span>
      );
    }

    if (status === "success") {
      return (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-green-200 bg-green-50">
          <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5 text-green-600" aria-hidden="true">
            <path d="M5.5 10.5L8.2 13.2L14.7 6.7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      );
    }

    if (status === "error") {
      return (
        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-red-200 bg-red-50">
          <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5 text-red-600" aria-hidden="true">
            <path d="M10 5V10.5M10 14.5H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      );
    }

    return null;
  };

  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition font-['Inter']"
      />
      {status !== "idle" ? (
        <span className="absolute right-3 top-1/2 -translate-y-1/2">{renderStatusIcon()}</span>
      ) : rightIcon ? (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{rightIcon}</span>
      ) : null}
    </div>
  );
}