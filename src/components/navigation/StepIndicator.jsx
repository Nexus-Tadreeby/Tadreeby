import { CheckIcon } from "../common/Icons";

const steps = ["Basic Info", "Academic", "Verification"];

export function StepIndicator({ current }) {
  return (
    <div className="flex items-center w-full mb-8">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        const isLast = i === steps.length - 1;
        
        return (
          <div key={idx} className={`flex items-center ${!isLast ? "flex-1" : ""}`}>
            <div className="flex flex-col items-center group">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 transform
                  ${done ? "bg-[#16A34A] text-white border-2 border-[#16A34A] shadow-[0_2px_8px_rgba(22,163,74,0.3)] scale-105" : 
                    active ? "bg-[#2563EB] text-white border-2 border-[#2563EB] shadow-[0_0_0_4px_rgba(37,99,235,0.2)] scale-110" : 
                    "bg-white text-gray-400 border-2 border-gray-200"}`}
              >
                {done ? <CheckIcon /> : idx}
              </div>
              <span className={`text-xs font-semibold mt-1.5 transition-colors duration-200 ${active ? "text-[#2563EB]" : done ? "text-[#16A34A]" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
            {!isLast && (
              <div className={`h-1 flex-1 mx-2 rounded-full transition-all duration-500 ${done ? "bg-gradient-to-r from-[#16A34A] to-[#2563EB]" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}