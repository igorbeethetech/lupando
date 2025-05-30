import { notFound } from 'next/navigation';
import MultiStepForm from '@/components/MultiStepForm';

interface PersonEvaluationPageProps {
  params: {
    token: string;
  };
}

export default function PersonEvaluationPage({ params }: PersonEvaluationPageProps) {
  const { token } = params;

  // Validate the token before showing the form
  if (!token) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-indigo-600 px-6 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-white">Lupa Cultural Evaluation</h1>
              <span className="text-indigo-200 text-sm">Token: {token}</span>
            </div>
          </div>
          <div className="p-6">
            <h1>Complete the Form</h1>
            <MultiStepForm />
          </div>
        </div>
      </div>
    </div>
  );
}

