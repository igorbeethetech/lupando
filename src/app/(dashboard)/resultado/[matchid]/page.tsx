"use client";

import Link from 'next/link';
import { notFound } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useMatchById } from '@/hooks/useMatches';

interface MatchResultPageProps {
  params: {
    matchid: string;
  };
}

// Mock data for detailed match results
const mockResultData = {
  id: '1',
  personName: 'Jou00e3o Silva',
  companyName: 'SoftLab',
  matchScore: 92,
  date: '2025-05-10',
  traits: [
    { name: 'Adaptability', person: 95, company: 90, alignment: 'high' },
    { name: 'Innovation', person: 88, company: 95, alignment: 'high' },
    { name: 'Collaboration', person: 90, company: 85, alignment: 'high' },
    { name: 'Accountability', person: 92, company: 90, alignment: 'high' },
    { name: 'Customer Focus', person: 94, company: 95, alignment: 'high' },
    { name: 'Work-Life Balance', person: 85, company: 80, alignment: 'medium' },
  ],
  alignmentPoints: [
    'Exceptional match in innovation and creative thinking',
    'Strong alignment on customer focus and service quality',
    'Shared commitment to accountability and results',
    'Similar values regarding adaptability to change',
  ],
  frictionPoints: [
    'Slight difference in work-life balance expectations',
  ],
  recommendations: [
    'Consider discussing expectations around work hours and flexibility during onboarding',
    'Leverage this candidate\'s strong innovation skills for creative projects',
    'Excellent cultural fit for customer-facing roles',
  ]
};

