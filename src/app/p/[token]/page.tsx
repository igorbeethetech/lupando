import { notFound } from 'next/navigation';
import N8nChatWidget from '@/components/chat/N8nChatWidget';

interface PersonEvaluationPageProps {
  params: {
    token: string;
  };
}

export default function PersonEvaluationPage({ params }: PersonEvaluationPageProps) {
  const { token } = params;
  
  // Validate the token before showing the chat interface
  if (!token) {
    return notFound();
  }
  
  // Initial welcome message
  const initialMessages = [
    {
      id: '1',
      content: 'Hello! I\'m Lupa, your cultural alignment assistant. I\'ll be asking you a series of questions to understand your work style and values.',
      sender: 'bot' as const,
      timestamp: new Date()
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-indigo-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-white">Lupa Cultural Evaluation</h1>
              <span className="text-indigo-200 text-sm">Token: {token}</span>
            </div>
          </div>
          
          {/* Chat interface container */}
          <div className="p-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <p className="text-gray-700 mb-4">
                Welcome to your cultural evaluation. This assessment will help determine how well you align with the company's culture.
              </p>
              <p className="text-gray-700">
                Please answer all questions honestly. There are no right or wrong answers—we're looking for authentic responses that reflect your values and work style.
              </p>
            </div>
            
            {/* n8n Chat Widget Integration */}
            <div className="h-[600px] w-full border border-gray-200 rounded-lg bg-white">
              <N8nChatWidget token={token} initialMessages={initialMessages} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
