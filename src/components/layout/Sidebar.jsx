import React from "react";
import {
  MessageCircle,
  Settings,
  LayoutDashboard,
  Building2,
  Landmark,
  Users,
  ScanEye,
} from "lucide-react";
import logo from "../../assets/logo.svg";

const DEFAULT_NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, active: true },
  { label: "Universities", icon: Landmark },
  { label: "Companies", icon: Building2 },
  { label: "Users", icon: Users },
  { label: "System Logs", icon: ScanEye },
];

const DEFAULT_FOOTER_ITEMS = [
  { label: "Chat", icon: MessageCircle, badge: 9 },
  { label: "Settings", icon: Settings },
];

function Sidebar({
  navItems = DEFAULT_NAV_ITEMS,
  footerItems = DEFAULT_FOOTER_ITEMS,
  user = { name: "Deema Abd Alhady", role: "Super Admin", avatar: "" },
}) {
  return (
    <aside
      className="group flex h-full w-[72px] shrink-0 flex-col border-r border-gray-100 bg-white transition-all duration-300 hover:w-[248px] max-sm:hover:w-[72px]"
    >
      {/* Logo */}
      <div className="flex items-center justify-center px-6 pt-8 pb-6 group-hover:justify-start max-sm:group-hover:justify-center">
        <img
          src={logo}
          alt="Tadreeby Logo"
          className="h-8 w-8 object-contain transition-all duration-400 group-hover:h-7 group-hover:sm:h-8 group-hover:w-auto max-sm:group-hover:h-8 max-sm:group-hover:w-8"
        />
      </div>

      {/* Main navigation */}
      <nav className="mt-2 flex-1 space-y-1">
        {navItems.map(({ label, icon: Icon, active }) => (
          <button
            key={label}
            className={`flex w-full items-center justify-center gap-3 px-4 py-3 text-[14px] transition-all duration-400 group-hover:justify-start max-sm:group-hover:justify-center ${
              active
                ? "bg-[#155DFC] font-bold text-white rounded-r-2xl shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] drop-shadow-[0_1px_3px_#1677FF]"
                : "font-normal text-gray-400 rounded-r-xl hover:bg-gray-50 hover:text-gray-600"
            }`}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" strokeWidth={1.75} />
            <span className="hidden group-hover:inline max-sm:hidden max-sm:group-hover:hidden">
              {label}
            </span>
          </button>
        ))}
      </nav>

      {/* Footer items */}
      <div className="space-y-1 border-t border-gray-100 py-4 px-4">
        {footerItems.map(({ label, icon: Icon, badge }) => (
          <button
            key={label}
            className="flex w-full items-center justify-center gap-3 rounded-xl px-4 py-2.5 text-[14px] font-normal text-gray-400 transition-all duration-400 group-hover:justify-start max-sm:group-hover:justify-center hover:bg-gray-50 hover:text-gray-600"
          >
            <span className="relative shrink-0">
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
              {badge && (
                <span className="absolute -right-1.5 -top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-red-500 text-[8px] font-bold text-white">
                  {badge}
                </span>
              )}
            </span>
            <span className="hidden group-hover:inline max-sm:hidden max-sm:group-hover:hidden">
              {label}
            </span>
          </button>
        ))}
      </div>

      {/* User profile */}
      <div className="flex items-center justify-center gap-2 border-t border-gray-100 px-5 py-4 transition-all duration-400 group-hover:justify-start max-sm:group-hover:justify-center">
        <div className="h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-200">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gray-300" />
          )}
        </div>
        <div className="hidden min-w-0 flex-1 leading-tight group-hover:block max-sm:hidden max-sm:group-hover:hidden">
          <p className="truncate text-[13px] font-semibold text-gray-900">{user.name}</p>
          <p className="text-[11px] text-blue-600">{user.role}</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;