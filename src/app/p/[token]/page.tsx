// src/app/p/[token]/page.tsx
'use client';

import { useEvaluation } from '@/hooks/useEvaluation';

interface PublicFormPageProps {
  params: {
    token: string;
  };
}

export default function PublicFormPage({ params }: PublicFormPageProps) {
  const { token } = params;
  
  const {
    questions,
    currentStep,
    answers,
    isLoading,
    isSubmitting,
    error,
    progress,
    setAnswer,
    nextStep,
    previousStep,
    submitEvaluation,
    currentQuestion,
    isLastStep,
    canProceed
  } = useEvaluation({ token });

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
            <h3 className="font-medium mb-2">Erro ao carregar avaliação</h3>
            <p>{error}</p>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
          >
            Tentar novamente
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
            <p>Nenhuma pergunta encontrada para esta avaliação.</p>
            <p className="text-sm mt-2">Verifique se o link está correto ou entre em contato com o administrador.</p>
          </div>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  const currentAnswer = answers[currentQuestion.id] || '';

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Avaliação de Desempenho
            </h1>
            <p className="text-gray-600">
              Pergunta {currentStep + 1} de {questions.length}
            </p>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progresso</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Question Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-6">
              <label className="block text-lg font-medium text-gray-900 mb-4">
                {currentQuestion.label}
              </label>
              
              {/* Text Area for Answer */}
              <textarea
                value={currentAnswer}
                onChange={(e) => setAnswer(currentQuestion.id, e.target.value)}
                placeholder="Digite sua resposta aqui..."
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none transition-colors"
                disabled={isSubmitting}
                maxLength={1000}
              />
              
              {/* Character Counter */}
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-gray-500">
                  {currentAnswer.length}/1000 caracteres
                </span>
                {currentAnswer.length > 0 && (
                  <span className="text-green-600">
                    ✓ Resposta preenchida
                  </span>
                )}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={previousStep}
                disabled={currentStep === 0 || isSubmitting}
                className={`px-4 py-2 rounded-md font-medium ${
                  currentStep === 0 || isSubmitting
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Anterior
              </button>

              <div className="flex space-x-2">
                {/* Step Indicators */}
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index < currentStep
                        ? 'bg-green-500'
                        : index === currentStep
                        ? 'bg-blue-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {isLastStep ? (
                <button
                  type="button"
                  onClick={submitEvaluation}
                  disabled={!canProceed || isSubmitting}
                  className={`px-6 py-2 rounded-md font-medium ${
                    !canProceed || isSubmitting
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </div>
                  ) : (
                    'Finalizar'
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canProceed || isSubmitting}
                  className={`px-4 py-2 rounded-md font-medium ${
                    !canProceed || isSubmitting
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Próxima
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            Suas respostas são importantes para nossa avaliação. 
            Seja honesto e detalhado em suas respostas.
          </p>
          <p className="mt-2">
            💡 Dica: Você pode navegar entre as perguntas e suas respostas serão salvas automaticamente.
          </p>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <p>Suas informações são tratadas com total confidencialidade.</p>
        </div>
      </div>
    </div>
  );
}