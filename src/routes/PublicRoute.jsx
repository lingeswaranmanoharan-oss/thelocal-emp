// import { Navigate } from 'react-router-dom';

// export const PublicRoute = ({ children }) => {
//   const isAuthenticated = () => {
//     return false;
//   };
//   return !isAuthenticated() ? children : <Navigate to="/admin/dashboard" replace />;
// };
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
export const PublicRoute = ({ children }) => {
  const { token } = useAuth();
  return !token ? children : <Navigate to="/My-details" replace />;
};
