import { CheckIcon } from "../common/Icons";

const steps = ["Basic Info", "Academic", "Verification"];

export function StepIndicator({ current }) {
  return (
    <div className="flex items-center gap-0 mb-8">
      {steps.map((label, i) => {
        const idx = i + 1;
        const done = idx < current;
        const active = idx === current;
        return (
          <div key={idx} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all
                  ${done ? "bg-green-500 text-white border-2 border-green-500" : 
                    active ? "bg-blue-600 text-white border-2 border-blue-600 shadow-[0_0_0_4px_rgba(37,99,235,0.15)]" : 
                    "bg-white text-gray-400 border-2 border-gray-200"}`}
              >
                {done ? <CheckIcon /> : idx}
              </div>
              <span className={`text-xs font-semibold mt-1 ${active ? "text-blue-600" : done ? "text-green-500" : "text-gray-400"}`}>
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`h-0.5 w-16 sm:w-24 mx-1 mb-4 transition-all ${done ? "bg-green-400" : "bg-gray-200"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}