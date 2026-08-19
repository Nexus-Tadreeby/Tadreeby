import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";

export function ProtectedRoute({ allowedRoles }) {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const location = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      showToast("Please log in first to access this page.", "auth");
    } else if (allowedRoles && !allowedRoles.includes(user?.role)) {
      showToast("You do not have permission to access this page.", "error");
    }
  }, [isAuthenticated, allowedRoles, user?.role, showToast, location.pathname]);

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}