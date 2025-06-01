import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { token, user, authLoading } = useAuth();

  if (authLoading) {
    return <div className="text-center mt-5">Authenticating...</div>;
  }

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    console.warn(`Access denied: User role '${user.role}' not in allowed roles [${allowedRoles.join(", ")}]`);
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
