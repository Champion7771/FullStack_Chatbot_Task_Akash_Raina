import { Navigate } from "react-router-dom";
import Admin from "../pages/Admin";

export default function ProtectedAdmin() {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Admin />;
}
