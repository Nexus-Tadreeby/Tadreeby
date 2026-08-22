import { useState, useEffect } from "react";
import { InputField } from "../common/InputField";
import { Label } from "../common/Label";
import { CalendarIcon, BuildingIcon, CodeIcon, ChevronDown, InfoIcon } from "../common/Icons";
import { validateField } from "../../utils/validation";
import { authAPI } from "../../services/api";

const UNIVERSITIES = [
  { id: 1, name: "Al Azhar University - Gaza" },
  { id: 2, name: "Islamic University of Gaza" },
  { id: 3, name: "Al-Aqsa University" },
  { id: 4, name: "University of Palestine" },
  { id: 5, name: "Gaza University" },
  { id: 6, name: "Israa University" },
  { id: 7, name: "Al-Quds Open University" },
  { id: 8, name: "University College of Applied Sciences (UCAS)" }
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

export function Step2({ data, setData, validationErrors = {} }) { //Accept validationErrors prop
  const [errors, setErrors] = useState({});
  const [liveCheckErrors, setLiveCheckErrors] = useState({});
  const [studentNumberAvailability, setStudentNumberAvailability] = useState(null);
  const [isCheckingStudentNumber, setIsCheckingStudentNumber] = useState(false);

  const handleChange = (field, value) => {
    setData(d => ({ ...d, [field]: value }));

    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));
  };

  useEffect(() => {
    const studentNumber = data.studentNumber?.trim();
    const universityId = data.universityID;

    if (!studentNumber || !universityId || !/^\d+$/.test(studentNumber) || studentNumber.length < 7 || studentNumber.length > 15) {
      setStudentNumberAvailability(null);
      setLiveCheckErrors(prev => ({ ...prev, studentNumber: null }));
      setIsCheckingStudentNumber(false);
      return;
    }

    let active = true;
    setIsCheckingStudentNumber(true);
    const timeout = setTimeout(async () => {
      try {
        const result = await authAPI.checkStudentNumberAvailability(Number(studentNumber), Number(universityId));
        if (!active) return;
        const isAvailable = result?.available === true;
        setStudentNumberAvailability(isAvailable ? true : false);
        setLiveCheckErrors(prev => ({
          ...prev,
          studentNumber: isAvailable ? null : result.message || 'This student number is already in use for this university.',
        }));
      } catch (error) {
        if (!active) return;
        setStudentNumberAvailability(null);
        setLiveCheckErrors(prev => ({ ...prev, studentNumber: null }));
      } finally {
        if (active) setIsCheckingStudentNumber(false);
      }
    }, 500);

    return () => {
      active = false;
      clearTimeout(timeout);
    };
  }, [data.studentNumber, data.universityID]);

  const getFieldStatus = (field) => {
    if (field === 'studentNumber') {
      const studentNumber = data.studentNumber?.trim();
      const universityId = data.universityID;
      if (!studentNumber || !universityId || !/^\d+$/.test(studentNumber) || studentNumber.length < 7 || studentNumber.length > 15) {
        return 'idle';
      }
      if (isCheckingStudentNumber) return 'checking';
      if (studentNumberAvailability === true) return 'success';
      if (liveCheckErrors.studentNumber) return 'error';
      return 'idle';
    }

    return 'idle';
  };

  // Combine local errors with live checks and validation errors from parent
  const getFieldError = (field) => {
    return errors[field] || validationErrors[field] || liveCheckErrors[field] || null;
  };

  return (
    <div className="space-y-5">
      <div>
        <Label icon={<CalendarIcon />} text="Student Number" />
        <p className="flex items-center gap-1.5 text-xs text-orange-400 mt-1.5 ml-1 font-['Inter']">
          <InfoIcon /> Your official student ID issued by your university
        </p>
        <InputField
          id="studentNumber"
          name="studentNumber"
          icon={<CalendarIcon />}
          placeholder="Your official student number"
          value={data.studentNumber}
          onChange={e => handleChange('studentNumber', e.target.value)}
          maxLength={15}
          status={getFieldStatus('studentNumber')}
        />
        {isCheckingStudentNumber && (
          <p className="text-xs text-blue-500 mt-1 font-['Inter']">Checking student number...</p>
        )}
        {getFieldError('studentNumber') && (
          <p className="text-xs text-red-500 mt-1 font-['Inter']">{getFieldError('studentNumber')}</p>
        )}
      </div>

      <div>
        <Label icon={<BuildingIcon />} text="University" />
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><BuildingIcon /></span>
          <select
            id="universityID"
            name="universityID"
            value={data.universityID || ""}
            onChange={e => handleChange('universityID', e.target.value)}
            className={`w-full pl-10 pr-10 py-3 rounded-xl border ${getFieldError('universityID') ? 'border-red-500' : 'border-gray-200'
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
            id="specialization"
            name="specialization"
            value={data.specialization}
            onChange={e => handleChange('specialization', e.target.value)}
            className={`w-full pl-10 pr-10 py-3 rounded-xl border ${getFieldError('specialization') ? 'border-red-500' : 'border-gray-200'
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