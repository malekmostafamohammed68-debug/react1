import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('userToken');

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}
