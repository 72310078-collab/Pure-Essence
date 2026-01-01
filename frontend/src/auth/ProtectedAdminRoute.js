import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

export default function ProtectedAdminRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) return <Navigate to="/admin/login" replace />;
  if (Number(user.isAdmin) !== 1) return <Navigate to="/" replace />;

  return children;
}
