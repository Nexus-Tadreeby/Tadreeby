import { useState } from "react";
import { InputField } from "../common/InputField";
import { Label } from "../common/Label";
import { CalendarIcon, BuildingIcon, CodeIcon, ChevronDown, InfoIcon } from "../common/Icons";
import { validateField } from "../../utils/validation";

const UNIVERSITIES = [
  { id: 1, name: "An-Najah National University" },
  { id: 2, name: "Birzeit University" },
  { id: 3, name: "Bethlehem University" },
  { id: 4, name: "Al-Quds University" },
  { id: 5, name: "Palestine Polytechnic University" }
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

export function Step2({ data, setData, validationErrors = {} }) { // ✅ Accept validationErrors prop
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setData(d => ({ ...d, [field]: value }));
    
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  // Combine local errors with validation errors from parent
  const getFieldError = (field) => {
    return errors[field] || validationErrors[field] || null;
  };

  return (
    <div className="space-y-5">
      <div>
        <Label icon={<CalendarIcon />} text="Student Number" />
        <InputField
          icon={<CalendarIcon />}
          placeholder="Your official student number"
          value={data.studentNumber}
          onChange={e => handleChange('studentNumber', e.target.value)}
        />
        {getFieldError('studentNumber') && (
          <p className="text-xs text-red-500 mt-1 font-['Inter']">{getFieldError('studentNumber')}</p>
        )}
        <p className="flex items-center gap-1.5 text-xs text-gray-400 mt-1.5 ml-1 font-['Inter']">
          <InfoIcon /> Your official student ID issued by your university
        </p>
      </div>

      <div>
        <Label icon={<BuildingIcon />} text="University" />
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><BuildingIcon /></span>
          <select
            value={data.universityID || ""}
            onChange={e => handleChange('universityID', e.target.value)}
            className={`w-full pl-10 pr-10 py-3 rounded-xl border ${
              getFieldError('universityID') ? 'border-red-500' : 'border-gray-200'
            } bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition font-['Inter']`}
          >
            <option value="">Select University</option>
            {UNIVERSITIES.map(u => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><ChevronDown /></span>
        </div>
        {getFieldError('universityID') && (
          <p className="text-xs text-red-500 mt-1 font-['Inter']">{getFieldError('universityID')}</p>
        )}
      </div>

      <div>
        <Label icon={<CodeIcon />} text="Technical Specialization" />
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><CodeIcon /></span>
          <select
            value={data.specialization}
            onChange={e => handleChange('specialization', e.target.value)}
            className={`w-full pl-10 pr-10 py-3 rounded-xl border ${
              getFieldError('specialization') ? 'border-red-500' : 'border-gray-200'
            } bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition font-['Inter']`}
          >
            <option value="">Select your specialization</option>
            {SPECIALIZATIONS.map(s => <option key={s}>{s}</option>)}
          </select>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"><ChevronDown /></span>
        </div>
        {getFieldError('specialization') && (
          <p className="text-xs text-red-500 mt-1 font-['Inter']">{getFieldError('specialization')}</p>
        )}
      </div>
    </div>
  );
}