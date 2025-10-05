/**
 * AI Configuration and utilities
 */

export const AI_CONFIG = {
  model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
  maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '1000'),
  temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
  systemPrompt: 'You are a helpful AI assistant. Provide clear, accurate, and helpful responses to user questions.',
} as const;

export const ERROR_MESSAGES = {
  NO_API_KEY: 'AI service is not configured properly',
  INVALID_MESSAGES: 'Messages array is required and cannot be empty',
  RATE_LIMIT: 'Rate limit exceeded. Please try again later.',
  INVALID_API_KEY: 'Invalid API configuration',
  UNEXPECTED_ERROR: 'An unexpected error occurred. Please try again.',
} as const;

export const HTTP_STATUS = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  RATE_LIMIT: 429,
  INTERNAL_SERVER_ERROR: 500,
} as const;
