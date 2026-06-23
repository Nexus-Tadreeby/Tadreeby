import { useState } from "react";
import { InputField } from "../common/InputField";
import { Label } from "../common/Label";
import { UserIcon, MailIcon, LockIcon, CardIcon, PhoneIcon, EyeIcon, WarnIcon, CheckIcon } from "../common/Icons";
import { validateField } from "../../utils/validation";

export function Step1({ data, setData, validationErrors = {} }) { // ✅ Accept validationErrors
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  const [errors, setErrors] = useState({});

  // Password validation checks
  const passwordChecks = {
    length: (value) => value?.length >= 8 || false,
    uppercase: (value) => /[A-Z]/.test(value || ''),
    lowercase: (value) => /[a-z]/.test(value || ''),
    number: (value) => /[0-9]/.test(value || ''),
    special: (value) => /[!@#$%^&*(),.?":{}|<>]/.test(value || ''),
  };

  const handleChange = (field, value) => {
    setData(d => ({ ...d, [field]: value }));
    
    // Real-time validation
    const error = validateField(field, value);
    setErrors(prev => ({
      ...prev,
      [field]: error
    }));

    // Check if confirm password matches when password changes
    if (field === 'password' && data.confirmPassword) {
      const confirmError = value !== data.confirmPassword ? "Passwords do not match" : null;
      setErrors(prev => ({
        ...prev,
        confirmPassword: confirmError
      }));
    }

    // Check if password matches when confirm password changes
    if (field === 'confirmPassword') {
      const confirmError = value !== data.password ? "Passwords do not match" : null;
      setErrors(prev => ({
        ...prev,
        confirmPassword: confirmError
      }));
    }
  };

  const getPasswordCheckIcon = (checkKey) => {
    const checkFn = passwordChecks[checkKey];
    if (!checkFn) return null;
    const isValid = checkFn(data.password || '');
    return isValid ? (
      <span className="text-green-500">
        <CheckIcon />
      </span>
    ) : (
      <span className="text-red-400">✕</span>
    );
  };

  // ✅ Combine local errors with validation errors from parent
  const getFieldError = (field) => {
    return errors[field] || validationErrors[field] || null;
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-3 bg-orange-50 border border-orange-200 rounded-xl p-4">
        <WarnIcon />
        <p className="text-sm text-orange-700 font-['Inter']">
          <span className="font-bold">Important : </span>
          Your name, email, and ID cannot be changed later.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label icon={<UserIcon />} text="First Name" />
          <InputField
            icon={<UserIcon />}
            placeholder="e.g. Afnan"
            value={data.firstName}
            onChange={e => handleChange('firstName', e.target.value)}
          />
          {getFieldError('firstName') && (
            <p className="text-xs text-red-500 mt-1 font-['Inter']">{getFieldError('firstName')}</p>
          )}
        </div>
        <div>
          <Label icon={<UserIcon />} text="Last Name" />
          <InputField
            icon={<UserIcon />}
            placeholder="e.g. Kullab"
            value={data.lastName}
            onChange={e => handleChange('lastName', e.target.value)}
          />
          {getFieldError('lastName') && (
            <p className="text-xs text-red-500 mt-1 font-['Inter']">{getFieldError('lastName')}</p>
          )}
        </div>
      </div>

      <div>
        <Label icon={<CardIcon />} text="ID Number" sub="(National ID)" />
        <InputField
          icon={<CardIcon />}
          placeholder="Enter your national ID number"
          value={data.nationalId}
          onChange={e => handleChange('nationalId', e.target.value)}
        />
        {getFieldError('nationalId') && (
          <p className="text-xs text-red-500 mt-1 font-['Inter']">{getFieldError('nationalId')}</p>
        )}
      </div>

      <div>
        <Label icon={<MailIcon />} text="Email Address" />
        <InputField
          icon={<MailIcon />}
          placeholder="name@example.com"
          type="email"
          value={data.email}
          onChange={e => handleChange('email', e.target.value)}
        />
        {getFieldError('email') && (
          <p className="text-xs text-red-500 mt-1 font-['Inter']">{getFieldError('email')}</p>
        )}
      </div>

      <div>
        <Label icon={<PhoneIcon />} text="Phone Number" />
        <InputField
          icon={<PhoneIcon />}
          placeholder="e.g. 0597377872"
          value={data.phone}
          onChange={e => handleChange('phone', e.target.value)}
        />
        {getFieldError('phone') && (
          <p className="text-xs text-red-500 mt-1 font-['Inter']">{getFieldError('phone')}</p>
        )}
      </div>

      {/* Password and Confirm Password Side by Side */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label icon={<LockIcon />} text="Password" />
          <InputField
            icon={<LockIcon />}
            placeholder="Minimum 8 characters"
            type={showPass ? "text" : "password"}
            value={data.password}
            onChange={e => handleChange('password', e.target.value)}
            rightIcon={<EyeIcon show={showPass} onClick={() => setShowPass(s => !s)} />}
          />
          {getFieldError('password') && (
            <p className="text-xs text-red-500 mt-1 font-['Inter']">{getFieldError('password')}</p>
          )}
        </div>

        <div>
          <Label icon={<LockIcon />} text="Confirm Password" />
          <InputField
            icon={<LockIcon />}
            placeholder="Re-enter your password"
            type={showConfirmPass ? "text" : "password"}
            value={data.confirmPassword || ""}
            onChange={e => handleChange('confirmPassword', e.target.value)}
            rightIcon={<EyeIcon show={showConfirmPass} onClick={() => setShowConfirmPass(s => !s)} />}
          />
          {getFieldError('confirmPassword') && (
            <p className="text-xs text-red-500 mt-1 font-['Inter']">{getFieldError('confirmPassword')}</p>
          )}
          {data.confirmPassword && data.password && data.password === data.confirmPassword && (
            <p className="flex items-center gap-1 text-xs text-green-500 mt-1 font-['Inter']">
              <CheckIcon /> Passwords match
            </p>
          )}
        </div>
      </div>

      {/* Password Requirements - Full Width */}
      <div className="mt-2 p-3 bg-blue-50/70 border border-blue-200/70 rounded-lg">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
          <p className="flex items-center gap-2 text-xs font-['Inter']">
            {getPasswordCheckIcon('length')}
            <span className={data.password?.length >= 8 ? "text-green-600" : "text-gray-500"}>
              Must contain at least 8 characters
            </span>
          </p>
          <p className="flex items-center gap-2 text-xs font-['Inter']">
            {getPasswordCheckIcon('uppercase')}
            <span className={/[A-Z]/.test(data.password || '') ? "text-green-600" : "text-gray-500"}>
              At least one uppercase letter
            </span>
          </p>
          <p className="flex items-center gap-2 text-xs font-['Inter']">
            {getPasswordCheckIcon('lowercase')}
            <span className={/[a-z]/.test(data.password || '') ? "text-green-600" : "text-gray-500"}>
              At least one lowercase letter
            </span>
          </p>
          <p className="flex items-center gap-2 text-xs font-['Inter']">
            {getPasswordCheckIcon('number')}
            <span className={/[0-9]/.test(data.password || '') ? "text-green-600" : "text-gray-500"}>
              At least one number
            </span>
          </p>
          <p className="flex items-center gap-2 text-xs font-['Inter'] col-span-2">
            {getPasswordCheckIcon('special')}
            <span className={/[!@#$%^&*(),.?":{}|<>]/.test(data.password || '') ? "text-green-600" : "text-gray-500"}>
              At least one special character (!@#$%^&*)
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}