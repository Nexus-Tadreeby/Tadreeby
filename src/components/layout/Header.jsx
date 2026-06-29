// Header.jsx
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.svg";

export function Header() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 header-transparent">
      <div>
        <img src={logo} alt="Tadreeby Logo" className="h-10 mb-1" />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500 font-['Inter']">Have an account?</span>
        <button 
          onClick={handleLoginClick}
          className="text-sm font-bold text-blue-600 hover:underline font-['Inter'] cursor-pointer bg-transparent border-none"
        >
          Login
        </button>
      </div>

      <style>{`
        .header-transparent {
          background: transparent;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }
        
        @media (max-width: 1100px) {
          .header-transparent {
            background: white !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1) !important;
          }
        }
      `}</style>
    </header>
  );
}