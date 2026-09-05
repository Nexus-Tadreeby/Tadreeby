// src/components/layout/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  MessageCircle,
  Settings,
  LayoutDashboard,
  LogOut,
  ChevronLeft,
} from "lucide-react";

const DEFAULT_NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
];
const DEFAULT_FOOTER_ITEMS = [
  { label: "Settings", icon: Settings, path: "/settings" },
];

const LOGO_SVG = (
  <svg width="47" height="30" viewBox="0 0 47 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M29.9861 4.89533C28.4781 5.69423 27.0185 6.47247 25.5521 7.24249C25.0758 7.49275 24.6299 7.80902 24.0857 7.9149C23.3517 8.0579 22.6594 7.97541 21.9892 7.61515C20.2139 6.6595 18.429 5.72171 16.6482 4.77706C16.482 4.68906 16.3117 4.60657 16.1691 4.48007C15.8492 4.19819 15.834 3.8393 16.1428 3.54641C16.4599 3.24666 16.8739 3.10229 17.2506 2.90016C18.8223 2.05588 20.4036 1.22674 21.9795 0.387966C22.9405 -0.123547 23.8987 -0.131807 24.8611 0.378331C26.6876 1.34773 28.5127 2.31712 30.3392 3.28651C30.4762 3.35939 30.6106 3.43228 30.7213 3.54366C30.9983 3.82142 31.0135 4.15279 30.731 4.42367C30.6009 4.5488 30.5579 4.67256 30.5607 4.84582C30.569 5.66671 30.5676 6.48759 30.5607 7.30849C30.5607 7.44462 30.5967 7.51615 30.7241 7.58078C31.1645 7.80216 31.3597 8.25727 31.2351 8.7234C31.1243 9.14004 30.7227 9.43979 30.2768 9.44117C29.8171 9.44117 29.4225 9.14281 29.3075 8.70555C29.1898 8.25728 29.3837 7.8035 29.8157 7.5835C29.9556 7.51199 29.9888 7.43501 29.9874 7.29063C29.9805 6.50686 29.9847 5.7231 29.9847 4.89533H29.9861Z" fill="#FCA83E" />
    <path d="M34.5238 26.498C34.4241 28.4585 33.0543 29.7785 31.0227 29.8603C28.8772 29.9457 27.2049 28.5759 26.9986 26.6119C26.81 24.8008 27.5252 23.2104 28.1443 21.595C28.5321 21.2819 28.7847 21.3211 29.0871 21.7836C29.8485 22.9471 30.119 24.1817 29.9019 25.5586C29.7881 26.2738 29.845 27.1029 30.8163 27.0495C31.7948 26.9926 31.7094 26.1315 31.5849 25.4448C31.2219 23.5057 30.5886 21.6769 29.2117 20.1825C25.6216 15.7457 20.0284 16.1762 17.1749 21.1182C17.1749 21.1182 17.1678 21.1182 17.1749 21.1254C16.627 21.933 16.2392 22.8083 15.9581 23.7299C15.9581 23.7405 15.951 23.7548 15.9474 23.7655C15.8442 24.0786 15.7588 24.3952 15.6984 24.7226C15.6984 24.7297 15.6984 24.7368 15.6984 24.7439C15.6414 24.9752 15.5987 25.21 15.5525 25.4448C15.4244 26.1315 15.339 26.9926 16.3174 27.0495C17.0895 27.0922 17.2852 26.5727 17.271 25.9998C17.271 25.9358 17.271 25.8754 17.2603 25.8113C17.2603 25.7295 17.2425 25.6405 17.2319 25.5586C17.0504 24.4165 17.2034 23.3776 17.698 22.392C17.8901 22.0718 18.1178 21.7623 18.3597 21.4456C18.4949 21.3674 18.6337 21.378 18.7974 21.474C19.8185 23.0574 20.249 24.7154 20.1423 26.4944C20.0284 28.43 18.559 29.7749 16.595 29.871C14.4851 29.9706 12.6634 28.7538 12.5815 26.8467C12.4072 22.5628 14.2751 19.0831 17.456 16.3648C20.3558 13.892 23.7466 13.5575 27.2476 14.9238C31.2895 16.5 34.7479 22.0967 34.5309 26.5016L34.5238 26.498Z" fill="#1677FF" />
    <path d="M23.6168 3.41748C26.2462 3.45662 28.1568 5.44554 28.1355 8.12472C28.1141 10.6651 26.1287 12.6043 23.5705 12.5829C20.8736 12.558 18.9558 10.6332 18.9807 7.97888C19.0056 5.28191 20.9412 3.3819 23.6168 3.41748Z" fill="#1677FF" />
    <path d="M0.0084788 28.0178C0.591992 23.5418 1.67006 19.3362 6.23855 17.1338C8.55481 16.0166 10.9494 16.0735 13.3332 16.8705C13.81 17.0306 14.8703 17.1765 14.3259 18.0269C13.9061 18.6815 13.8527 19.9446 12.49 19.692C7.20989 18.7171 4.13577 20.9516 3.21069 26.4167C3.10395 27.0429 3.05769 27.6797 3.00788 28.313C2.92604 29.2986 2.53467 30.0352 1.43168 29.9818C0.218401 29.9249 -0.0662468 29.0887 0.0120294 28.0142L0.0084788 28.0178Z" fill="#1677FF" />
    <path d="M37.0937 16.3084C40.9221 16.2942 43.4838 18.3365 45.2842 21.496C46.4477 23.5419 46.8817 25.8118 46.9992 28.1495C47.049 29.1244 46.8319 29.9499 45.6969 29.9997C44.5263 30.0495 44.1172 29.281 44.0674 28.2064C43.9713 26.1499 43.3984 24.225 42.3524 22.4531C40.7299 19.6956 38.3781 18.5714 35.3253 19.5036C33.6175 20.0266 33.3542 18.8844 32.7671 17.9984C32.3473 17.3651 33.0126 17.2228 33.3827 17.0449C34.5497 16.4792 35.7985 16.287 37.0937 16.3048V16.3084Z" fill="#1677FF" />
    <path d="M37.1215 14.6964C34.8657 14.6893 32.9586 12.7359 32.9906 10.4659C33.0227 8.1852 34.7768 6.52004 37.1393 6.53427C39.5267 6.5485 41.3021 8.33113 41.2737 10.6936C41.2488 12.8818 39.3595 14.7071 37.1179 14.7L37.1215 14.6964Z" fill="#1677FF" />
    <path d="M9.91976 6.53125C12.3392 6.53125 13.9937 8.14309 14.0008 10.5127C14.0079 12.9179 12.204 14.7574 9.88774 14.7147C7.6035 14.672 5.87075 12.8895 5.86719 10.5803C5.86364 8.24626 7.57503 6.53481 9.91976 6.53125Z" fill="#1677FF" />
    <path d="M27.3532 3.15249C27.3392 3.14261 27.3233 3.13382 27.3041 3.12749C26.8259 2.96994 26.2662 3.05067 25.7707 3.04447C25.0061 3.03487 24.2547 3.07486 23.4909 3.10779C22.3345 3.15772 20.5638 3.16743 19.4119 3.12749C19.3585 3.12566 19.3197 3.15467 19.2979 3.19409C19.2599 3.17823 19.2161 3.17829 19.1747 3.20587C18.8351 3.43273 18.9547 3.41586 18.9289 3.76465C18.8868 4.33461 18.8057 3.78252 18.9194 4.34759C19.0334 4.91445 20.3283 4.57594 20.7462 4.56502C21.8161 4.53709 22.7568 5.18831 23.4292 5.96622C23.4862 6.03219 23.6087 6.03133 23.6659 5.96622C24.1774 5.38397 24.8752 5.01781 25.5943 4.75567C25.9324 4.63236 26.2718 4.54864 26.6331 4.5487C26.8477 4.54876 27.7862 4.59421 27.9871 4.57048C28.0603 4.56186 28.1114 4.51727 28.1333 4.46286C28.1888 4.45384 28.2384 4.41344 28.2326 4.34759C28.1865 3.83303 28.1802 4.53778 28.1974 4.02173C28.2056 3.79136 28.22 3.56102 28.2327 3.33089C28.2404 3.19345 28.2047 2.85416 28.2415 2.65C28.2622 2.62845 28.2776 2.59967 28.2817 2.56329C28.2866 2.52072 28.2312 3.26046 28.2327 3.21495C28.236 3.11818 27.4431 3.14462 27.3532 3.15249Z" fill="#FCA83E" />
  </svg>
);

