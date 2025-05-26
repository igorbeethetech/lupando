"use client";

import { useState, useEffect } from 'react';
import { useQuestions } from '@/hooks/useQuestions';
import { useCompanyAnswers, useSubmitCompanyAnswers } from '@/hooks/useCompanyAnswers';

export default function CompanyEvaluationPage() {
  const { data: questionsData, isLoading: isLoadingQuestions, error: questionsError } = useQuestions();
  const { data: answersData, isLoading: isLoadingAnswers } = useCompanyAnswers();
  const submitAnswers = useSubmitCompanyAnswers();
  
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  
  
  useEffect(() => {
    if (answersData && answersData.length > 0) {
      const values: Record<string, string> = {};
      answersData.forEach(answer => {
        values[answer.question_id] = answer.answer_value;
      });
      setFormValues(values);
      setHasAnswered(true); // ✅ travar campos e botão
    }
  }, [answersData]);
  
  
  
  // Lidar com mudanças nos campos do formulário
  const handleChange = (questionId: string, value: string) => {
    setFormValues(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  // Enviar o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setFormError(null);
      setFormSuccess(null);
      
      // Converter formValues para o formato esperado pela API
      const answers = Object.entries(formValues).map(([question_id, value]) => ({
        question_id,
        answer_value: value
      }));
      
      // Verificar se todas as perguntas foram respondidas
      if (questionsData?.data && answers.length < questionsData.data.length) {
        throw new Error('Por favor, responda todas as perguntas antes de enviar.');
      }
      
      const result = await submitAnswers.mutateAsync(answers);
      
      if (result.error) {
        throw new Error(result.error.message);
      }
      
      setFormSuccess('Avaliação da empresa salva com sucesso!');
    } catch (error: any) {
      setFormError(error.message || 'Ocorreu um erro ao salvar a avaliação.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Avaliação da Empresa</h1>
      
      {/* Status de carregamento */}
      {(isLoadingQuestions || isLoadingAnswers) && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
        </div>
      )}
      
      {/* Erros */}
      {questionsError && (
        <div className="bg-red-50 p-4 rounded-md mb-6">
          <p className="text-red-700">Erro ao carregar perguntas: {questionsError.message}</p>
        </div>
      )}
      
      {formError && (
        <div className="bg-red-50 p-4 rounded-md mb-6">
          <p className="text-red-700">{formError}</p>
        </div>
      )}
      
      {/* Sucesso */}
      {formSuccess && (
        <div className="bg-green-50 p-4 rounded-md mb-6">
          <p className="text-green-700">{formSuccess}</p>
        </div>
      )}
      
      {/* Formulário de Avaliação - Só exibe quando os dados estiverem carregados */}
      {!isLoadingQuestions && !isLoadingAnswers && questionsData?.data && (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Defina a Cultura da Sua Empresa</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Responda estas perguntas para nos ajudar a entender os valores culturais e prioridades da sua empresa.
            </p>
          </div>
          
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {questionsData.data.map(question => (
                <div key={question.id}>
                  <label htmlFor={question.id} className="block text-sm font-medium text-gray-700 mb-2">
                    {question.question_text}
                  </label>
                  <div className="mt-1">
                  <textarea
                    id={question.id}
                    rows={4}
                    className={`block w-full sm:text-sm rounded-md p-4 shadow-sm border ${
                      hasAnswered
                        ? 'bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed'
                        : 'focus:ring-indigo-500 focus:border-indigo-500 border-gray-300'
                    }`}
                    placeholder={question.placeholder || "Digite sua resposta..."}
                    value={formValues[question.id] || ''}
                    onChange={(e) => handleChange(question.id, e.target.value)}
                    readOnly={hasAnswered}
                    disabled={hasAnswered}
                  />
                  </div>
                </div>
              ))}
              
              {!hasAnswered && (
                <div className="pt-5">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {isSubmitting ? 'Salvando...' : 'Salvar'}
                    </button>
                  </div>
                </div>
              )}

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
