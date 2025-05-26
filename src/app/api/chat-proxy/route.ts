import { NextRequest, NextResponse } from 'next/server';

const N8N_CHAT_URL = 'https://dinastia-n8n-webhook.ntr0nd.easypanel.host/webhook/7eb4740d-e9b5-4143-8b28-80405d24db32/chat';
const N8N_USERNAME = 'lupaService';
const N8N_PASSWORD = 'Lupa@2025!!';

/**
 * This route acts as a proxy between the client-side n8n chat component
 * and the actual n8n webhook endpoint. It adds the necessary authentication
 * headers and passes along the user's token.
 */
export async function POST(request: NextRequest) {
  try {
    console.log('=== CHAT PROXY REQUEST RECEIVED ===');
    
    // Get the token from the headers
    const token = request.headers.get('X-User-Token');
    console.log('User token from headers:', token);
    
    if (!token) {
      console.log('Error: No token provided in headers');
      return NextResponse.json(
        { error: 'User token is required' },
        { status: 400 }
      );
    }

    // Create Basic Auth header
    const authHeader = 'Basic ' + Buffer.from(`${N8N_USERNAME}:${N8N_PASSWORD}`).toString('base64');
    console.log('Basic Auth header created (credentials hidden)');
    
    // Get the request body
    const body = await request.json();
    console.log('Request body received:', body);
    
    // Format the request body according to n8n chat API requirements
    // The n8n chat API expects a specific format with 'text' field for the message
    const formattedBody = {
      text: body.message || '',
      sessionId: token, // Use token as sessionId for conversation tracking
      // Include any other required fields for n8n chat API
    };
    
    console.log('Formatted request body for n8n:', formattedBody);
    console.log('N8N Chat URL:', N8N_CHAT_URL);

    // Forward the request to n8n
    console.log('Sending request to n8n...');
    
    try {
      const response = await fetch(N8N_CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': authHeader,
        },
        body: JSON.stringify(formattedBody),
      });
      
      console.log('Response status from n8n:', response.status);

      // Get the response text first for logging
      const responseText = await response.text();
      console.log('Raw response from n8n:', responseText);
      
      // If the response is not OK, handle it appropriately
      if (!response.ok) {
        console.error('Error response from n8n:', response.status, responseText);
        return NextResponse.json(
          { error: `n8n service error: ${response.status}`, details: responseText },
          { status: 502 } // Use 502 Bad Gateway for upstream service errors
        );
      }
      
      // Parse the response as JSON if possible
      let responseData;
      try {
        responseData = JSON.parse(responseText);
        console.log('Parsed response data:', responseData);
      } catch (parseError) {
        console.log('Response is not valid JSON, using text as response');
        // If it's not JSON, create a simple response object
        responseData = { text: responseText };
      }

      // Return the response to the client
      console.log('Sending response back to client:', responseData);
      return NextResponse.json(responseData);
      
    } catch (fetchError: any) {
      // Handle network errors or other fetch-related errors
      console.error('Fetch error when calling n8n:', fetchError);
      return NextResponse.json(
        { error: 'Failed to connect to chat service', details: fetchError.message },
        { status: 503 } // Service Unavailable
      );
    }
    
  } catch (error: any) {
    console.error('Error in chat proxy:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
