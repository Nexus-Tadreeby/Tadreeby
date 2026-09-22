import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { AppShellContext } from "../../context/AppShellContext";
import Sidebar from "./Sidebar";
import { roleNavigation } from "./roleNavigation";

export default function RoleLayout({ role }) {
  const navigate = useNavigate();
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

  return (
    <AppShellContext.Provider value>
      <div className="flex h-screen w-full overflow-hidden">
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
        <div className="min-w-0 flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </AppShellContext.Provider>
  );
}