export default function MatchResultPage({ params }: MatchResultPageProps) {
  const { matchid } = params;
  const [useMockData, setUseMockData] = useState(false);
  
  // Check localStorage for mock data preference
  useEffect(() => {
    const savedPreference = localStorage.getItem('useMockData');
    if (savedPreference) {
      setUseMockData(savedPreference === 'true');
    }
  }, []);
  
  // Fetch match data using the hook
  const { data: matchData, isLoading, error } = useMatchById(matchid);
  
  // Toggle mock data
  const toggleMockData = () => {
    const newValue = !useMockData;
    setUseMockData(newValue);
    localStorage.setItem('useMockData', String(newValue));
  };
  
  // Handle loading and error states
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (error || !matchData?.data) {
    return (
      <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
        <div className="text-center text-red-500">
          <h3 className="text-lg font-medium">Erro ao carregar resultados</h3>
          <p className="mt-1">{error?.message || 'Resultado não encontrado'}</p>
          <Link 
            href="/pessoas"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            Voltar para Pessoas
          </Link>
        </div>
      </div>
    );
  }
  
  // Extract data from the match result
  const resultData = matchData.data.result_data;
  const personName = matchData.data.people?.name || 'Candidato';
  const companyName = matchData.data.companies?.name || 'Empresa';
  const matchScore = matchData.data.match_score;
  const date = new Date(matchData.data.created_at).toLocaleDateString('pt-BR');
  const traits = resultData.traits;
  const alignmentPoints = resultData.alignmentPoints;
  const frictionPoints = resultData.frictionPoints;
  const recommendations = resultData.recommendations;

  // Define types for the trait and point objects
  interface Trait {
    name: string;
    person: number;
    company: number;
    alignment: 'high' | 'medium' | 'low';
  }
  
  // Make sure all arrays are defined even if they're empty
  const safeTraits = traits || [];
  const safeAlignmentPoints = alignmentPoints || [];
  const safeFrictionPoints = frictionPoints || [];
  const safeRecommendations = recommendations || [];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Resultado da Compatibilidade</h1>
        <div className="flex items-center space-x-4">
          {/* Toggle para dados simulados */}
          <div className="flex items-center">
            <span className="mr-2 text-sm text-gray-600">Dados reais</span>
            <button
              onClick={toggleMockData}
              className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              style={{ backgroundColor: useMockData ? '#4F46E5' : '#E5E7EB' }}
            >
              <span
                className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform"
                style={{ transform: useMockData ? 'translateX(1.25rem)' : 'translateX(0.25rem)' }}
              />
            </button>
            <span className="ml-2 text-sm text-gray-600">Dados simulados</span>
          </div>
          
          <Link 
            href="/pessoas"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
          >
            Voltar para Pessoas
          </Link>
        </div>
      </div>

      {/* Conteúdo do Resultado */}
      {/* Card de Cabeçalho */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              {personName} + {companyName}
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Avaliação concluída em {date}
            </p>
          </div>
          <div className="flex items-center">
            <div className="text-3xl font-bold text-indigo-600">{matchScore}%</div>
            <div className="ml-2 px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
              Alta Compatibilidade
            </div>
          </div>
        </div>
      </div>

      {/* Visualização da Compatibilidade */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Gráfico Hexagonal */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Alinhamento Cultural</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Representação visual do alinhamento nas principais dimensões culturais.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="flex justify-center items-center h-64 relative">
              {/* Este é um espaço reservado para o gráfico hexagonal */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-48 h-48">
                  {/* Fundo hexagonal */}
                  <div className="absolute inset-0 bg-gray-100 opacity-50" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}></div>
                  
                  {/* Hexágono da empresa */}
                  <div className="absolute inset-0 bg-blue-500 opacity-40" style={{ 
                    clipPath: 'polygon(50% 5%, 95% 27%, 95% 73%, 50% 95%, 5% 73%, 5% 27%)',
                  }}></div>
                  
                  {/* Hexágono da pessoa */}
                  <div className="absolute inset-0 bg-indigo-600 opacity-60" style={{ 
                    clipPath: 'polygon(50% 10%, 90% 30%, 90% 70%, 50% 90%, 10% 70%, 10% 30%)',
                  }}></div>
                  
                  {/* Ponto central */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white border-2 border-gray-300"></div>
                  </div>
                  
                  {/* Etiquetas de características */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 text-xs font-medium">{traits[0].name}</div>
                  <div className="absolute top-1/4 right-0 transform translate-x-4 text-xs font-medium">{traits[1].name}</div>
                  <div className="absolute bottom-1/4 right-0 transform translate-x-4 text-xs font-medium">{traits[2].name}</div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4 text-xs font-medium">{traits[3].name}</div>
                  <div className="absolute bottom-1/4 left-0 transform -translate-x-4 text-xs font-medium">{traits[4].name}</div>
                  <div className="absolute top-1/4 left-0 transform -translate-x-4 text-xs font-medium">{traits[5].name}</div>
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 opacity-40 mr-2"></div>
                <span className="text-sm text-gray-500">Empresa</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-indigo-600 opacity-60 mr-2"></div>
                <span className="text-sm text-gray-500">Candidato</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Comparação de Características */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Comparação de Características</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Detalhamento do alinhamento por característica cultural.
            </p>
          </div>
          <div className="border-t border-gray-200">
            <ul className="divide-y divide-gray-200">
              {safeTraits.map((trait: Trait) => (
                <li key={trait.name} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium text-gray-900">{trait.name}</div>
                    <div className="text-sm text-gray-500">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        trait.alignment === 'high' ? 'bg-green-100 text-green-800' : 
                        trait.alignment === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {trait.alignment === 'high' ? 'Alto Alinhamento' : 
                         trait.alignment === 'medium' ? 'Médio Alinhamento' : 
                         'Baixo Alinhamento'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <div className="w-1/2 pr-2">
                      <div className="text-xs text-gray-500 mb-1">Pessoa: {trait.person}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-indigo-600 h-2 rounded-full" style={{ width: `${trait.person}%` }}></div>
                      </div>
                    </div>
                    <div className="w-1/2 pl-2">
                      <div className="text-xs text-gray-500 mb-1">Empresa: {trait.company}%</div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${trait.company}%` }}></div>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Insights e Recomendações */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pontos de Alinhamento */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Pontos Fortes de Alinhamento</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Áreas-chave onde o candidato e a empresa se alinham bem.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <ul className="space-y-3">
              {safeAlignmentPoints.map((point: string, index: number) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-gray-700">{point}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recomendações */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Recomendações</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Insights acionáveis baseados na análise de alinhamento cultural.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="mb-4">
              <h4 className="text-sm font-medium text-red-600 mb-2">Possíveis Pontos de Fricção</h4>
              <ul className="space-y-2">
                {safeFrictionPoints.map((point: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="ml-3 text-sm text-gray-700">{point}</p>
                  </li>
                ))}
              </ul>
            </div>
            
            <h4 className="text-sm font-medium text-indigo-600 mb-2">Ações Sugeridas</h4>
            <ul className="space-y-3">
              {safeRecommendations.map((recommendation: string, index: number) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-indigo-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="ml-3 text-sm text-gray-700">{recommendation}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
