// Google Gemini AI client initialization
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
let genAI: GoogleGenerativeAI | null = null;

/**
 * Get or initialize the Gemini API client
 * @throws Error if GEMINI_API_KEY is not configured
 */
export function getGeminiClient(): GoogleGenerativeAI {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not configured');
    }
    
    try {
      genAI = new GoogleGenerativeAI(apiKey);
    } catch (error) {
      throw new Error(`Failed to initialize Gemini API client: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
  
  return genAI;
}

/**
 * Get the Gemini model instance for generating insights
 * Uses gemini-pro model for text generation
 */
export function getGeminiModel() {
  const client = getGeminiClient();
  return client.getGenerativeModel({ model: 'gemini-pro' });
}
