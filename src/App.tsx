import React, { useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/auth/AuthContext';
import Sidebar from './components/Layout/Sidebar';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import LoginPage from '@/pages/auth/LoginPage';
import UnauthorizedPage from '@/pages/auth/UnauthorizedPage';
import CompaniesPage from './pages/Companies/CompaniesPage';
import EditCompanyPage from './pages/Companies/EditCompanyPage';
import CreateCompanyPage from './pages/Companies/CreateCompanyPage';
import UsersPage from './pages/Users/UsersPage';
import JourneysPage from './pages/Journeys/JourneysPage';
import CreateJourneyPage from './pages/Journeys/CreateJourneyPage';
import EditJourneyPage from './pages/Journeys/EditJourneyPage';
import SortingRulesPage from './pages/SortingRules/SortingRulesPage';
import CostMatricesPage from './pages/CostMatrices/CostMatricesPage';
import CreateCostMatrixPage from './pages/CostMatrices/CreateCostMatrixPage';
import EditCostMatrixPage from './pages/CostMatrices/EditCostMatrixPage';
import CreateSortingRulePage from './pages/SortingRules/CreateSortingRulePage';
import EditSortingRulePage from './pages/SortingRules/EditSortingRulePage';
import ChaseupRulesPage from './pages/ChaseupRules/ChaseupRulesPage';
import CreateChaseupRulePage from './pages/ChaseupRules/CreateChaseupRulePage';
import EditChaseupRulePage from './pages/ChaseupRules/EditChaseupRulePage';
import { PERMISSIONS } from '@/types/auth';

function App() {
  const { isAuthenticated, isLoading } = useAuth();
  const { ready } = useTranslation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  if (!ready || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />
          <Route path="/*" element={
            <ProtectedRoute>
              <div className="flex h-screen bg-gray-100">
                <Sidebar 
                  isCollapsed={sidebarCollapsed}
                  onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
                
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Routes>
                    <Route path="/" element={
                      <ProtectedRoute requiredPermission={PERMISSIONS.COMPANIES.VIEW}>
                        <CompaniesPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/companies" element={
                      <ProtectedRoute requiredPermission={PERMISSIONS.COMPANIES.VIEW}>
                        <CompaniesPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/companies/new" element={
                      <ProtectedRoute requiredPermission={PERMISSIONS.COMPANIES.CREATE}>
                        <CreateCompanyPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/companies/:id/edit" element={
                      <ProtectedRoute requiredPermission={PERMISSIONS.COMPANIES.UPDATE}>
                        <EditCompanyPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/users" element={
                      <ProtectedRoute requiredPermission={PERMISSIONS.USERS.VIEW}>
                        <UsersPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/journeys" element={
                      <ProtectedRoute requiredPermission={PERMISSIONS.WORKFLOWS.VIEW}>
                        <JourneysPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/journeys/new" element={
                      <ProtectedRoute requiredPermission={PERMISSIONS.WORKFLOWS.CREATE}>
                        <CreateJourneyPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/journeys/:id/edit" element={
                      <ProtectedRoute requiredPermission={PERMISSIONS.WORKFLOWS.UPDATE}>
                        <EditJourneyPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/sorting-rules" element={<SortingRulesPage />} />
                    <Route path="/sorting-rules/new" element={<CreateSortingRulePage />} />
                    <Route path="/sorting-rules/:id/edit" element={<EditSortingRulePage />} />
                    <Route path="/chaseup-rules" element={<ChaseupRulesPage />} />
                    <Route path="/chaseup-rules/new" element={<CreateChaseupRulePage />} />
                    <Route path="/chaseup-rules/:id/edit" element={<EditChaseupRulePage />} />
                    <Route path="/cost-matrices" element={
                      <ProtectedRoute requiredPermission={PERMISSIONS.COSTS.VIEW}>
                        <CostMatricesPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/cost-matrices/new" element={
                      <ProtectedRoute requiredPermission={PERMISSIONS.COSTS.CREATE}>
                        <CreateCostMatrixPage />
                      </ProtectedRoute>
                    } />
                    <Route path="/cost-matrices/:id/edit" element={
                      <ProtectedRoute requiredPermission={PERMISSIONS.COSTS.UPDATE}>
                        <EditCostMatrixPage />
                      </ProtectedRoute>
                    } />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          } />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;