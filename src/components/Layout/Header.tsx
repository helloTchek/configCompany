import React from 'react';
import { Bell, User, LogOut } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
        
        <div className="flex items-center gap-4">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <Bell size={20} className="text-gray-600" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium text-gray-700">SuperAdmin</span>
          </div>
          
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <LogOut size={20} className="text-gray-600" />
          </button>
        </div>
      </div>
    </header>
  );
}