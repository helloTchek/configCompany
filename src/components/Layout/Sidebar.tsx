import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/auth/AuthContext';
import { Building2, Users, Route, DollarSign, ListFilter as Filter, Settings, Hop as Home, ChevronDown, ChevronRight } from 'lucide-react';
import { PERMISSIONS } from '@/types/auth';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isCollapsed, onToggle }: SidebarProps) {
  const { t } = useTranslation('common');
  const { hasPermission } = useAuth();
  const location = useLocation();

  const navigation = [
    { 
      name: t('navigation.companies'), 
      href: '/companies', 
      icon: Building2,
      permission: PERMISSIONS.COMPANIES.VIEW
    },
    { 
      name: t('navigation.users'), 
      href: '/users', 
      icon: Users,
      permission: PERMISSIONS.USERS.VIEW
    },
    { 
      name: t('navigation.workflows'), 
      href: '/journeys', 
      icon: Route,
      permission: PERMISSIONS.WORKFLOWS.VIEW
    },
    { 
      name: t('navigation.costs'), 
      href: '/cost-matrices', 
      icon: DollarSign,
      permission: PERMISSIONS.COSTS.VIEW
    },
    { 
      name: t('navigation.sortingRules'), 
      href: '/sorting-rules', 
      icon: Filter 
    },
    { 
      name: t('navigation.chaseupRules'), 
      href: '/chaseup-rules', 
      icon: Route 
    },
  ].filter(item => !item.permission || hasPermission(item.permission));

  return (
    <div className={`bg-gray-900 text-white transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } min-h-screen flex flex-col`}>
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <h1 className="text-xl font-bold">Admin Panel</h1>
          )}
          <button
            onClick={onToggle}
            className="p-1 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <item.icon size={20} className="shrink-0" />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}