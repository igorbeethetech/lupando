import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

interface CompanyAnswer {
  question_id: string;
  answer_value: string;
}

export async function POST(request: NextRequest) {
  console.log('Company Answers API route called');
  try {
    const requestBody = await request.json();
    console.log('Request body:', JSON.stringify(requestBody));
    
    const { answers, companyId } = requestBody;
    
    if (!answers || !Array.isArray(answers) || !companyId) {
      console.error('Invalid request data:', { answers, companyId });
      return NextResponse.json(
        { error: 'Invalid request data. Answers array and companyId are required.' },
        { status: 400 }
      );
    }
    
    console.log('Using supabaseAdmin client to bypass RLS');
    
    console.log('Checking for existing answers for company:', companyId);
    // Check if answers already exist for this company
    const { data: existingAnswers, error: checkError } = await supabaseAdmin
      .from('company_answers')
      .select('question_id')
      .eq('company_id', companyId);
    
    if (checkError) {
      console.error('Error checking existing answers:', checkError);
      return NextResponse.json(
        { error: checkError.message },
        { status: 500 }
      );
    }
    
    console.log('Existing answers:', existingAnswers);
    // If answers exist, delete them first
    if (existingAnswers && existingAnswers.length > 0) {
      console.log('Deleting existing answers');
      const { error: deleteError } = await supabaseAdmin
        .from('company_answers')
        .delete()
        .eq('company_id', companyId);
      
      if (deleteError) {
        console.error('Error deleting existing answers:', deleteError);
        return NextResponse.json(
          { error: deleteError.message },
          { status: 500 }
        );
      }
    }
    
    // Prepare answers with company ID
    const answersWithCompanyId = answers.map((answer: CompanyAnswer) => ({
      question_id: answer.question_id,
      answer_value: answer.answer_value,
      company_id: companyId
    }));
    
    console.log('Inserting new answers:', JSON.stringify(answersWithCompanyId));
    // Insert new answers
    const { data, error } = await supabaseAdmin
      .from('company_answers')
      .insert(answersWithCompanyId)
      .select();
    
    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ data });
  } catch (error: any) {
    console.error('Error in company-answers API route:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
