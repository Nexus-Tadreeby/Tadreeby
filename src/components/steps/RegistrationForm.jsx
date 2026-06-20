import StepIndicator from '../navigation/StepIndicator';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { ArrowLeftIcon, ArrowRightIcon } from '../common/Icons';
import { STEP_TITLES, STEP_SUBTITLES } from '../../constants';

export default function RegistrationForm({ 
  step, 
  data, 
  setData, 
  onNext, 
  onBack, 
  isFirstStep, 
  isLastStep, 
  canSubmit,
  errors = {}
}) {
  return (
    <div className="bg-white rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.06),0_8px_40px_rgba(37,99,235,0.13)] border border-blue-600/7 w-full max-w-2xl p-8 sm:p-10">
      <div className="font-['Inter'] font-bold text-[11px] leading-4 tracking-[1.5px] uppercase text-blue-600 mb-2">
        Student Registration
      </div>
      
      <h1 className="font-['Inter'] font-extrabold text-[22px] leading-[26px] tracking-[-0.4px] text-gray-900 mb-1">
        {STEP_TITLES[step - 1] || "Registration"}
      </h1>
      
      <p className="font-['Inter'] font-medium text-[13.5px] leading-5 text-gray-400 mb-7">
        {STEP_SUBTITLES[step - 1] || `Step ${step} of 3`}
      </p>

      <StepIndicator current={step} />

      {step === 1 && <Step1 data={data} setData={setData} />}
      {step === 2 && <Step2 data={data} setData={setData} />}
      {step === 3 && <Step3 data={data} setData={setData} />}

      {/* Display validation errors */}
      {Object.keys(errors).length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          {Object.values(errors).map((error, index) => (
            <p key={index} className="text-sm text-red-600 font-['Inter']">
              • {error}
            </p>
          ))}
        </div>
      )}

      <div className={`flex mt-8 ${!isFirstStep ? "justify-between" : "justify-end"}`}>
        {!isFirstStep && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition font-['Inter']"
          >
            <ArrowLeftIcon />
            Back
          </button>
        )}
        <button
          onClick={onNext}
          disabled={isLastStep && !canSubmit}
          className="flex items-center gap-2 px-7 py-3 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold shadow-[0_4px_16px_rgba(249,115,22,0.3)] hover:shadow-lg transition font-['Inter']"
        >
          {isLastStep ? "Submit Registration" : "Next Step"}
          {!isLastStep && <ArrowRightIcon />}
        </button>
      </div>
    </div>
  );
}