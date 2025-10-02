// Validation utilities for form data

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export interface ValidationRules {
  [field: string]: ValidationRule;
}

export interface ValidationErrors {
  [field: string]: string;
}

export function validateField(value: any, rule: ValidationRule): string | null {
  // Required validation
  if (rule.required && (!value || (typeof value === 'string' && !value.trim()))) {
    return 'This field is required';
  }

  // Skip other validations if value is empty and not required
  if (!value || (typeof value === 'string' && !value.trim())) {
    return null;
  }

  // String validations
  if (typeof value === 'string') {
    if (rule.minLength && value.length < rule.minLength) {
      return `Must be at least ${rule.minLength} characters`;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      return `Must be no more than ${rule.maxLength} characters`;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      return 'Invalid format';
    }
  }

  // Custom validation
  if (rule.custom) {
    return rule.custom(value);
  }

  return null;
}

export function validateForm(data: Record<string, any>, rules: ValidationRules): ValidationErrors {
  const errors: ValidationErrors = {};

  Object.entries(rules).forEach(([field, rule]) => {
    const error = validateField(data[field], rule);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
}

export function hasValidationErrors(errors: ValidationErrors): boolean {
  return Object.values(errors).some(error => error !== '');
}

// Common validation patterns
export const validationPatterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/.+/,
  phone: /^\+?[\d\s\-\(\)]+$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  alphanumericWithSpaces: /^[a-zA-Z0-9\s]+$/,
};

// Common validation rules
export const commonValidationRules = {
  required: { required: true },
  email: { 
    required: true, 
    pattern: validationPatterns.email,
    custom: (value: string) => {
      if (value && !validationPatterns.email.test(value)) {
        return 'Please enter a valid email address';
      }
      return null;
    }
  },
  url: { 
    pattern: validationPatterns.url,
    custom: (value: string) => {
      if (value && !validationPatterns.url.test(value)) {
        return 'Please enter a valid URL';
      }
      return null;
    }
  },
  positiveNumber: {
    custom: (value: number) => {
      if (value !== undefined && value < 0) {
        return 'Must be a positive number';
      }
      return null;
    }
  },
  percentage: {
    custom: (value: number) => {
      if (value !== undefined && (value < 0 || value > 100)) {
        return 'Must be between 0 and 100';
      }
      return null;
    }
  },
  json: {
    custom: (value: string) => {
      if (value && value.trim()) {
        try {
          JSON.parse(value);
        } catch (e) {
          return 'Must be valid JSON';
        }
      }
      return null;
    }
  }
};