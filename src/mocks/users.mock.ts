import type { User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@autocorp.com',
    role: 'admin',
    company: 'AutoCorp Insurance',
    status: 'active',
    lastLogin: '2024-01-15T10:30:00Z'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@fleetmax.com',
    role: 'user',
    company: 'FleetMax Leasing',
    status: 'active',
    lastLogin: '2024-01-14T14:22:00Z'
  }
];