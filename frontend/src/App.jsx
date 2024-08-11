import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SalesDashboard from './components/SalesDashboard';
import AccountantDashboard from './components/AccountantDashboard';
import HrDashboard from './components/HrDashboard';
import AdminDashboard from './components/AdminDashboard';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/sales" element={<ProtectedRoute roles={['sales']}><SalesDashboard /></ProtectedRoute>} />
        <Route path="/accountant" element={<ProtectedRoute roles={['accountant']}><AccountantDashboard /></ProtectedRoute>} />
        <Route path="/hr" element={<ProtectedRoute roles={['hr']}><HrDashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<h2>Unauthorized</h2>} />
      </Routes>
    </Router>
  );
}

export default App;