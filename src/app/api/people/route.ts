import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request: NextRequest) {
  try {
    console.log('People API route called');
    const requestBody = await request.json();
    console.log('Request body:', JSON.stringify(requestBody));
    
    const { companyId } = requestBody;
    
    if (!companyId) {
      console.error('Invalid request data: Company ID is required');
      return NextResponse.json(
        { error: 'Company ID is required' },
        { status: 400 }
      );
    }
    
    console.log('Using supabaseAdmin client to bypass RLS');
    
    // Generate a new token
    const token = uuidv4();
    console.log('Generated token:', token, 'for company ID:', companyId);
    
    // Insert the new person with the company ID
    const { data, error } = await supabaseAdmin
      .from('people')
      .insert([{
        token,
        company_id: companyId
      }])
      .select();
    
    if (error) {
      console.error('Error creating person:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ token, personId: data[0].id });
  } catch (error: any) {
    console.error('Error in people API route:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
