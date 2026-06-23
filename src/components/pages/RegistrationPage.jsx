import { useState } from "react";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { StepIndicator } from "../navigation/StepIndicator";
import { Step1 } from "../steps/Step1";
import { Step2 } from "../steps/Step2";
import { Step3 } from "../steps/Step3";
import { Button } from "../common/Button";
import { ArrowLeft, ArrowRight, SuccessIcon, ErrorIcon } from "../common/Icons";
import { authAPI } from "../../services/api";
import { validateForm, validateField } from "../../utils/validation";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  nationalId: "",
  studentNumber: "",
  universityID: "",
  specialization: "",
  phone: "",
  verificationDocument: "string",
  agreed: false,
};

const TITLES = ["Create Your Platform Account", "Your Academic Path", "Verify & Confirm"];
const SUBTITLES = [
  "Step 1 of 3 — Basic Information",
  "Step 2 of 3 — University & Specialization",
  "Step 3 of 3 — Review & Submit"
];

// Map UI fields to API fields - MATCHING BACKEND EXACTLY
const mapFormDataToAPI = (data) => {
  return {
    firstName: data.firstName,
    lastName: data.lastName,
    personalID: parseInt(data.nationalId) || 0,
    studentNumber: parseInt(data.studentNumber) || 0,
    phone: data.phone || "",
    email: data.email,
    password: data.password,
    universityId: parseInt(data.universityID) || 1,
    verificationDocument: data.verificationDocument || "string",
    major: data.specialization,
  };
};

function SuccessScreen({ data, onReset }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <SuccessIcon />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2 font-['Inter']">Registration Complete!</h2>
        <p className="text-gray-500 text-sm font-['Inter']">
          Welcome to Tadreeby, {data.firstName}! Your account has been created successfully.
        </p>
        <button
          onClick={onReset}
          className="mt-6 text-blue-600 text-sm underline font-['Inter']"
        >
          Start over
        </button>
      </div>
    </div>
  );
}

function ErrorScreen({ error, onRetry, onCancel }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <ErrorIcon />
        </div>
        <h2 className="text-2xl font-bold text-red-600 mb-2 font-['Inter']">Registration Failed</h2>
        <p className="text-gray-600 text-sm font-['Inter'] mb-4">
          {error || "Something went wrong. Please try again."}
        </p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={onRetry}
            className="px-6 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold hover:bg-blue-700 transition"
          >
            Try Again
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function RegistrationPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleNext = () => {
    // Validate current step before proceeding
    const fieldsToValidate = step === 1 
      ? ['firstName', 'lastName', 'email', 'password', 'nationalId']
      : ['studentNumber', 'universityID', 'specialization'];
    
    const errors = {};
    let hasError = false;
    
    for (const field of fieldsToValidate) {
      const error = validateField(field, data[field]);
      if (error) {
        errors[field] = error;
        hasError = true;
      }
    }
    
    setValidationErrors(errors);
    
    if (hasError) {
      return;
    }
    
    setValidationErrors({});
    
    if (step < 3) {
      setStep(s => s + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    setStep(s => s - 1);
    setValidationErrors({});
  };

  const handleReset = () => {
    setSubmitted(false);
    setError(null);
    setValidationErrors({});
    setStep(1);
    setData(INITIAL_STATE);
  };

  const handleSubmit = async () => {
    // Validate all fields before submitting
    const errors = validateForm(data);
    const errorFields = Object.keys(errors);
    
    if (errorFields.length > 0) {
      const errorMessages = errorFields.map(field => `${field}: ${errors[field]}`).join('\n');
      setError(`Please fix the following:\n${errorMessages}`);
      return;
    }

    if (!data.agreed) {
      setError("Please agree to the Terms of Service and Privacy Policy.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const payload = mapFormDataToAPI(data);
      console.log("📤 Sending registration data:", payload);
      console.log("📤 JSON:", JSON.stringify(payload, null, 2));

      const response = await authAPI.registerStudent(payload);
      
      console.log("✅ Registration successful:", response.data);
      setSubmitted(true);
    } catch (err) {
      console.error("❌ Registration error:", err);
      
      let errorMessage = "Registration failed. Please try again.";
      if (err.response) {
        console.error("❌ Response data:", err.response.data);
        errorMessage = err.response.data?.message || 
                      err.response.data?.error || 
                      `Server error: ${err.response.status}`;
        
        if (err.response.status === 400) {
          errorMessage = "Invalid input. Please check your information.";
        } else if (err.response.status === 409) {
          errorMessage = "An account with this email or ID already exists.";
        } else if (err.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
      } else if (err.request) {
        errorMessage = "Network error. Please check your connection.";
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Show error screen if registration failed
  if (error && !submitted) {
    return (
      <ErrorScreen 
        error={error} 
        onRetry={handleSubmit} 
        onCancel={() => {
          setError(null);
          setStep(1);
        }}
      />
    );
  }

  if (submitted) {
    return <SuccessScreen data={data} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <Header step={step} />

      <main className="pt-32 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_40px_rgba(37,99,235,0.13)] border border-blue-600/7 w-full max-w-2xl p-8 sm:p-10">
          <p className="font-['Inter'] font-bold text-[11px] leading-4 tracking-[1.5px] uppercase text-blue-600 mb-2">
            Student Registration
          </p>

          <h1 className="font-['Inter'] font-extrabold text-[22px] leading-[26px] tracking-[-0.4px] text-gray-900 mb-1">
            {TITLES[step - 1]}
          </h1>

          <p className="font-['Inter'] font-medium text-[13.5px] leading-5 text-gray-400 mb-7">
            {SUBTITLES[step - 1]}
          </p>

          <StepIndicator current={step} />

          {step === 1 && <Step1 data={data} setData={setData} validationErrors={validationErrors} />}
          {step === 2 && <Step2 data={data} setData={setData} validationErrors={validationErrors} />}
          {step === 3 && <Step3 data={data} setData={setData} />}

          <div className={`flex mt-8 ${step > 1 ? "justify-between" : "justify-end"}`}>
            {step > 1 && (
              <Button variant="secondary" onClick={handleBack} icon={<ArrowLeft />}>
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={isLoading || (step === 3 && !data.agreed)}
              icon={isLoading ? <LoadingSpinner /> : (step === 3 ? null : <ArrowRight />)}
            >
              {isLoading ? "Submitting..." : (step === 3 ? "Submit Registration" : "Next Step")}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Loading spinner component
function LoadingSpinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
    </svg>
  );
}