import { createBrowserRouter, Navigate } from 'react-router-dom';
import { LoginPage } from '../pages/auth/LoginPage_';
import { ForgotPasswordPage } from '../pages/auth/ForgotPasswordPage';
import { AdminDashboardPage } from '../pages/admin/AdminDashboardPage';
import { PublicRoute } from './PublicRoute';
import { ProtectedRoute } from './ProtectedRoute';
import App from '../App';
import Employee from '../pages/employee/employee';
import EmployeeProfile from '../pages/profile/employee-profile/EmployeeProfile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/login" replace />,
  },
  {
    path: '/login',
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
  {
    path: '/forgot-password',
    element: (
      <PublicRoute>
        <ForgotPasswordPage />
      </PublicRoute>
    ),
  },
  {
    path: '/My-details',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <Employee />,
      },
    ],
  },
  {
    path: '/Edit-emp',
    element: <ProtectedRoute />,
    children: [
      {
        path: '',
        element: <EmployeeProfile />,
      },
    ],
  },
]);
