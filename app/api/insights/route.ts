// API route for generating AI-powered energy insights
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getGeminiModel } from '@/lib/geminiClient';
import { EnergyReading } from '@/lib/types';

// Timeout duration for Gemini API calls (10 seconds)
const GEMINI_TIMEOUT_MS = 10000;

/**
 * POST /api/insights
 * Generates AI-powered insights based on user's energy readings
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { energyData } = body as { energyData: EnergyReading[] };

    if (!energyData || !Array.isArray(energyData)) {
      return NextResponse.json(
        { error: 'Invalid request: energyData array is required' },
        { status: 400 }
      );
    }

    // Validate user authentication via Supabase JWT
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized: Missing or invalid authorization header' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    
    // Create Supabase client with the user's token
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // Verify the token by getting the user
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized: Invalid token' },
        { status: 401 }
      );
    }

    // Format energy readings data for Gemini prompt
    const formattedData = energyData.map(reading => ({
      date: reading.date,
      type: reading.type,
      usage: reading.usage,
      notes: reading.notes || ''
    }));

    // Construct prompt for Gemini
    const prompt = `Analyze the following household energy usage data:

${JSON.stringify(formattedData, null, 2)}

Provide:
1. A 2-3 sentence summary of recent trends (increases, decreases, patterns)
2. Three specific, actionable recommendations for reducing energy consumption

Format the response as natural, friendly language suitable for homeowners.`;

    // Call Gemini API with timeout handling
    const model = getGeminiModel();
    
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('Request timeout')), GEMINI_TIMEOUT_MS);
    });

    const generationPromise = model.generateContent(prompt);

    const result = await Promise.race([generationPromise, timeoutPromise]) as any;

    if (!result || !result.response) {
      throw new Error('Invalid response from Gemini API');
    }

    // Parse and format AI response
    const responseText = result.response.text();
    
    // Extract summary and recommendations from the response
    // The response should contain both summary and recommendations
    const insights = {
      summary: responseText,
      recommendations: [], // Gemini will format this in the text
      generatedAt: new Date().toISOString()
    };

    return NextResponse.json(insights, { status: 200 });

  } catch (error) {
    console.error('Error generating insights:', error);

    // Handle specific error types
    if (error instanceof Error) {
      if (error.message === 'Request timeout') {
        return NextResponse.json(
          { error: 'Request timeout: AI insights generation took too long' },
          { status: 504 }
        );
      }
      
      if (error.message.includes('GEMINI_API_KEY')) {
        return NextResponse.json(
          { error: 'Server configuration error' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Failed to generate insights. Please try again later.' },
      { status: 500 }
    );
  }
}
