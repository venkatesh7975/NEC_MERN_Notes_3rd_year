import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

import HomePage from './pages/HomePage';
import StudentDashboard from './pages/StudentDashboard';
import InstructorDashboard from './pages/InstructorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CourseCatalogPage from './pages/CourseCatalogPage';
import CourseViewerPage from './pages/CourseViewerPage';
import ProjectsPage from './pages/ProjectsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import InterviewPage from './pages/InterviewPage';
import CheatSheetsPage from './pages/CheatSheetsPage';
import ResourcesPage from './pages/ResourcesPage';
import CertificatesPage from './pages/CertificatesPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';

function DashboardRouter() {
  const { user } = useAuth();
  if (user?.role === 'instructor') return <InstructorDashboard />;
  if (user?.role === 'admin') return <AdminDashboard />;
  return <StudentDashboard />;
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen flex bg-slate-950 text-slate-100">
            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            {/* Main Wrapper */}
            <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
              <Navbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

              <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/dashboard" element={<DashboardRouter />} />
                  <Route path="/courses" element={<CourseCatalogPage />} />
                  <Route path="/courses/:slug" element={<CourseViewerPage />} />
                  <Route path="/projects" element={<ProjectsPage />} />
                  <Route path="/assignments" element={<AssignmentsPage />} />
                  <Route path="/interview-questions" element={<InterviewPage />} />
                  <Route path="/cheatsheets" element={<CheatSheetsPage />} />
                  <Route path="/resources" element={<ResourcesPage />} />
                  <Route path="/bookmarks" element={<CourseCatalogPage />} />
                  <Route path="/certificates" element={<CertificatesPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/login" element={<LoginPage />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}
