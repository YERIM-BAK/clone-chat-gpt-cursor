import { openai } from '@ai-sdk/openai';
import { convertToModelMessages, streamText, UIMessage } from 'ai';
import { AI_CONFIG, ERROR_MESSAGES, HTTP_STATUS } from '@/app/lib/ai-config';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    // Validate messages
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: ERROR_MESSAGES.INVALID_MESSAGES }),
        { 
          status: HTTP_STATUS.BAD_REQUEST, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    // Check if OpenAI API key is configured
    if (!process.env.OPENAI_API_KEY) {
      console.error('OPENAI_API_KEY is not configured');
      return new Response(
        JSON.stringify({ error: ERROR_MESSAGES.NO_API_KEY }),
        { 
          status: HTTP_STATUS.INTERNAL_SERVER_ERROR, 
          headers: { 'Content-Type': 'application/json' } 
        }
      );
    }

    const result = streamText({
      model: openai(AI_CONFIG.model),
      system: AI_CONFIG.systemPrompt,
      messages: convertToModelMessages(messages),
      temperature: AI_CONFIG.temperature,
      maxTokens: AI_CONFIG.maxTokens,
    });

    return result.toUIMessageStreamResponse();

  } catch (error) {
    console.error('Error in chat API:', error);
    
    // Handle different types of errors
    if (error instanceof Error) {
      if (error.message.includes('API key') || error.message.includes('authentication')) {
        return new Response(
          JSON.stringify({ error: ERROR_MESSAGES.INVALID_API_KEY }),
          { 
            status: HTTP_STATUS.UNAUTHORIZED, 
            headers: { 'Content-Type': 'application/json' } 
          }
        );
      }
      
      if (error.message.includes('rate limit') || error.message.includes('quota')) {
        return new Response(
          JSON.stringify({ error: ERROR_MESSAGES.RATE_LIMIT }),
          { 
            status: HTTP_STATUS.RATE_LIMIT, 
            headers: { 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    return new Response(
      JSON.stringify({ error: ERROR_MESSAGES.UNEXPECTED_ERROR }),
      { 
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
}
