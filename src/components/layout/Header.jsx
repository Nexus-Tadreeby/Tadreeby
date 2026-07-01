// Header.jsx
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";

export function Header({ className = "fixed top-0 left-0 right-0 z-50" }) {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header
      className={`${className} flex items-center justify-between px-8 py-5 glass-header`}
    >
      <div>
        <img src={logo} alt="Tadreeby Logo" className="h-7 sm:h-8 w-auto mb-1" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500 font-['Inter']">
          Have an account?
        </span>
        <button
          onClick={handleLoginClick}
          className="text-sm font-bold text-blue-600 hover:underline font-['Inter'] cursor-pointer bg-transparent border-none"
        >
          Login
        </button>
      </div>
    </header>
  );
}
