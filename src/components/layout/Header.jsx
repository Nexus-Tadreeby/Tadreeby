import logo from "../../assets/logo.svg";
export function Header({ step }) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50  flex items-center justify-between px-8 py-5">
      <div>
        <img src={logo} alt="Tadreeby Logo" className=" h-10 mb-1" />
        <div className="text-xs text-gray-400 mt-0.5 font-['Inter']">
          Smart Field Training & Internship Management Platform
        </div>
      </div>
      <div className="flex items-center gap-3">
        {step > 1 && (
          <span className="text-sm text-gray-500 font-['Inter']">
            Step <strong>{step}</strong> of 3
          </span>
        )}
        <span className="text-sm text-gray-500 font-['Inter']">Have an account?</span>
        <a href="#" className="text-sm font-bold text-blue-600 hover:underline font-['Inter']">Sign in</a>
      </div>
    </header>
  );
}