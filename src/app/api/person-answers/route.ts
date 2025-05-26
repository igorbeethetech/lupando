import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

interface PersonAnswer {
  question_id: string;
  answer_value: string;
  person_id: string;
}

export async function POST(request: NextRequest) {
  try {
    console.log('Person Answers API route called');
    const requestBody = await request.json();
    console.log('Request body:', JSON.stringify(requestBody));
    
    const { answers } = requestBody;
    
    if (!answers || !Array.isArray(answers)) {
      console.error('Invalid request data:', { answers });
      return NextResponse.json(
        { error: 'Invalid request data. Answers array is required.' },
        { status: 400 }
      );
    }
    
    console.log('Using supabaseAdmin client to bypass RLS');
    
    // Insert person answers
    console.log('Inserting person answers:', JSON.stringify(answers));
    const { data, error } = await supabaseAdmin
      .from('person_answers')
      .insert(answers)
      .select();
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('Error in person-answers API route:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
