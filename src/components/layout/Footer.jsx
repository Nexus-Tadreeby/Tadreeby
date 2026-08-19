import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="text-center py-5 text-xs text-gray-400 flex items-center justify-center gap-4 font-['Inter']">
      <span>© 2026 Tadreeby. All rights reserved.</span>
      <Link to="/terms-privacy" className="hover:underline hover:text-[#1677FF]">
        Terms of Service
      </Link>
      <span>|</span>
      <Link to="/terms-privacy" className="hover:underline hover:text-[#1677FF]">
        Privacy Policy
      </Link>
      <span>|</span>
      <Link to="#" className="hover:underline hover:text-[#1677FF]">
        Contact
      </Link>
    </footer>
  );
}