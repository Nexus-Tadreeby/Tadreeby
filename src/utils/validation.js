// src/utils/validation.js

export const validateField = (field, value) => {
  switch (field) {
    case 'firstName':
    case 'lastName':
      if (!value || value.trim().length < 2) {
        return `${field === 'firstName' ? 'First' : 'Last'} name must be at least 2 characters`;
      }
      if (!/^[a-zA-Z\s\-']+$/.test(value)) {
        return 'Name contains invalid characters';
      }
      return null;
      
    case 'email':
      if (!value) return 'Email is required';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Please enter a valid email address';
      }
      return null;
      
    case 'password':
      if (!value) return 'Password is required';
      if (value.length < 8) return 'Password must be at least 8 characters';
      if (!/[A-Z]/.test(value)) return 'Password must contain at least one uppercase letter';
      if (!/[a-z]/.test(value)) return 'Password must contain at least one lowercase letter';
      if (!/[0-9]/.test(value)) return 'Password must contain at least one number';
      if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
        return 'Password must contain at least one special character';
      }
      return null;
      
    case 'confirmPassword':
      // This is handled separately
      return null;
      
    case 'nationalId':
      if (!value) return 'National ID is required';
      if (!/^\d{9,}$/.test(value)) return 'National ID must be at least 9 digits';
      return null;
      
    case 'studentNumber':
      if (!value) return 'Student number is required';
      if (!/^\d+$/.test(value)) return 'Student number must contain only digits';
      return null;
      
    case 'universityID':
      if (!value) return 'Please select a university';
      return null;
      
    case 'specialization':
      if (!value) return 'Please select a specialization';
      return null;
      
    default:
      return null;
  }
};

export const validateForm = (data) => {
  const errors = {};
  const fields = ['firstName', 'lastName', 'email', 'password', 'nationalId', 
                  'studentNumber', 'universityID', 'specialization'];
  
  for (const field of fields) {
    const error = validateField(field, data[field]);
    if (error) {
      errors[field] = error;
    }
  }
  
  // Confirm password validation
  if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return errors;
};