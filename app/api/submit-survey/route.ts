import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { ApiError } from '@/types/error';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, answers, score, category } = body;
    
    if (!email || !answers || score === undefined || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Store the survey response in the database
    await sql`
      INSERT INTO survey_responses (email, answers, score, category)
      VALUES (${email}, ${JSON.stringify(answers)}, ${score}, ${category})
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    const err = error as ApiError;
    console.error('Error submitting survey:', {
      message: err?.message,
      stack: err?.stack
    });
    
    return NextResponse.json(
      { error: 'Failed to submit survey', details: err?.message },
      { status: 500 }
    );
  }
}
