import { useEffect, useRef } from "react";
import { Outlet, useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AppShellContext } from "../../context/AppShellContext";
import Sidebar from "./Sidebar";
import PageHeader from "../common/pagesAssets/PageHeader";
import { roleNavigation } from "./roleNavigation";

export default function RoleLayout({ role }) {
  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { logout, user } = useAuth();
  const config = roleNavigation[role];

  if (!config) {
    throw new Error(`Missing layout configuration for role: ${role}`);
  }

  const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim();

  const handleSignOut = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const hideHeader = config.showHeader === false
    || location.pathname.endsWith("/chats")
    || location.pathname.endsWith("/chat");
  const searchValue = searchParams.get("search") || "";
  const handleSearchChange = (event) => {
    const next = new URLSearchParams(searchParams);
    const value = event.target.value;
    if (value) next.set("search", value);
    else next.delete("search");
    setSearchParams(next, { replace: true });
  };

  useEffect(() => {
    if (headerRef.current) headerRef.current.style.transform = "translateY(0)";
  }, [location.pathname]);

  const handleContentScroll = (event) => {
    if (!headerRef.current) return;
    if (event.target.scrollHeight <= event.target.clientHeight) return;
    const scrollTop = event.target.scrollTop;
    if (typeof scrollTop !== "number") return;
    headerRef.current.style.transform = `translateY(-${scrollTop}px)`;
  };

  return (
    <AppShellContext.Provider value>
      <div className="flex h-screen w-full overflow-hidden bg-gradient-to-b from-[#F2F7FF] via-[#F8FAFC] to-[#FFF8F4] font-['Inter']">
        <Sidebar
          navItems={config.navItems}
          navGroups={config.navGroups}
          footerItems={config.footerItems}
          user={{
            name: fullName || config.label,
            role: config.label,
            avatar: user?.profileImage || "",
          }}
          profilePath={config.profilePath}
          chatPath={config.chatPath}
          brandPath={config.brandPath}
          storageKey={config.storageKey}
          onSignOut={handleSignOut}
          persistent
        />
        <div className="relative min-w-0 flex-1 overflow-hidden">
          {!hideHeader && (
            <div ref={headerRef} className="pointer-events-none absolute inset-x-0 top-0 z-30 will-change-transform">
              <div className="mx-auto w-full max-w-[1240px] px-5 pt-5 sm:px-7 lg:px-8 lg:pt-7">
                <div className="pointer-events-auto">
                  <PageHeader
                    persistent
                    fullName={fullName || config.label}
                    studentUser={{ name: fullName || config.label, avatar: user?.profileImage || "" }}
                    searchValue={searchValue}
                    onSearchChange={handleSearchChange}
                    profilePath={config.profilePath}
                    internshipPath={config.internshipPath}
                    settingsPath={config.settingsPath || config.profilePath}
                    chatPath={config.chatPath}
                    onLogout={handleSignOut}
                  />
                </div>
              </div>
            </div>
          )}
          <div className="h-full" onScrollCapture={handleContentScroll}>
            <Outlet />
          </div>
        </div>
      </div>
    </AppShellContext.Provider>
  );
}
