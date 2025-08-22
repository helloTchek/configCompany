import React from 'react';
import Header from '../components/Layout/Header';
import { Building2, Users, Route, DollarSign } from 'lucide-react';

const stats = [
  {
    name: 'Total Companies',
    value: '42',
    icon: Building2,
    color: 'text-blue-600 bg-blue-100',
  },
  {
    name: 'Active Users',
    value: '156',
    icon: Users,
    color: 'text-green-600 bg-green-100',
  },
  {
    name: 'Inspection Journeys',
    value: '23',
    icon: Route,
    color: 'text-purple-600 bg-purple-100',
  },
  {
    name: 'Monthly Revenue',
    value: '€12,450',
    icon: DollarSign,
    color: 'text-orange-600 bg-orange-100',
  },
];

export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <Header title="Dashboard" />
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.name} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                <p className="text-sm text-gray-600">New company "AutoCorp Insurance" created</p>
                <span className="text-xs text-gray-400 ml-auto">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <p className="text-sm text-gray-600">User "John Doe" updated inspection journey</p>
                <span className="text-xs text-gray-400 ml-auto">4 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-600 rounded-full"></div>
                <p className="text-sm text-gray-600">Cost matrix updated for FleetMax Leasing</p>
                <span className="text-xs text-gray-400 ml-auto">1 day ago</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">API Services</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Operational
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Database</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Healthy
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Processing Queue</span>
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                  23 pending
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}