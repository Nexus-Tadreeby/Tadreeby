import { ChevronDown } from './Icons';

export default function SelectField({ 
  icon, 
  value, 
  onChange, 
  options, 
  placeholder,
  className = ""
}) {
  return (
    <div className={`relative ${className}`}>
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
      <select
        value={value}
        onChange={onChange}
        className={`w-full ${icon ? 'pl-10' : 'pl-4'} pr-10 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition font-['Inter']`}
      >
        <option value="">{placeholder}</option>
        {options.map(option => (
          <option key={option}>{option}</option>
        ))}
      </select>
      <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <ChevronDown />
      </span>
    </div>
  );
}