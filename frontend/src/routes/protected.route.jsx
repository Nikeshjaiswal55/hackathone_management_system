import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  return token ? Component : <Navigate to="/login" replace {...rest} />;
};

export default ProtectedRoute;
