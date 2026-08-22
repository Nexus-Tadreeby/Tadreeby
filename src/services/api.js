// src/services/api.js
// const API_BASE_URL = 'https://tadreeby-api.onrender.com';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:6060';

const apiRequest = async (endpoint, options = {}) => {
  const token = localStorage.getItem('accessToken');

  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...options.headers,
  };

  if (options.body instanceof FormData) {
    delete headers['Content-Type'];
  }

  const config = {
    ...options,
    headers,
  };

  try {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`📡 Sending ${options.method || 'GET'} request to: ${url}`);

    const response = await fetch(url, config);


    const isLoginRequest = endpoint.startsWith('/auth/login');

    // ✅ Handle 401 Unauthorized – token expired/invalid
    // Skip redirect for a failed login attempt: invalid credentials should stay on the login page.
    if (response.status === 401 && !isLoginRequest) {

      // Clear authentication data
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');

      // Redirect to login page (using window.location for non-React context)
      window.location.href = '/login';

      // Throw an error to stop further execution
      throw new Error('Session expired. Please log in again.');
    }

    let responseData;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      responseData = await response.json();
    } else {
      responseData = await response.text();
    }

    if (!response.ok) {
      throw {
        status: response.status,
        data: responseData,
        message: responseData?.message || responseData?.error || `HTTP error ${response.status}`
      };
    }

    return responseData;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};


