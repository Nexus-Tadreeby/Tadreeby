
// Step3.jsx – Circular upload progress

import { useState, useRef, useEffect } from "react";
import { Label } from "../common/Label";
import {
  CheckIcon,
  InfoIcon,
  WarnIcon,
  UploadIcon,
  DocumentIcon,
  CloseIcon
} from "../common/Icons";

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

export function Step3({ data, setData, validationErrors = {} }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [localFileError, setLocalFileError] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
  // If the parent already has a file, use it to populate local state
  if (data.verificationFile && data.verificationFile instanceof File) {
    setUploadedFile(data.verificationFile);
    setUploadProgress(100);
    setIsUploading(false);
    setLocalFileError(null);
  } else {
    // If the parent file is cleared, reset local state
    setUploadedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
    setLocalFileError(null);
  }
}, [data.verificationFile]);

  const getUniversityName = (id) => {
    if (!id) return "Not provided";
    const uni = UNIVERSITIES.find(u => u.id === parseInt(id));
    return uni ? uni.name : "Not provided";
  };

  // ─── Simulated upload with circle progress ────────────────────────
  useEffect(() => {
    if (!isUploading) return;

    setUploadProgress(0);
    let interval = setInterval(() => {
      setUploadProgress(prev => {
        const next = prev + Math.random() * 12 + 3;
        return next >= 100 ? 100 : next;
      });
    }, 200);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      setIsUploading(false);
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [isUploading]);

  // ─── File selection ───────────────────────────────────────────────
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLocalFileError(null);

    if (file.size > 5 * 1024 * 1024) {
      setLocalFileError("File size must be under 5MB");
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setLocalFileError("Please upload a JPG, PNG, or PDF file");
      return;
    }

    // Start upload animation
    setUploadedFile(file);
    setUploadProgress(0);
    setIsUploading(true);
    setData(d => ({ ...d, verificationFile: file }));
  };

  const removeFile = () => {
    setUploadedFile(null);
    setLocalFileError(null);
    setUploadProgress(0);
    setIsUploading(false);
    setData(d => ({ ...d, verificationFile: null }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const getFileError = () => {
    if (localFileError) return localFileError;
    if (validationErrors?.verificationFile) return validationErrors.verificationFile;
    return null;
  };

  const fileError = getFileError();
  const hasFileError = !!fileError;

  const showProgress = isUploading && uploadProgress > 0 && uploadProgress < 100;
  const showComplete = !isUploading && uploadProgress === 100;

  // ─── Circle SVG component ─────────────────────────────────────────
  const CircleProgress = ({ percentage, size = 48 }) => {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            className="text-gray-200"
            strokeWidth="3"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className="text-blue-600 transition-all duration-300 ease-out"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
        </svg>
        <span className="absolute text-[10px] font-bold text-blue-700 font-['Inter']">
          {Math.round(percentage)}%
        </span>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700 font-['Inter']">
        <p className="font-semibold mb-1">📄 Verification Required</p>
        <p>Upload proof of your university enrolment to complete registration.</p>
      </div>

      {/* Requirements Box */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <p className="text-xs font-semibold text-gray-700 mb-2 font-['Inter']">The uploaded document must contain the following information:</p>
        <div className="grid grid-cols-2 gap-1 text-xs text-gray-600 font-['Inter']">
          <p className="flex items-center gap-1.5">✓ Full Student Name</p>
          <p className="flex items-center gap-1.5">✓ University Name</p>
          <p className="flex items-center gap-1.5">✓ Student Number</p>
          <p className="flex items-center gap-1.5">✓ Technical Specialization</p>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-500 font-['Inter'] flex items-center gap-1.5">
            <InfoIcon className="w-3 h-3" /> Accepted: University Student Card, Screenshot from Student Portal
          </p>
        </div>
      </div>

      {/* Upload Section */}
      <div>
        <Label text="Upload University Card" sub="JPG, PNG or PDF (Max. 5MB)" />
        <span className="text-red-500 text-xs ml-1 font-['Inter']">*</span>

        <div className="mt-1.5">
          {!uploadedFile ? (
            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${hasFileError ? 'border-red-400 bg-red-50/50' : 'border-gray-300 hover:border-blue-400'}`}>
              <div className="flex flex-col items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${hasFileError ? 'bg-red-50' : 'bg-blue-50'}`}>
                  <UploadIcon className={`w-6 h-6 ${hasFileError ? 'text-red-500' : 'text-blue-500'}`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-['Inter']">Drag & drop your file here, or</p>
                  <div className="flex gap-2 mt-2 justify-center">
                    <button
                      onClick={triggerFileUpload}
                      className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 transition font-['Inter']"
                    >
                      Browse Files
                    </button>
                  </div>
                </div>
              </div>
              {hasFileError && <p className="text-xs text-red-500 mt-3 font-['Inter']">{fileError}</p>}
            </div>
          ) : (
            <div className="border border-green-200 bg-green-50 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <DocumentIcon className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800 font-['Inter']">{uploadedFile.name}</p>
                    <p className="text-xs text-gray-500 font-['Inter']">{formatFileSize(uploadedFile.size)}</p>
                  </div>
                  {/* ─── Show either progress circle or uploaded badge ─── */}
                  {showProgress ? (
                    <div className="ml-2">
                      <CircleProgress percentage={uploadProgress} />
                    </div>
                  ) : showComplete ? (
                    <span className="ml-2 px-2 py-0.5 bg-green-200 text-green-700 text-xs font-semibold rounded-full font-['Inter']">
                      Uploaded ✓
                    </span>
                  ) : (
                    <span className="ml-2 px-2 py-0.5 bg-green-200 text-green-700 text-xs font-semibold rounded-full font-['Inter']">
                      Uploaded ✓
                    </span>
                  )}
                </div>
                <button
                  onClick={removeFile}
                  className="text-gray-400 hover:text-red-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isUploading}
                  aria-label="Remove file"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        <input
          id="verification-file-input"
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileUpload}
          className="hidden"
        />

        {hasFileError && (
          <div className="mt-2 flex items-start gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
            <WarnIcon className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-700 font-['Inter']">{fileError}</p>
          </div>
        )}

        <p className="text-xs text-gray-400 mt-2 font-['Inter'] flex items-center gap-1.5">
          <InfoIcon className="w-3 h-3" /> Make sure the document is clear and all information is visible.
        </p>
      </div>

      {/* Terms Agreement */}
      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="agree"
          checked={data.agreed || false}
          onChange={e => setData(d => ({ ...d, agreed: e.target.checked }))}
          className="mt-0.5 accent-blue-600 w-4 h-4 flex-shrink-0"
          disabled={isUploading}
        />
        <label htmlFor="agree" className={`text-sm font-['Inter'] ${isUploading ? 'text-gray-400' : 'text-gray-600'}`}>
          I agree to the{" "}
          <a href="/terms-privacy" className="text-blue-600 underline hover:text-blue-800 transition">Terms of Service</a>{" "}
          and{" "}
          <a href="/terms-privacy#part-2" className="text-blue-600 underline hover:text-blue-800 transition">Privacy Policy</a>
        </label>
      </div>

      {/* Warning if no file */}
      {!uploadedFile && !hasFileError && (
        <div className="flex items-start gap-2 bg-orange-50 border border-orange-200 rounded-lg p-3">
          <WarnIcon className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-orange-700 font-['Inter']">
            <span className="font-semibold">Note:</span> Your registration will not be complete without uploading a verification document.
          </p>
        </div>
      )}
    </div>
  );
}