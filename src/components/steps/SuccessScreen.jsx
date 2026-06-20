import { CheckIcon } from '../common/Icons';

export default function SuccessScreen({ data, onReset }) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <CheckIcon className="w-8 h-8 text-green-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2 font-['Inter']">Registration Complete!</h2>
      <p className="text-gray-500 text-sm font-['Inter']">Welcome to Tadreeby, {data.firstName}. Your account is being set up.</p>
      <button
        onClick={onReset}
        className="mt-6 text-blue-600 text-sm underline font-['Inter']"
      >
        Start over
      </button>
    </div>
  );
}