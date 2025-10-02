import type { ChaseupRule } from '@/types/entities';

export const mockChaseupRules: ChaseupRule[] = [
  {
    id: '1',
    company: 'AutoCorp Insurance',
    type: 'event',
    activationDate: '2024-01-01',
    utcSendingTime: {
      hour: 9,
      minute: 0
    },
    affectedStatuses: {
      inspectionCreated: true,
      inspectionInProgress: true,
      detectionFinished: false,
      damageReviewOngoing: false,
      completed: false,
      chasedUpManually: false
    },
    firstDelayDays: 1,
    secondDelayDays: 3,
    maxSendings: 2,
    firstReminder: {
      webhook: { enabled: true },
      user: {
        enabled: true,
        sms: true,
        email: true,
        templates: {
          en: {
            email: {
              subject: 'Inspection Reminder',
              content: 'Please complete your vehicle inspection.'
            },
            sms: {
              content: 'Reminder: Complete your inspection'
            }
          }
        }
      },
      customer: {
        enabled: true,
        sms: true,
        email: false,
        templates: {
          en: {
            email: { subject: '', content: '' },
            sms: { content: 'Your inspection is pending' }
          }
        }
      },
      emailAddress: {
        enabled: false,
        address: '',
        sms: false,
        email: false,
        templates: {
          en: {
            email: { subject: '', content: '' },
            sms: { content: '' }
          }
        }
      }
    },
    secondReminder: {
      webhook: { enabled: false },
      user: {
        enabled: true,
        sms: false,
        email: true,
        templates: {
          en: {
            email: {
              subject: 'Final Inspection Reminder',
              content: 'This is your final reminder to complete the inspection.'
            },
            sms: { content: '' }
          }
        }
      },
      customer: {
        enabled: true,
        sms: true,
        email: true,
        templates: {
          en: {
            email: {
              subject: 'Final Notice',
              content: 'Please complete your inspection immediately.'
            },
            sms: {
              content: 'Final reminder: Complete inspection now'
            }
          }
        }
      },
      emailAddress: {
        enabled: false,
        address: '',
        sms: false,
        email: false,
        templates: {
          en: {
            email: { subject: '', content: '' },
            sms: { content: '' }
          }
        }
      }
    },
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-15T10:30:00Z'
  }
];