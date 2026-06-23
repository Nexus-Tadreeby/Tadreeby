// Validation rules matching backend constraints
export const validators = {
  firstName: (value) => {
    if (!value) return "First name is required";
    if (value.length < 2 || value.length > 20) return "First name must be 2-20 characters";
    if (!/^[A-Za-z]+$/.test(value)) return "First name must contain only letters";
    return null;
  },
  
  lastName: (value) => {
    if (!value) return "Last name is required";
    if (value.length < 2 || value.length > 20) return "Last name must be 2-20 characters";
    if (!/^[A-Za-z]+$/.test(value)) return "Last name must contain only letters";
    return null;
  },
  
  email: (value) => {
    if (!value) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
    return null;
  },
  
  password: (value) => {
    if (!value) return "Password is required";
    if (value.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(value)) return "Password must contain at least one number";
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) return "Password must contain at least one special character";
    return null;
  },
  
  nationalId: (value) => {
    if (!value) return "National ID is required";
    if (!/^\d{9}$/.test(value)) return "National ID must be exactly 9 digits";
    return null;
  },
  
  studentNumber: (value) => {
    if (!value) return "Student number is required";
    if (!/^\d+$/.test(value)) return "Student number must contain only numbers";
    return null;
  },
  
  phone: (value) => {
    if (value && !/^\d{10,15}$/.test(value)) return "Phone number must be 10-15 digits";
    return null;
  },
  
  universityID: (value) => {
    if (!value) return "Please select your university";
    return null;
  },
  
  specialization: (value) => {
    if (!value) return "Please select your specialization";
    return null;
  },
};

// Validate a single field
export const validateField = (field, value) => {
  if (validators[field]) {
    return validators[field](value);
  }
  return null;
};

// Validate entire form
export const validateForm = (data) => {
  const errors = {};
  const fieldsToValidate = ['firstName', 'lastName', 'email', 'password', 'nationalId', 'studentNumber', 'universityID', 'specialization'];
  
  for (const field of fieldsToValidate) {
    const error = validateField(field, data[field]);
    if (error) {
      errors[field] = error;
    }
  }
  
  return errors;
};