// src/app/p/[token]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

interface Question {
  id: string;
  question_text: string;
  question_type: string;
  order_index?: number;
}

interface PublicFormPageProps {
  params: {
    token: string;
  };
}

export default function PublicFormPage({ params }: PublicFormPageProps) {
  const router = useRouter();
  const { token } = params;
  const supabase = createClientComponentClient();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [empresaId, setEmpresaId] = useState('');

  // Validar token e carregar perguntas
  useEffect(() => {
    const validateAndLoadQuestions = async () => {
      if (typeof window !== 'undefined') {
        const sessionToken = sessionStorage.getItem('evaluation_token');
        const sessionEmpresaId = sessionStorage.getItem('empresa_id');
        
        // Validar token
        if (!sessionToken || sessionToken !== token) {
          router.push('/');
          return;
        }

        if (sessionEmpresaId) {
          setEmpresaId(sessionEmpresaId);
        }
      }

      try {
        // Buscar perguntas do tipo 'person' da tabela questions
        const { data: questionsData, error: questionsError } = await supabase
          .from('questions')
          .select('id, question_text, question_type, order_index')
          .eq('question_type', 'person')
          .order('order_index', { ascending: true })
          .limit(6);

        if (questionsError) {
          console.error('Erro ao buscar perguntas:', questionsError);
          setError('Erro ao carregar perguntas. Tente novamente.');
          return;
        }

        if (!questionsData || questionsData.length === 0) {
          setError('Nenhuma pergunta encontrada para avaliação.');
          return;
        }

        setQuestions(questionsData);
      } catch (err) {
        console.error('Erro ao carregar perguntas:', err);
        setError('Erro ao carregar perguntas. Tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };

    validateAndLoadQuestions();
  }, [token, router, supabase]);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    try {
      // Criar registro na tabela people
      const { data: personData, error: personError } = await supabase
        .from('people')
        .insert({
          company_id: empresaId,
          evaluation_token: token,
          created_at: new Date().toISOString(),
          status: 'completed'
        })
        .select()
        .single();

      if (personError) {
        throw new Error(`Erro ao criar pessoa: ${personError.message}`);
      }

      // Criar registros na tabela answers
      const answersToInsert = Object.entries(answers).map(([questionId, answer]) => ({
        person_id: personData.id,
        question_id: questionId,
        answer_text: answer.trim(),
        created_at: new Date().toISOString()
      }));

      const { error: answersError } = await supabase
        .from('answers')
        .insert(answersToInsert);

      if (answersError) {
        throw new Error(`Erro ao salvar respostas: ${answersError.message}`);
      }

      // Limpar dados da sessão
      if (typeof window !== 'undefined') {
        sessionStorage.removeItem('evaluation_token');
        sessionStorage.removeItem('empresa_id');
        sessionStorage.removeItem('evaluation_start_time');
      }

      // Redirect para página de sucesso
      router.push('/p/obrigado');

    } catch (err) {
      console.error('Erro ao enviar avaliação:', err);
      setError('Erro ao enviar avaliação. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando perguntas...</p>
        </div>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const isLastStep = currentStep === questions.length - 1;
  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentAnswer = answers[currentQuestion?.id] || '';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Avaliação Cultural
          </h1>
          <p className="text-gray-600">
            Suas respostas nos ajudarão a entender melhor o alinhamento cultural
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Pergunta {currentStep + 1} de {questions.length}</span>
            <span>{Math.round(progress)}% completo</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <span className="text-blue-600 font-semibold text-lg">
                  {currentStep + 1}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                {currentQuestion?.question_text}
              </h2>
            </div>
          </div>

          {/* Answer Input */}
          <div className="mb-8">
            <textarea
              className="w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none text-gray-700"
              rows={5}
              placeholder="Digite sua resposta de forma detalhada..."
              value={currentAnswer}
              onChange={(e) => handleAnswerChange(currentQuestion.id, e.target.value)}
              maxLength={1000}
            />
            <div className="text-right text-sm text-gray-500 mt-2">
              {currentAnswer.length}/1000 caracteres
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-400 text-red-700">
              <p className="font-medium">Erro:</p>
              <p>{error}</p>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center px-6 py-3 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </button>

            <div className="text-center text-sm text-gray-500">
              {currentAnswer.trim().length === 0 && "Digite uma resposta para continuar"}
            </div>

            {isLastStep ? (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || currentAnswer.trim().length === 0}
                className="flex items-center px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Finalizar Avaliação
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleNext}
                disabled={currentAnswer.trim().length === 0}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Próxima
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Steps Indicator */}
        <div className="flex justify-center space-x-3 mb-4">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index < currentStep 
                  ? 'bg-green-500' 
                  : index === currentStep 
                  ? 'bg-blue-600' 
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center text-sm text-gray-500">
          <p>Suas respostas são confidenciais e serão usadas apenas para análise de compatibilidade cultural.</p>
        </div>
      </div>
    </div>
  );
}