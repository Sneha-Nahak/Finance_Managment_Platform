// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage.jsx';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './components/auth/ResetPasswordForm';
import CreatePolicyPage from './pages/CreatePolicyPage.jsx';
import EditPolicyPage from './pages/EditPolicyPage.jsx';
import ClaimPage from './pages/ClaimPage.jsx';
import ClaimDetailsPage from './pages/ClaimDetailsPage.jsx';
import SubmitClaimPage from './pages/SubmitClaimPage.jsx';
import Navbar from './components/Navbar';
import { AuthProvider, useAuth } from './hooks/useAuth.jsx';
import AllPoliciesPage from './pages/AllPoliciesPage.jsx';
import MyPoliciesPage from './pages/MyPoliciesPage.jsx';
import Footer from './components/Footer.jsx';
import About from './pages/About.jsx';
import ContactUs from './pages/ContactUs.jsx';

const AppRoutes = () => {
  const { authLoading } = useAuth();

  if (authLoading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Protected Policy Routes */}
        <Route
          path="/policies"
          element={
            <ProtectedRoute allowedRoles={['customer', 'agent']}>
              <AllPoliciesPage />
            </ProtectedRoute>
          }
        />

          <Route
          path="/policies/my"
          element={
            <ProtectedRoute allowedRoles={['agent']}>
              <MyPoliciesPage/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/policies/create"
          element={
            <ProtectedRoute allowedRoles={['agent']}>
              <CreatePolicyPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/policies/edit/:id"
          element={
            <ProtectedRoute allowedRoles={['agent']}>
              <EditPolicyPage />
            </ProtectedRoute>
          }
        />

        {/* Claim Routes */}
        <Route
          path="/claims/submit"
          element={
            <ProtectedRoute allowedRoles={['customer']}>
              <SubmitClaimPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/claims"
          element={
            <ProtectedRoute allowedRoles={['customer', 'agent']}>
              <ClaimPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/claims/:id"
          element={
            <ProtectedRoute allowedRoles={['customer', 'agent']}>
              <ClaimDetailsPage />
            </ProtectedRoute>
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        {/* Default Redirect */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        
      </Routes>
      <Footer/>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  </BrowserRouter>
);

export default App;
