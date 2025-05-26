"use client";

import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface N8nChatWidgetProps {
  token: string;
  initialMessages?: Message[];
}

export default function N8nChatWidget({ token, initialMessages = [] }: N8nChatWidgetProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userInput = input.trim();
    
    // Add user message to chat
    const userMessage: Message = {
      id: Date.now().toString(),
      content: userInput,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      console.log('Sending message to chat-proxy API:', { message: userInput, token });
      
      // Send message to n8n chat API via our proxy
      const response = await fetch('/api/chat-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-User-Token': token,
        },
        body: JSON.stringify({
          message: userInput,
        }),
      });

      const data = await response.json();
      console.log('Response from chat-proxy API:', data);

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      // Extract the bot response from the data
      // Handle different possible response formats from n8n
      const botContent = data.text || // Standard n8n response
                       data.response || // Our custom format
                       data.message || // Alternative format
                       data.content || // Another possible format
                       (typeof data === 'string' ? data : 'No response received');
      
      // Add bot response to chat
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botContent,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      console.error('Error sending message:', error);
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `Sorry, there was an error processing your message: ${error.message || 'Unknown error'}. Please try again.`,
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat messages area */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className="mb-4">
            <div className="flex items-start">
              {message.sender === 'bot' ? (
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">L</span>
                  </div>
                </div>
              ) : (
                <div className="flex-shrink-0 mr-3">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-700 text-xs font-bold">U</span>
                  </div>
                </div>
              )}
              <div
                className={`rounded-lg p-3 max-w-[80%] ${message.sender === 'bot' ? 'bg-indigo-100' : 'bg-gray-100'}`}
              >
                <p className="text-gray-800">{message.content}</p>
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center">
            <div className="flex-shrink-0 mr-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">L</span>
              </div>
            </div>
            <div className="bg-indigo-100 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Chat input area */}
      <div className="border-t border-gray-200 p-4">
        <form className="flex" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Type your answer here..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:ring-indigo-500 focus:border-indigo-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </form>
        <p className="mt-2 text-xs text-gray-500">
          Your responses are confidential and will only be used for cultural alignment assessment.
        </p>
      </div>
    </div>
  );
}