export const authAPI = {
  registerStudent: async (formData) => {
    return apiRequest('/auth/register/student', {
      method: 'POST',
      body: formData,
    });
  },

  login: async (credentials) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  checkEmailAvailability: async (email) => {
    return apiRequest('/auth/check-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },

  checkNationalIdAvailability: async (personalID) => {
    return apiRequest('/auth/check-national-id', {
      method: 'POST',
      body: JSON.stringify({ personalID }),
    });
  },

  checkStudentNumberAvailability: async (studentNumber, universityId) => {
    return apiRequest('/auth/check-student-number', {
      method: 'POST',
      body: JSON.stringify({ studentNumber, universityId }),
    });
  },
};

export const opportunitiesAPI = {
  getAvailableOpportunities: async () => {
    return apiRequest('/student/opportunities', {
      method: 'GET',
    });
  },

  getOpportunityDetails: async (opportunityId) => {
    return apiRequest(`/student/opportunities/${opportunityId}`, {
      method: 'GET',
    });
  },

  applyForOpportunity: async (opportunityId) => {
    return apiRequest(`/student/opportunities/${opportunityId}/apply`, {
      method: 'POST',
    });
  },

  getInternshipDetails: async (internshipId) => {
    return apiRequest(`/student/internships/${internshipId}`, {
      method: 'GET',
    });
  },

  getMyInternships: async () => {
    return apiRequest('/student/internships', {
      method: 'GET',
    });
  },
};

// ─── Helper: convert File to base64 ──────────────────────────────────
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// ─── Profile API ──────────────────────────────────────────────────────
export const profileAPI = {
  getDocumentUrl: (document) => {
    if (!document) return null;

    // Newly uploaded files are stored as data URLs. Existing registrations
    // store a filename in the pending uploads directory.
    if (/^(data:|blob:|https?:\/\/)/i.test(document)) return document;
    return `${API_BASE_URL}/uploads/pending/${encodeURIComponent(document)}`;
  },

  // Get profile – convert university object to string
  getProfile: async () => {
    const response = await apiRequest('/student/profile', { method: 'GET' });
    const data = response.data;
    // Convert university from { id, name, shortCode } to just the name
    if (data.university && typeof data.university === 'object') {
      data.university = data.university.name || 'Not provided';
    }
    return data;
  },

  // Update profile (text fields)
  updateProfile: async (data) => {
    const response = await apiRequest('/student/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
    return response.data;
  },

  // Upload avatar – simulate progress (since backend expects base64 via PATCH)
  uploadAvatar: async (file, onProgress) => {
    if (onProgress) onProgress(0);
    const base64 = await fileToBase64(file);
    if (onProgress) onProgress(50);
    const result = await profileAPI.updateProfile({ profileImage: base64 });
    if (onProgress) onProgress(100);
    return result;
  },

  // Upload CV as multipart form data to avoid JSON/base64 request-size limits.
  uploadCV: async (file, onProgress) => {
    if (onProgress) onProgress(0);
    const formData = new FormData();
    formData.append('cvFile', file);
    if (onProgress) onProgress(50);
    const response = await apiRequest('/student/profile/cv', {
      method: 'PATCH',
      body: formData,
    });
    if (onProgress) onProgress(100);
    return response.data;
  },

  removeCV: async () => {
    const response = await apiRequest('/student/profile/cv', {
      method: 'DELETE',
    });
    return response.data;
  },

  // Replacing a rejected document makes the verification pending again.
  reuploadVerificationDocument: async (file) => {
    const verificationDocument = await fileToBase64(file);
    return apiRequest('/student/profile/reupload-document', {
      method: 'PATCH',
      body: JSON.stringify({ verificationDocument }),
    });
  },

  // Skills
  getSkills: async () => {
    const response = await apiRequest('/student/skills', { method: 'GET' });
    return response.data;
  },
  updateSkills: async (skills) => {
    const response = await apiRequest('/student/skills', {
      method: 'PATCH',
      body: JSON.stringify({ skills }),
    });
    return response.data;
  },
  addSkill: async (skill) => {
    const response = await apiRequest('/student/skills/add', {
      method: 'POST',
      body: JSON.stringify({ skill }),
    });
    return response.data;
  },
  removeSkill: async (skill) => {
    const response = await apiRequest(`/student/skills/${encodeURIComponent(skill)}`, {
      method: 'DELETE',
    });
    return response.data;
  },
};

// // src/services/api.js

// const API_BASE_URL = 'http://localhost:6060';

// const apiRequest = async (endpoint, options = {}) => {
//   const token = localStorage.getItem('accessToken');
  
//   // For FormData, do NOT set Content-Type – browser will set it with boundary
//   const headers = {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json',
//     ...(token && { 'Authorization': `Bearer ${token}` }),
//     ...options.headers,
//   };

//   // If body is FormData, remove any 'Content-Type' that may have been set
//   if (options.body instanceof FormData) {
//     delete headers['Content-Type'];
//   }

//   const config = {
//     ...options,
//     headers,
//   };

//   try {
//     const url = `${API_BASE_URL}${endpoint}`;
//     console.log(`📡 Sending ${options.method || 'GET'} request to: ${url}`);
    
//     const response = await fetch(url, config);
    
//     let responseData;
//     const contentType = response.headers.get('content-type');
//     if (contentType && contentType.includes('application/json')) {
//       responseData = await response.json();
//     } else {
//       responseData = await response.text();
//     }
    
//     if (!response.ok) {
//       throw {
//         status: response.status,
//         data: responseData,
//         message: responseData?.message || responseData?.error || `HTTP error ${response.status}`
//       };
//     }
    
//     return responseData;
//   } catch (error) {
//     console.error('API Error:', error);
//     throw error;
//   }
// };

// export const authAPI = {
//   registerStudent: async (formData) => {
//     // formData is already a FormData object
//     return apiRequest('/auth/register/student', {
//       method: 'POST',
//       body: formData,
//       // no extra headers – we want multipart/form-data
//     });
//   },
  
//   login: async (credentials) => {
//     return apiRequest('/auth/login', {
//       method: 'POST',
//       body: JSON.stringify(credentials),
//     });
//   },
  
//   // ... other methods remain unchanged
// };


// // ─── Helper: convert File to base64 ──────────────────────────────────
// const fileToBase64 = (file) => {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = (error) => reject(error);
//   });
// };

// // ─── Profile API (matches your backend) ──────────────────────────────
// export const profileAPI = {
//   // Get profile
//   getProfile: async () => {
//     const response = await apiRequest('/student/profile', { method: 'GET' });
//     return response.data; // your backend returns { success: true, data: {...} }
//   },

//   // Update profile (JSON) – used for text fields like phone, recoveryEmail, gpa
//   updateProfile: async (data) => {
//     const response = await apiRequest('/student/profile', {
//       method: 'PATCH',
//       body: JSON.stringify(data),
//     });
//     return response.data;
//   },

//   // Upload avatar – convert file to base64, then send it via updateProfile
//   uploadAvatar: async (file, onProgress) => {
//     // First, convert file to base64 (we'll simulate progress since we can't track upload progress with JSON)
//     // If you have a separate upload endpoint, you'd use XMLHttpRequest here.
//     // For now, we convert to base64 and send via updateProfile.
//     if (onProgress) onProgress(0);
//     const base64 = await fileToBase64(file);
//     if (onProgress) onProgress(50);
//     const result = await profileAPI.updateProfile({ profileImage: base64 });
//     if (onProgress) onProgress(100);
//     return result;
//   },

//   // Upload CV – convert file to base64, then send via updateProfile
//   uploadCV: async (file, onProgress) => {
//     if (onProgress) onProgress(0);
//     const base64 = await fileToBase64(file);
//     if (onProgress) onProgress(50);
//     const result = await profileAPI.updateProfile({ cvFile: base64 });
//     if (onProgress) onProgress(100);
//     return result;
//   },

//   // Skills endpoints (if you need them)
//   getSkills: async () => {
//     const response = await apiRequest('/student/skills', { method: 'GET' });
//     return response.data;
//   },
//   updateSkills: async (skills) => {
//     const response = await apiRequest('/student/skills', {
//       method: 'PATCH',
//       body: JSON.stringify({ skills }),
//     });
//     return response.data;
//   },
//   addSkill: async (skill) => {
//     const response = await apiRequest('/student/skills/add', {
//       method: 'POST',
//       body: JSON.stringify({ skill }),
//     });
//     return response.data;
//   },
//   removeSkill: async (skill) => {
//     const response = await apiRequest(`/student/skills/${encodeURIComponent(skill)}`, {
//       method: 'DELETE',
//     });
//     return response.data;
//   },
// };