/**
 * Single, role-agnostic sidebar. Every role (student, superAdmin,
 * university-admin, company-admin, company-trainer, ...) passes its own
 * navItems/footerItems/paths/storageKey — no per-role sidebar files.
 *
 * Nav shape — pass ONE of:
 *  - navItems: [{ label, icon, path }]              → single "Menu" section
 *  - navGroups: [{ label, items: [{label,icon,path}] }] → multiple labeled sections
 */
function Sidebar({
  navItems,
  navGroups,
  footerItems = DEFAULT_FOOTER_ITEMS,
  user = { name: "User", role: "Member", avatar: "" },
  profilePath = "/profile",
  chatPath,
  onSignOut,
  chatAvatars = [],
  unreadCount = 0,
  brandPath = "/",
  storageKey = "sidebar-expanded",
}) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const saved = window.sessionStorage.getItem(storageKey);
    if (saved !== null) setExpanded(saved === "true");
  }, [storageKey]);

  useEffect(() => {
    window.sessionStorage.setItem(storageKey, expanded ? "true" : "false");
  }, [expanded, storageKey]);

  const groups =
    navGroups && navGroups.length > 0
      ? navGroups
      : [{ label: "Menu", items: navItems && navItems.length > 0 ? navItems : DEFAULT_NAV_ITEMS }];

  const renderNavItem = ({ label, icon: Icon, path }) => (
    <NavLink
      key={label}
      to={path}
      end={path === "/"}
      title={expanded ? undefined : label}
      className={({ isActive }) =>
        [
          "group flex h-9 w-full items-center rounded-lg transition-colors duration-200",
          expanded ? "justify-start gap-3 px-3" : "justify-center",
          isActive
            ? "text-[#1677FF]"
            : "text-[#C7C9CE] hover:bg-[#F7F8FA] hover:text-[#9DA1A8]",
        ].join(" ")
      }
    >
      <Icon className="h-[19px] w-[19px] shrink-0" strokeWidth={1.8} />
      {expanded && (
        <span className="whitespace-nowrap text-[13px] font-medium">{label}</span>
      )}
    </NavLink>
  );

  return (
    <aside
      className={[
        "relative flex h-full shrink-0 flex-col overflow-hidden bg-white",
        "border-r border-[#F0F1F3]",
        "transition-[width] duration-300 ease-out",
        expanded ? "w-[188px]" : "w-[78px]",
      ].join(" ")}
    >
      {/* Brand / collapse toggle */}
      <div className="relative flex h-[70px] shrink-0 items-center justify-center border-b border-[#F4F4F5]">
        <Link to={brandPath} aria-label="Home">
          {LOGO_SVG}
        </Link>
        <button
          type="button"
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          aria-expanded={expanded}
          title={expanded ? "Collapse sidebar" : "Expand sidebar"}
          onClick={() => setExpanded((v) => !v)}
          className="absolute right-[-1px] top-1/2 flex h-7 w-5 -translate-y-1/2 items-center justify-center rounded-l-md bg-[#F3F8FF] text-[#1677FF] hover:bg-[#E8F2FF]"
        >
          <ChevronLeft
            className={`h-4 w-4 transition-transform duration-300 ${expanded ? "" : "rotate-180"}`}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* User */}
      <NavLink
        to={profilePath}
        title={expanded ? undefined : user.name}
        className={[
          "flex h-[64px] shrink-0 items-center border-b border-[#F4F4F5]",
          expanded ? "gap-2.5 px-4" : "justify-center",
          "transition-colors hover:bg-[#FAFBFC]",
        ].join(" ")}
      >
        <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-[#EAF2FF]">
          {user.avatar || user.profileImage ? (
            <img
              src={user.avatar || user.profileImage}
              alt={user.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[11px] font-semibold text-[#1677FF]">
              {user.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
        </div>
        {expanded && (
          <div className="min-w-0 leading-tight">
            <p className="truncate text-[12px] font-semibold text-[#6F7278]">{user.name}</p>
            <p className="mt-0.5 text-[9px] font-medium text-[#AEB1B7]">{user.role}</p>
          </div>
        )}
      </NavLink>

      {/* Nav groups */}
      <div className="flex min-h-0 flex-1 flex-col px-3">
        {groups.map((group, idx) => (
          <React.Fragment key={group.label || idx}>
            {expanded && (
              <p
                className={`px-2 pb-2 text-[8px] font-medium uppercase tracking-wide text-[#B8BAC0] ${
                  idx === 0 ? "pt-4" : "pt-7"
                }`}
              >
                {group.label}
              </p>
            )}
            <nav className="space-y-1">{group.items.map(renderNavItem)}</nav>
          </React.Fragment>
        ))}

        {/* Chat (only if a chatPath is supplied) */}
        {chatPath && (
          <div className="mt-auto pb-4">
            {expanded && (
              <p className="px-2 pb-2 text-[8px] font-medium uppercase tracking-wide text-[#B8BAC0]">
                Personal
              </p>
            )}
            <NavLink
              to={chatPath}
              title={expanded ? undefined : "Chat"}
              className={[
                "flex h-9 w-full items-center rounded-lg text-[#C7C9CE] hover:bg-[#F7F8FA]",
                expanded ? "gap-3 px-3" : "justify-center",
              ].join(" ")}
            >
              <MessageCircle className="h-[19px] w-[19px] shrink-0" strokeWidth={1.8} />
              {expanded && (
                <>
                  <span className="text-[13px] font-medium text-[#777A80]">Chat</span>
                  <div className="ml-auto flex items-center">
                    <div className="flex -space-x-1.5">
                      {(chatAvatars.length ? chatAvatars : ["A", "D"]).map((avatar, index) => (
                        <div
                          key={index}
                          className="h-5 w-5 overflow-hidden rounded-full border-2 border-white bg-[#E8EEF8] text-center text-[7px] font-semibold leading-4 text-[#8B93A1]"
                        >
                          {avatar.startsWith?.("http") ? (
                            <img src={avatar} alt="" className="h-full w-full object-cover" />
                          ) : (
                            avatar
                          )}
                        </div>
                      ))}
                    </div>
                    {unreadCount > 0 && (
                      <span className="ml-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF3B30] text-[8px] font-bold text-white">
                        {unreadCount}
                      </span>
                    )}
                  </div>
                </>
              )}
            </NavLink>
          </div>
        )}
      </div>

      {/* Footer items */}
      {footerItems?.length > 0 && (
        <div className="shrink-0 border-t border-[#F4F4F5] px-3 pb-2 pt-3">
          {expanded && (
            <p className="px-2 pb-2 text-[8px] font-medium text-[#70737A]">Settings</p>
          )}
          <div
            className={[
              "flex rounded-xl bg-[#F7F8FA]",
              expanded
                ? "h-9 items-center justify-around px-1"
                : "mx-auto h-[76px] w-10 flex-col items-center justify-center gap-1",
            ].join(" ")}
          >
            {footerItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.path}
                title={item.label}
                className="flex h-7 w-7 items-center justify-center rounded-md text-[#C6C9CE] hover:bg-white hover:text-[#969AA1]"
              >
                <item.icon className="h-4 w-4" strokeWidth={1.8} />
              </NavLink>
            ))}
          </div>
        </div>
      )}

      {/* Sign out */}
      <div className="shrink-0 px-3 pb-3">
        <button
          type="button"
          onClick={onSignOut}
          title={expanded ? undefined : "Sign out"}
          className={[
            "flex h-9 w-full items-center justify-center rounded-lg",
            "bg-[#FFF0F1] text-[#FF6B72]",
            "transition-colors hover:bg-[#FFE5E7]",
            expanded ? "gap-2" : "",
          ].join(" ")}
        >
          <LogOut className="h-[17px] w-[17px]" strokeWidth={1.9} />
          {expanded && <span className="text-[12px] font-medium">Sign out</span>}
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;