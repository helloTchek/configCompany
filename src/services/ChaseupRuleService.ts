import type { ApiResponse, SearchParams } from '@/types/api';
import type { 
  ChaseupRule, 
  CreateChaseupRuleRequest, 
  UpdateChaseupRuleRequest,
  ChaseupReminder
} from '@/types/entities';
import { chaseupRuleRepository } from '@/repositories/ChaseupRuleRepository';

export class ChaseupRuleService {
  async getAllChaseupRules(params?: SearchParams): Promise<ApiResponse<ChaseupRule[]>> {
    try {
      return await chaseupRuleRepository.getAll(params);
    } catch (error) {
      console.error('ChaseupRuleService.getAllChaseupRules error:', error);
      throw error;
    }
  }

  async getChaseupRuleById(id: string): Promise<ApiResponse<ChaseupRule>> {
    try {
      if (!id) {
        throw {
          message: 'Chaseup rule ID is required',
          status: 400,
        };
      }

      return await chaseupRuleRepository.getById(id);
    } catch (error) {
      console.error('ChaseupRuleService.getChaseupRuleById error:', error);
      throw error;
    }
  }

  async createChaseupRule(data: CreateChaseupRuleRequest): Promise<ApiResponse<ChaseupRule>> {
    try {
      // Validate required fields
      if (!data.company?.trim()) {
        throw {
          message: 'Company is required',
          status: 400,
        };
      }

      if (!data.activationDate?.trim()) {
        throw {
          message: 'Activation date is required',
          status: 400,
        };
      }

      if (!this.isValidDate(data.activationDate)) {
        throw {
          message: 'Please enter a valid activation date',
          status: 400,
        };
      }

      // Validate UTC sending time
      this.validateUtcSendingTime(data.utcSendingTime);

      // Validate reminders
      this.validateReminder(data.firstReminder, 'First reminder');
      if (data.secondReminder) {
        this.validateReminder(data.secondReminder, 'Second reminder');
      }

      // Validate max sendings logic
      if (data.maxSendings === 2 && !data.secondReminder) {
        throw {
          message: 'Second reminder is required when max sendings is 2',
          status: 400,
        };
      }

      return await chaseupRuleRepository.create(data);
    } catch (error) {
      console.error('ChaseupRuleService.createChaseupRule error:', error);
      throw error;
    }
  }

  async updateChaseupRule(data: UpdateChaseupRuleRequest): Promise<ApiResponse<ChaseupRule>> {
    try {
      if (!data.id) {
        throw {
          message: 'Chaseup rule ID is required',
          status: 400,
        };
      }

      // Validate activation date if provided
      if (data.activationDate && !this.isValidDate(data.activationDate)) {
        throw {
          message: 'Please enter a valid activation date',
          status: 400,
        };
      }

      // Validate UTC sending time if provided
      if (data.utcSendingTime) {
        this.validateUtcSendingTime(data.utcSendingTime);
      }

      // Validate reminders if provided
      if (data.firstReminder) {
        this.validateReminder(data.firstReminder, 'First reminder');
      }

      if (data.secondReminder) {
        this.validateReminder(data.secondReminder, 'Second reminder');
      }

      return await chaseupRuleRepository.update(data);
    } catch (error) {
      console.error('ChaseupRuleService.updateChaseupRule error:', error);
      throw error;
    }
  }

  async deleteChaseupRule(id: string): Promise<ApiResponse<null>> {
    try {
      if (!id) {
        throw {
          message: 'Chaseup rule ID is required',
          status: 400,
        };
      }

      return await chaseupRuleRepository.delete(id);
    } catch (error) {
      console.error('ChaseupRuleService.deleteChaseupRule error:', error);
      throw error;
    }
  }

  async duplicateChaseupRule(id: string, newCompany: string): Promise<ApiResponse<ChaseupRule>> {
    try {
      if (!id) {
        throw {
          message: 'Chaseup rule ID is required',
          status: 400,
        };
      }

      if (!newCompany?.trim()) {
        throw {
          message: 'New company name is required',
          status: 400,
        };
      }

      return await chaseupRuleRepository.duplicate(id, newCompany);
    } catch (error) {
      console.error('ChaseupRuleService.duplicateChaseupRule error:', error);
      throw error;
    }
  }

  async getChaseupRulesByCompany(company: string): Promise<ApiResponse<ChaseupRule[]>> {
    try {
      const params: SearchParams = {
        filters: {
          company
        }
      };

      return await this.getAllChaseupRules(params);
    } catch (error) {
      console.error('ChaseupRuleService.getChaseupRulesByCompany error:', error);
      throw error;
    }
  }

  async searchChaseupRules(query: string, filters?: Record<string, any>): Promise<ApiResponse<ChaseupRule[]>> {
    try {
      const params: SearchParams = {
        query,
        filters
      };

      return await this.getAllChaseupRules(params);
    } catch (error) {
      console.error('ChaseupRuleService.searchChaseupRules error:', error);
      throw error;
    }
  }

  private isValidDate(dateString: string): boolean {
    const date = new Date(dateString);
    return date instanceof Date && !isNaN(date.getTime());
  }

  private validateUtcSendingTime(utcSendingTime: { hour: number; minute: number }): void {
    if (utcSendingTime.hour < 0 || utcSendingTime.hour > 23) {
      throw {
        message: 'Hour must be between 0 and 23',
        status: 400,
      };
    }

    if (utcSendingTime.minute < 0 || utcSendingTime.minute > 59) {
      throw {
        message: 'Minute must be between 0 and 59',
        status: 400,
      };
    }
  }

  private validateReminder(reminder: ChaseupReminder, reminderName: string): void {
    // Validate email addresses if email is enabled
    if (reminder.emailAddress.enabled && reminder.emailAddress.email) {
      if (!reminder.emailAddress.address?.trim()) {
        throw {
          message: `${reminderName}: Email address is required when email is enabled`,
          status: 400,
        };
      }

      if (!this.isValidEmail(reminder.emailAddress.address)) {
        throw {
          message: `${reminderName}: Please enter a valid email address`,
          status: 400,
        };
      }
    }

    // Validate that at least one communication method is enabled if reminder is enabled
    const hasEnabledRecipient = reminder.user.enabled || 
                               reminder.customer.enabled || 
                               reminder.emailAddress.enabled;

    if (!hasEnabledRecipient) {
      throw {
        message: `${reminderName}: At least one recipient must be enabled`,
        status: 400,
      };
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export const chaseupRuleService = new ChaseupRuleService();