import { NextRequest, NextResponse } from 'next/server';

const N8N_CHAT_URL = 'https://dinastia-n8n-webhook.ntr0nd.easypanel.host/webhook/7eb4740d-e9b5-4143-8b28-80405d24db32/chat';
const N8N_USERNAME = 'lupaService';
const N8N_PASSWORD = 'Lupa@2025!!';

export async function POST(request: NextRequest) {
  try {
    const { message, token } = await request.json();

    if (!message || !token) {
      return NextResponse.json(
        { error: 'Message and token are required' },
        { status: 400 }
      );
    }

    console.log('Sending message to n8n chat service:', { message, token });

    // Create Basic Auth header
    const authHeader = 'Basic ' + Buffer.from(`${N8N_USERNAME}:${N8N_PASSWORD}`).toString('base64');

    // Send request to n8n chat service
    const response = await fetch(N8N_CHAT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader,
      },
      body: JSON.stringify({
        message,
        token,
      }),
    });

    // Log the raw response for debugging
    const responseText = await response.text();
    console.log('Raw response from n8n:', responseText);

    if (!response.ok) {
      console.error('Error from n8n chat service:', responseText);
      return NextResponse.json(
        { error: 'Failed to communicate with chat service' },
        { status: response.status }
      );
    }

    // Parse the response text as JSON if possible
    let data;
    try {
      data = JSON.parse(responseText);
    } catch (parseError) {
      // If it's not valid JSON, use the text as the response
      console.log('Response is not valid JSON, using text as response');
      return NextResponse.json({ response: responseText || 'No response from chat service' });
    }

    // Handle different response formats
    const botResponse = data.response || data.message || data.text || data.content || responseText;
    console.log('Processed response:', botResponse);
    
    return NextResponse.json({ response: botResponse });
  } catch (error: any) {
    console.error('Error in chat API route:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred' },
      { status: 500 }
    );
  }
}
