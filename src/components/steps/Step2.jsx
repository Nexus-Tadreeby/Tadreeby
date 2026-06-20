import { InputField } from "../common/InputField";
import { Label } from "../common/Label";
import { CalendarIcon, BuildingIcon, CodeIcon, ChevronDown, InfoIcon } from "../common/Icons";

const UNIVERSITIES = [
  "An-Najah National University",
  "Birzeit University",
  "Bethlehem University",
  "Al-Quds University",
  "Palestine Polytechnic University"
];

const SPECIALIZATIONS = [
  "Computer Science",
  "Software Engineering",
  "Information Technology",
  "Cybersecurity",
  "Data Science",
  "Artificial Intelligence",
  "Network Engineering"
];

export function Step2({ data, setData }) {
  return (
    <div className="space-y-5">
      <div>
        <Label icon={<CalendarIcon />} text="Student Number" />
        <InputField
          icon={<CalendarIcon />}
          placeholder="Your official student number"
          value={data.studentNumber}
          onChange={e => setData(d => ({ ...d, studentNumber: e.target.value }))}
        />
        <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-1.5 ml-1 font-['Inter']">
          <InfoIcon /> Your official student ID issued by your university
        </p>
      </div>

      <div>
        <Label icon={<BuildingIcon />} text="University" />
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><BuildingIcon /></span>
          <select
            value={data.university}
            onChange={e => setData(d => ({ ...d, university: e.target.value }))}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition font-['Inter']"
          >
            <option value="">Select University</option>
            {UNIVERSITIES.map(u => <option key={u}>{u}</option>)}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><ChevronDown /></span>
        </div>
      </div>

      <div>
        <Label icon={<CodeIcon />} text="Technical Specialization" />
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><CodeIcon /></span>
          <select
            value={data.specialization}
            onChange={e => setData(d => ({ ...d, specialization: e.target.value }))}
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition font-['Inter']"
          >
            <option value="">Select your specialization</option>
            {SPECIALIZATIONS.map(s => <option key={s}>{s}</option>)}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><ChevronDown /></span>
        </div>
      </div>
    </div>
  );
}