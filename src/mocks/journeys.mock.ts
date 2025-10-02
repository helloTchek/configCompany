import type { InspectionJourney } from '@/types/entities';

export const mockJourneys: InspectionJourney[] = [
  {
    id: '1',
    companyId: '1',
    name: 'Standard Vehicle Inspection',
    description: 'Complete vehicle inspection journey with all standard checks',
    blocks: [
      {
        id: 'b1',
        type: 'form',
        name: 'Customer Onboarding',
        description: 'Collect customer information',
        order: 1,
        config: { fields: ['name', 'email', 'phone'] }
      },
      {
        id: 'b2',
        type: 'shootInspect',
        name: 'Vehicle Photography',
        description: 'Capture vehicle images',
        order: 2,
        config: { angles: ['front', 'back', 'sides'], mandatory: true }
      }
    ],
    isActive: true,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  }
];