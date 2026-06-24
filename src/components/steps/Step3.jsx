import { useState, useRef } from "react";
import { Label } from "../common/Label";
import { 
  CheckIcon, 
  InfoIcon, 
  WarnIcon,
  UploadIcon,
  CameraIcon,
  DocumentIcon,
  CloseIcon 
} from "../common/Icons";

// Universities mapping for display
const UNIVERSITIES = [
  { id: 1, name: "An-Najah National University" },
  { id: 2, name: "Birzeit University" },
  { id: 3, name: "Bethlehem University" },
  { id: 4, name: "Al-Quds University" },
  { id: 5, name: "Palestine Polytechnic University" }
];

export function Step3({ data, setData, validationErrors = {} }) {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [fileError, setFileError] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const getUniversityName = (id) => {
    if (!id) return "Not provided";
    const uni = UNIVERSITIES.find(u => u.id === parseInt(id));
    return uni ? uni.name : "Not provided";
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size must be under 5MB");
      setUploadStatus('error');
      setUploadedFile(null);
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setFileError("Please upload a JPG, PNG, or PDF file");
      setUploadStatus('error');
      setUploadedFile(null);
      return;
    }

    setFileError(null);
    setUploadedFile(file);
    setUploadStatus('success');
    
    // ✅ Only store the file
    setData(d => ({ 
      ...d, 
      verificationFile: file 
    }));
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadStatus(null);
    setFileError(null);
    setData(d => ({ 
      ...d, 
      verificationFile: null 
    }));
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const triggerCameraUpload = () => {
    cameraInputRef.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const fields = [
    { label: "Full Name", value: `${data.firstName} ${data.lastName}` },
    { label: "University", value: getUniversityName(data.universityID) },
    { label: "Student Number", value: data.studentNumber || "Not provided" },
    { label: "Specialization", value: data.specialization || "Not provided" },
  ];

  // ✅ Check file validation error
  const hasFileError = validationErrors?.verificationFile || fileError;

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
            <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
              hasFileError ? 'border-red-400 bg-red-50/50' : 'border-gray-300 hover:border-blue-400'
            }`}>
              <div className="flex flex-col items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  hasFileError ? 'bg-red-50' : 'bg-blue-50'
                }`}>
                  <UploadIcon className={`w-6 h-6 ${
                    hasFileError ? 'text-red-500' : 'text-blue-500'
                  }`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-['Inter']">
                    Drag & drop your file here, or
                  </p>
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
              {hasFileError && (
                <p className="text-xs text-red-500 mt-3 font-['Inter']">{fileError || "Please upload a verification document"}</p>
              )}
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
                  <span className="ml-2 px-2 py-0.5 bg-green-200 text-green-700 text-xs font-semibold rounded-full font-['Inter']">
                    Uploaded ✓
                  </span>
                </div>
                <button
                  onClick={removeFile}
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <CloseIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept=".jpg,.jpeg,.png,.pdf"
          onChange={handleFileUpload}
          className="hidden"
        />
        <input
          ref={cameraInputRef}
          type="file"
          accept="image/*"
          capture="environment"
          onChange={handleFileUpload}
          className="hidden"
        />

        {uploadStatus === 'error' && fileError && (
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
          checked={data.agreed}
          onChange={e => setData(d => ({ ...d, agreed: e.target.checked }))}
          className="mt-0.5 accent-blue-600 w-4 h-4 flex-shrink-0"
        />
        <label htmlFor="agree" className="text-sm text-gray-600 font-['Inter']">
          I agree to the{" "}
          <a href="#" className="text-blue-600 underline hover:text-blue-800 transition">Terms of Service</a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 underline hover:text-blue-800 transition">Privacy Policy</a>
        </label>
      </div>

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