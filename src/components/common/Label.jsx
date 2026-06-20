export function Label({ icon, text, sub }) {
  return (
    <div className="flex items-center gap-2 mb-1.5">
      <span className="text-blue-500">{icon}</span>
      <span className="text-sm font-semibold text-gray-700 font-['Inter']">{text}</span>
      {sub && <span className="text-xs text-gray-400 font-['Inter']">{sub}</span>}
    </div>
  );
}