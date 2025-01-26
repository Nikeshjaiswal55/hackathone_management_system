import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, isAuthenticated, ...rest }) => {
  return isAuthenticated ? (
    Component
  ) : (
    <Navigate to="/login" replace {...rest} />
  );
};

export default ProtectedRoute;
