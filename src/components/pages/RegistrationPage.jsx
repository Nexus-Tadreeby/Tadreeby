import { useState } from "react";
import { Header } from "../layout/Header";
import { Footer } from "../layout/Footer";
import { StepIndicator } from "../navigation/StepIndicator";
import { Step1 } from "../steps/Step1";
import { Step2 } from "../steps/Step2";
import { Step3 } from "../steps/Step3";
import { Button } from "../common/Button";
import { ArrowLeft, ArrowRight, SuccessIcon } from "../common/Icons";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  nationalId: "",
  studentNumber: "",
  university: "",
  specialization: "",
  agreed: false,
};

const TITLES = ["Create Your Platform Account", "Your Academic Path", "Verify & Confirm"];
const SUBTITLES = [
  "Step 1 of 3 — Basic Information",
  "Step 2 of 3 — University & Specialization",
  "Step 3 of 3 — Review & Submit"
];

function SuccessScreen({ data, onReset }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-lg p-10 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <SuccessIcon />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2 font-['Inter']">Registration Complete!</h2>
        <p className="text-gray-500 text-sm font-['Inter']">
          Welcome to Tadreeby, {data.firstName}. Your account is being set up.
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

export function RegistrationPage() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState(INITIAL_STATE);
  const [submitted, setSubmitted] = useState(false);

  const handleNext = () => {
    if (step < 3) setStep(s => s + 1);
    else setSubmitted(true);
  };

  const handleBack = () => setStep(s => s - 1);

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    setData(INITIAL_STATE);
  };

  if (submitted) {
    return <SuccessScreen data={data} onReset={handleReset} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex flex-col">
      <Header step={step} />

      <main className="pt-24 flex items-center justify-center px-4 py-8">
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

          {step === 1 && <Step1 data={data} setData={setData} />}
          {step === 2 && <Step2 data={data} setData={setData} />}
          {step === 3 && <Step3 data={data} setData={setData} />}

          <div className={`flex mt-8 ${step > 1 ? "justify-between" : "justify-end"}`}>
            {step > 1 && (
              <Button variant="secondary" onClick={handleBack} icon={<ArrowLeft />}>
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={step === 3 && !data.agreed}
              icon={step === 3 ? null : <ArrowRight />}
            >
              {step === 3 ? "Submit Registration" : "Next Step"}
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}