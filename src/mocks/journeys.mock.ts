import type { InspectionJourney } from '../types';

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
        order: 1
      },
      {
        id: 'b2',
        type: 'shootInspect',
        name: 'Vehicle Photography',
        description: 'Capture vehicle images',
        order: 2
      }
    ],
    isActive: true
  }
];