// src/admin/AdminApp.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdminAuth } from './hooks/useAdminAuth';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { isAdmin, loading } = useAdminAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

const AdminApp = () => {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      
      {/* ⚠️ ROUTE TẠM - XÓA SAU KHI TẠO ADMIN
      <Route path="/setup" element={<AdminSetup />} /> */}
      
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AdminApp;