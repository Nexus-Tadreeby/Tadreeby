export function Step3({ data, setData }) {
  const fields = [
    { label: "Full Name", value: `${data.firstName} ${data.lastName}` },
    { label: "Email", value: data.email },
    { label: "National ID", value: data.nationalId },
    { label: "Student Number", value: data.studentNumber },
    { label: "University", value: data.university },
    { label: "Specialization", value: data.specialization },
  ];

  return (
    <div className="space-y-5">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700 font-['Inter']">
        <p className="font-semibold mb-1">Almost done!</p>
        <p>Please verify your information and confirm your registration.</p>
      </div>

      <div className="space-y-3">
        {fields.map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center py-2.5 border-b border-gray-100 last:border-0">
            <span className="text-sm text-gray-500 font-medium font-['Inter']">{label}</span>
            <span className="text-sm text-gray-800 font-semibold font-['Inter']">
              {value || <span className="text-gray-400 font-normal italic">Not provided</span>}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-3 mt-2">
        <input
          type="checkbox"
          id="agree"
          checked={data.agreed}
          onChange={e => setData(d => ({ ...d, agreed: e.target.checked }))}
          className="mt-0.5 accent-blue-600 w-4 h-4"
        />
        <label htmlFor="agree" className="text-sm text-gray-600 font-['Inter']">
          I agree to the{" "}
          <a href="#" className="text-blue-600 underline">Terms of Service</a>{" "}
          and{" "}
          <a href="#" className="text-blue-600 underline">Privacy Policy</a>
        </label>
      </div>
    </div>
  );
}