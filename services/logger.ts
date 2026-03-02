/**
 * Logger Service
 * Centralized logging utility with different log levels
 * Only logs in development mode for security and performance
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private isEnabled: boolean;

  constructor() {
    // Only enable logging in development
    this.isEnabled = __DEV__;
  }

  /**
   * Debug level - detailed information for debugging
   */
  debug(message: string, data?: any): void {
    if (!this.isEnabled) return;
    console.debug(`[DEBUG] ${message}`, data !== undefined ? data : '');
  }

  /**
   * Info level - general informational messages
   */
  info(message: string, data?: any): void {
    if (!this.isEnabled) return;
    console.info(`[INFO] ${message}`, data !== undefined ? data : '');
  }

  /**
   * Warning level - potentially harmful situations
   */
  warn(message: string, data?: any): void {
    if (!this.isEnabled) return;
    console.warn(`[WARN] ${message}`, data !== undefined ? data : '');
  }

  /**
   * Error level - error events that might still allow the app to continue
   * Always logs errors even in production for error tracking
   */
  error(message: string, error?: any): void {
    // Always log errors, even in production
    console.error(`[ERROR] ${message}`, error !== undefined ? error : '');
  }
}

export const logger = new Logger();
