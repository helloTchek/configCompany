import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard';
import CompaniesPage from './pages/Companies/CompaniesPage';
import EditCompanyPage from './pages/Companies/EditCompanyPage';
import CreateCompanyPage from './pages/Companies/CreateCompanyPage';
import UsersPage from './pages/Users/UsersPage';
import JourneysPage from './pages/Journeys/JourneysPage';
import CreateJourneyPage from './pages/Journeys/CreateJourneyPage';
import SortingRulesPage from './pages/SortingRules/SortingRulesPage';
import CostMatricesPage from './pages/CostMatrices/CostMatricesPage';

function App() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar 
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/companies/new" element={<CreateCompanyPage />} />
            <Route path="/companies/:id/edit" element={<EditCompanyPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/journeys" element={<JourneysPage />} />
            <Route path="/journeys/new" element={<CreateJourneyPage />} />
            <Route path="/sorting-rules" element={<SortingRulesPage />} />
            <Route path="/cost-matrices" element={<CostMatricesPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;