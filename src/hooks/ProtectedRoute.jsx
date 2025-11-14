import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

export const ProtectedRoute = ({ children, authenticated = true }) => {
  const { user } = useAuthStore();

  if (authenticated === false) {
    if (!user) {
      return children;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  if (authenticated) {
    if (user) {
      return children;
    } else {
      return <Navigate to="/login" replace />;
    }
  }

  return <Navigate to="/login" replace />;
};
