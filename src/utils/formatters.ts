// Utility functions for formatting data

export function formatDate(dateString: string | undefined, locale: string = 'en-US'): string {
  if (!dateString) return 'Never';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale);
  } catch {
    return 'Invalid Date';
  }
}

export function formatDateTime(dateString: string | undefined, locale: string = 'en-US'): string {
  if (!dateString) return 'Never';
  
  try {
    const date = new Date(dateString);
    return date.toLocaleString(locale);
  } catch {
    return 'Invalid Date';
  }
}

export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}

export function formatPercentage(value: number): string {
  return `${value}%`;
}

export function formatApiToken(token: string): string {
  if (!token) return '';
  return `${token.substring(0, 12)}...`;
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}min`;
}

export function formatTime(hour: number, minute: number): string {
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function capitalizeFirst(text: string): string {
  if (!text) return '';
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatCompanyCode(name: string): string {
  return name.toUpperCase().replace(/\s+/g, '_').replace(/[^A-Z0-9_]/g, '');
}

export function formatIdentifier(name: string): string {
  return name.toUpperCase().replace(/\s+/g, '').substring(0, 5) + Date.now().toString().slice(-3);
}