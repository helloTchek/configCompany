export interface ShootSideTemplate {
  id: string;
  name: string;
  category: 'exterior' | 'interior' | 'additional';
  subcategory?: string;
  angle?: number;
  thumbUrl: string;
  overlayUrl?: string;
  description: string;
}

const BASE_URL = 'https://webapp.tchek.fr/assets/images/shoot-sides';
const OVERLAY_BASE_URL = `${BASE_URL}/overlay`;

export const SHOOT_SIDES_TEMPLATES: ShootSideTemplate[] = [
  // EXTERIOR - FRONT
  {
    id: 'front',
    name: 'Front',
    category: 'exterior',
    subcategory: 'front',
    angle: 0,
    thumbUrl: `${BASE_URL}/front@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/front.svg`,
    description: 'Front view of the vehicle'
  },
  {
    id: 'frontInspect',
    name: 'Front Inspect',
    category: 'exterior',
    subcategory: 'front',
    angle: 1,
    thumbUrl: `${BASE_URL}/frontInspect@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/front.svg`,
    description: 'Front inspection view'
  },
  {
    id: 'frontT34Driver',
    name: 'Front 3/4 Driver',
    category: 'exterior',
    subcategory: 'front',
    angle: 2,
    thumbUrl: `${BASE_URL}/frontT34Driver@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/frontT34Driver.svg`,
    description: 'Front three-quarter driver side'
  },
  {
    id: 'frontT34DriverInspect',
    name: 'Front 3/4 Driver Inspect',
    category: 'exterior',
    subcategory: 'front',
    angle: 3,
    thumbUrl: `${BASE_URL}/frontT34DriverInspect@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/frontT34DriverInspectLandscape.svg`,
    description: 'Front three-quarter driver side close-up'
  },
  {
    id: 'frontT34Passenger',
    name: 'Front 3/4 Passenger',
    category: 'exterior',
    subcategory: 'front',
    angle: 16,
    thumbUrl: `${BASE_URL}/frontT34Passenger@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/frontT34Passenger.svg`,
    description: 'Front three-quarter passenger side'
  },
  {
    id: 'frontT34PassengerInspect',
    name: 'Front 3/4 Passenger Inspect',
    category: 'exterior',
    subcategory: 'front',
    angle: 17,
    thumbUrl: `${BASE_URL}/frontT34PassengerInspect@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/frontT34PassengerInspectLandscape.svg`,
    description: 'Front three-quarter passenger side close-up'
  },

  // EXTERIOR - SIDE DRIVER
  {
    id: 'sideDriver',
    name: 'Side Driver',
    category: 'exterior',
    subcategory: 'side',
    angle: 4,
    thumbUrl: `${BASE_URL}/sideDriver@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/sideDriver.svg`,
    description: 'Driver side view'
  },
  {
    id: 'sideDriverFrontInspect',
    name: 'Side Driver Front Inspect',
    category: 'exterior',
    subcategory: 'side',
    angle: 5,
    thumbUrl: `${BASE_URL}/sideDriverFrontInspect@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/sideDriverFrontInspect.svg`,
    description: 'Driver side front close-up'
  },
  {
    id: 'sideDriverBackInspect',
    name: 'Side Driver Back Inspect',
    category: 'exterior',
    subcategory: 'side',
    angle: 6,
    thumbUrl: `${BASE_URL}/sideDriverBackInspect@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/sideDriverBackInspect.svg`,
    description: 'Driver side back close-up'
  },

  // EXTERIOR - SIDE PASSENGER
  {
    id: 'sidePassenger',
    name: 'Side Passenger',
    category: 'exterior',
    subcategory: 'side',
    angle: 13,
    thumbUrl: `${BASE_URL}/sidePassenger@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/sidePassenger.svg`,
    description: 'Passenger side view'
  },
  {
    id: 'sidePassengerFrontInspect',
    name: 'Side Passenger Front Inspect',
    category: 'exterior',
    subcategory: 'side',
    angle: 15,
    thumbUrl: `${BASE_URL}/sidePassengerFrontInspect@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/sidePassengerFrontInspect.svg`,
    description: 'Passenger side front close-up'
  },
  {
    id: 'sidePassengerBackInspect',
    name: 'Side Passenger Back Inspect',
    category: 'exterior',
    subcategory: 'side',
    angle: 14,
    thumbUrl: `${BASE_URL}/sidePassengerBackInspect@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/sidePassengerBackInspect.svg`,
    description: 'Passenger side back close-up'
  },

  // EXTERIOR - BACK
  {
    id: 'back',
    name: 'Back',
    category: 'exterior',
    subcategory: 'back',
    angle: 9,
    thumbUrl: `${BASE_URL}/back@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/back.svg`,
    description: 'Rear view of the vehicle'
  },
  {
    id: 'backInspect',
    name: 'Back Inspect',
    category: 'exterior',
    subcategory: 'back',
    angle: 10,
    thumbUrl: `${BASE_URL}/backInspect@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/back.svg`,
    description: 'Rear inspection view'
  },
  {
    id: 'backT34Driver',
    name: 'Back 3/4 Driver',
    category: 'exterior',
    subcategory: 'back',
    angle: 7,
    thumbUrl: `${BASE_URL}/backT34Driver@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/backT34Driver.svg`,
    description: 'Rear three-quarter driver side'
  },
  {
    id: 'backT34DriverInspect',
    name: 'Back 3/4 Driver Inspect',
    category: 'exterior',
    subcategory: 'back',
    angle: 8,
    thumbUrl: `${BASE_URL}/backT34DriverInspect@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/backT34DriverInspectLandscape.svg`,
    description: 'Rear three-quarter driver side close-up'
  },
  {
    id: 'backT34Passenger',
    name: 'Back 3/4 Passenger',
    category: 'exterior',
    subcategory: 'back',
    angle: 11,
    thumbUrl: `${BASE_URL}/backT34Passenger@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/backT34Passenger.svg`,
    description: 'Rear three-quarter passenger side'
  },
  {
    id: 'backT34PassengerInspect',
    name: 'Back 3/4 Passenger Inspect',
    category: 'exterior',
    subcategory: 'back',
    angle: 12,
    thumbUrl: `${BASE_URL}/backT34PassengerInspect@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/backT34PassengerInspectLandscape.svg`,
    description: 'Rear three-quarter passenger side close-up'
  },

  // INTERIOR
  {
    id: 'frontSeatDriver',
    name: 'Front Seat Driver',
    category: 'interior',
    subcategory: 'seats',
    thumbUrl: `${BASE_URL}/frontSeatDriver@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/frontSeatDriver.svg`,
    description: 'Front seats view'
  },
  {
    id: 'frontSeatPassenger',
    name: 'Front Seat Passenger',
    category: 'interior',
    subcategory: 'seats',
    thumbUrl: `${BASE_URL}/frontSeatPassenger@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/frontSeatPassenger.svg`,
    description: 'Front passenger seat'
  },
  {
    id: 'backSeatDriver',
    name: 'Back Seat Driver',
    category: 'interior',
    subcategory: 'seats',
    thumbUrl: `${BASE_URL}/backSeatDriver@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/backSeatDriver.svg`,
    description: 'Rear seats view'
  },
  {
    id: 'backSeatPassenger',
    name: 'Back Seat Passenger',
    category: 'interior',
    subcategory: 'seats',
    thumbUrl: `${BASE_URL}/backSeatPassenger@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/backSeatPassenger.svg`,
    description: 'Rear passenger seat'
  },
  {
    id: 'dashboard',
    name: 'Dashboard',
    category: 'interior',
    subcategory: 'dashboard',
    thumbUrl: `${BASE_URL}/dashboard@2x.png`,
    description: 'Dashboard and central console'
  },
  {
    id: 'speedometer',
    name: 'Speedometer',
    category: 'interior',
    subcategory: 'dashboard',
    thumbUrl: `${BASE_URL}/speedometer@2x.png`,
    description: 'Speedometer and odometer'
  },
  {
    id: 'boardComputer',
    name: 'Board Computer',
    category: 'interior',
    subcategory: 'dashboard',
    thumbUrl: `${BASE_URL}/boardComputer@2x.png`,
    description: 'On-board computer'
  },
  {
    id: 'gearLever',
    name: 'Gear Lever',
    category: 'interior',
    subcategory: 'dashboard',
    thumbUrl: `${BASE_URL}/gearLever@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/gearLever.svg`,
    description: 'Gear lever'
  },
  {
    id: 'steeringWheel',
    name: 'Steering Wheel',
    category: 'interior',
    subcategory: 'dashboard',
    thumbUrl: `${BASE_URL}/steeringWheel@2x.png`,
    description: 'Steering wheel'
  },
  {
    id: 'roofLining',
    name: 'Roof Lining / Panoramic Roof',
    category: 'interior',
    subcategory: 'other',
    thumbUrl: `${BASE_URL}/roofLining@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/roofLining.svg`,
    description: 'Interior roof or panoramic roof'
  },
  {
    id: 'trunk',
    name: 'Trunk',
    category: 'interior',
    subcategory: 'other',
    thumbUrl: `${BASE_URL}/trunk@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/trunk.svg`,
    description: 'Trunk/boot interior'
  },
  {
    id: 'motor',
    name: 'Motor / Engine',
    category: 'interior',
    subcategory: 'other',
    thumbUrl: `${BASE_URL}/motor@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/motor.svg`,
    description: 'Engine compartment'
  },
  {
    id: 'media',
    name: 'Media System',
    category: 'interior',
    subcategory: 'dashboard',
    thumbUrl: `${BASE_URL}/media@2x.png`,
    overlayUrl: `${OVERLAY_BASE_URL}/media.svg`,
    description: 'Multimedia system'
  },

  // ADDITIONAL / DOCUMENTS
  {
    id: 'vin',
    name: 'VIN',
    category: 'additional',
    subcategory: 'documents',
    thumbUrl: `${BASE_URL}/vin@2x.png`,
    description: 'Vehicle Identification Number'
  },
  {
    id: 'grayCard',
    name: 'Gray Card',
    category: 'additional',
    subcategory: 'documents',
    thumbUrl: `${BASE_URL}/grayCard.png`,
    description: 'Vehicle registration certificate'
  },
  {
    id: 'grayCardBE1',
    name: 'Gray Card BE (Front)',
    category: 'additional',
    subcategory: 'documents',
    thumbUrl: `${BASE_URL}/grayCardBE1@2x.png`,
    description: 'Belgian registration certificate - front'
  },
  {
    id: 'invoice',
    name: 'Invoice',
    category: 'additional',
    subcategory: 'documents',
    thumbUrl: `${BASE_URL}/invoice@2x.png`,
    description: 'Invoice or purchase document'
  },
  {
    id: 'technicalControl',
    name: 'Technical Control',
    category: 'additional',
    subcategory: 'documents',
    thumbUrl: `${BASE_URL}/technicalControl@2x.png`,
    description: 'Technical inspection certificate'
  },
  {
    id: 'carRoof',
    name: 'Car Roof',
    category: 'additional',
    subcategory: 'exterior',
    thumbUrl: `${BASE_URL}/carRoof@2x.png`,
    description: 'Roof exterior view'
  }
];

// Helper functions to filter templates
export const getTemplatesByCategory = (category: 'exterior' | 'interior' | 'additional') => {
  return SHOOT_SIDES_TEMPLATES.filter(t => t.category === category);
};

export const getTemplatesBySubcategory = (subcategory: string) => {
  return SHOOT_SIDES_TEMPLATES.filter(t => t.subcategory === subcategory);
};

export const getTemplateByAngle = (angle: number) => {
  return SHOOT_SIDES_TEMPLATES.find(t => t.angle === angle);
};

export const getTemplateById = (id: string) => {
  return SHOOT_SIDES_TEMPLATES.find(t => t.id === id);
};

// Categories for grouping in UI
export const TEMPLATE_CATEGORIES = {
  exterior: {
    label: 'Exterior',
    subcategories: ['front', 'side', 'back']
  },
  interior: {
    label: 'Interior',
    subcategories: ['seats', 'dashboard', 'other']
  },
  additional: {
    label: 'Additional',
    subcategories: ['documents', 'exterior']
  }
};
