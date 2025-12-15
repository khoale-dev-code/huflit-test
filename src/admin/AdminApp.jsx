// src/admin/AdminApp.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAdminAuth } from './hooks/useAdminAuth';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './components/UserManagement';
import ExamManagement from './components/ExamManagement';
import CreateExam from './components/CreateExam';
import GrammarManagement from './components/GrammarManagement';
import VocabularyManagement from './components/VocabularyManagement';
import DatabaseManagement from './components/DatabaseManagement';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

const ProtectedRoute = ({ children }) => {
  const { isAdmin, loading } = useAdminAuth();

  if (loading) {
    return <LoadingSpinner message="Đang kiểm tra quyền truy cập..." />;
  }

  return isAdmin ? children : <Navigate to="/admin/login" replace />;
};

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
};

const AdminApp = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<AdminLogin />} />
      
      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/users" 
        element={
          <ProtectedRoute>
            <AdminLayout>
              <UserManagement />
            </AdminLayout>
          </ProtectedRoute>
        } 
      />
      
      {/* Exam Routes - Order matters! Specific routes before general ones */}
      <Route 
        path="/exams/create" 
        element={
          <ProtectedRoute>
            <AdminLayout>
              <CreateExam />
            </AdminLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/exams/edit/:examId" 
        element={
          <ProtectedRoute>
            <AdminLayout>
              <CreateExam />
            </AdminLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/exams" 
        element={
          <ProtectedRoute>
            <AdminLayout>
              <ExamManagement />
            </AdminLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/grammar" 
        element={
          <ProtectedRoute>
            <AdminLayout>
              <GrammarManagement />
            </AdminLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/vocabulary" 
        element={
          <ProtectedRoute>
            <AdminLayout>
              <VocabularyManagement />
            </AdminLayout>
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/database" 
        element={
          <ProtectedRoute>
            <AdminLayout>
              <DatabaseManagement />
            </AdminLayout>
          </ProtectedRoute>
        } 
      />

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AdminApp;