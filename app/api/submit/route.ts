import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { ApiError } from '@/types/error';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Received survey submission:', body);
    
    const { email, answers, score, category } = body;
    
    if (!email || !answers || score === undefined || !category) {
      console.error('Missing required fields:', { email, answers, score, category });
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    console.log('Attempting database insertion...');
    
    // Store the survey response in the database
    await sql`
      INSERT INTO survey_responses (email, answers, score, category)
      VALUES (${email}, ${JSON.stringify(answers)}, ${score}, ${category})
    `;

    console.log('Survey stored successfully');
    return NextResponse.json({ success: true });
  } catch (error) {
    // Log the full error details
    const err = error as ApiError;
    const errorDetails = {
      message: err?.message || 'Unknown error',
      stack: err?.stack || 'No stack trace'
    };
    
    console.error('Detailed error submitting survey:', errorDetails);
    
    return NextResponse.json(
      { error: 'Failed to submit survey', details: errorDetails.message },
      { status: 500 }
    );
  }
}
