"use client";

import Link from 'next/link';
import { useDashboardData } from '@/hooks/useMatches';
import { useCompanyProfile } from '@/hooks/useCompany';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState, useEffect } from 'react';
import { mockDashboardData, mockMonthlyTrends } from '@/lib/mockData';

export default function DashboardPage() {
  const { data: dashboardData, isLoading: isLoadingDashboard, error: dashboardError } = useDashboardData();
  const { data: companyData, isLoading: isLoadingCompany, error: companyError } = useCompanyProfile();
  
  const [linkCopied, setLinkCopied] = useState(false);
  const [useMockData, setUseMockData] = useState(false);
  
  // Save mock data preference to localStorage
  useEffect(() => {
    const savedPreference = localStorage.getItem('useMockData');
    if (savedPreference) {
      setUseMockData(savedPreference === 'true');
    }
  }, []);
  
  const toggleMockData = () => {
    const newValue = !useMockData;
    setUseMockData(newValue);
    localStorage.setItem('useMockData', String(newValue));
  };
  
  // Formatar data para exibição
  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch (e) {
      return dateString;
    }
  };
  
  // Function to copy the evaluation link to clipboard
  const copyEvaluationLink = () => {
    if (companyData?.data?.id) {
      const baseUrl = window.location.origin;
      const evaluationLink = `${baseUrl}/avaliacao/${companyData.data.id}`;
      navigator.clipboard.writeText(evaluationLink);
      setLinkCopied(true);
      
      // Reset the copied state after 3 seconds
      setTimeout(() => {
        setLinkCopied(false);
      }, 3000);
    }
  };
  
  // Exibir mensagem de carregamento ou erro
  if (isLoadingDashboard || isLoadingCompany) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Painel da Empresa</h1>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="text-blue-700">Carregando dados do dashboard...</p>
        </div>
      </div>
    );
  }
  
  if (dashboardError || companyError) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Painel da Empresa</h1>
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">Erro ao carregar dados: {dashboardError?.message || companyError?.message}</p>
        </div>
      </div>
    );
  }
  
  // Dados para exibição
  const data = useMockData ? mockDashboardData : (dashboardData?.data || {
    totalEvaluations: 0,
    averageScore: 0,
    topTraits: [],
    recentMatches: []
  });
  
  // Usar dados simulados ou reais para tendências mensais
  const trends = useMockData ? mockMonthlyTrends : [
    { month: 'Jan', score: 72 },
    { month: 'Fev', score: 74 },
    { month: 'Mar', score: 75 },
    { month: 'Abr', score: 77 },
    { month: 'Mai', score: 78 },
  ];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Painel da Empresa</h1>
        
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
      </div>
      
      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Pontuação Média de Compatibilidade */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Pontuação Média</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{Math.round(data.averageScore)}%</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/pessoas" className="font-medium text-indigo-600 hover:text-indigo-500">Ver todos os candidatos</Link>
            </div>
          </div>
        </div>

        {/* Total de Candidatos Avaliados */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Candidatos Avaliados</dt>
                  <dd>
                    <div className="text-lg font-medium text-gray-900">{data.totalEvaluations}</div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-5 py-3">
            <div className="text-sm">
              <Link href="/pessoas" className="font-medium text-indigo-600 hover:text-indigo-500">Ver detalhes</Link>
            </div>
          </div>
        </div>

        {/* Link para Criar Nova Avaliação */}
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Nova Avaliação</dt>
                  <dd className="mt-2">
                    <Link href="/pessoas/novo" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                      Criar nova avaliação &rarr;
                    </Link>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Link de Avaliação da Empresa */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Link de Avaliação Anônima</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Compartilhe este link com pessoas para que elas possam realizar a avaliação cultural de forma anônima.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          {companyData?.data?.id ? (
            <div className="mt-1 flex rounded-md shadow-sm">
              <div className="relative flex items-stretch flex-grow focus-within:z-10">
                <input
                  type="text"
                  readOnly
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-none rounded-l-md sm:text-sm border-gray-300"
                  value={`${window.location.origin}/avaliacao/${companyData.data.id}`}
                />
              </div>
              <button
                type="button"
                onClick={copyEvaluationLink}
                className="relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
              >
                {linkCopied ? (
                  <>
                    <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                      <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
                    </svg>
                    <span>Copiar Link</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              Carregando link de avaliação...
            </div>
          )}
          <p className="mt-2 text-sm text-gray-500">
            Este link é único para sua empresa. Quando uma pessoa acessar o link, será gerado um identificador único para ela.
          </p>
        </div>
      </div>
      
      {/* Traços Culturais Principais */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Traços Culturais Principais</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Os traços culturais mais fortes identificados nas avaliações.
          </p>
        </div>
        <div className="border-t border-gray-200">
          {data.topTraits.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {data.topTraits.map((trait, index) => (
                <li key={index} className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">{trait.name}</p>
                    <div className="ml-2 flex-shrink-0 flex">
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {trait.count} ocorrências
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-4 sm:px-6 text-sm text-gray-500">
              Nenhum traço cultural identificado ainda. Realize mais avaliações para ver resultados.
            </div>
          )}
        </div>
      </div>
      
      {/* Avaliações Recentes */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Avaliações Recentes</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            As avaliações mais recentes realizadas pelos candidatos.
          </p>
        </div>
        <div className="border-t border-gray-200">
          {data.recentMatches.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Candidato
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Compatibilidade
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.recentMatches.map((match) => (
                    <tr key={match.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{typeof match.personName === 'string' ? match.personName : 'Anônimo'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div 
                              className="bg-blue-600 h-2.5 rounded-full" 
                              style={{ width: `${match.matchScore}%` }}
                            ></div>
                          </div>
                          <span className="ml-2 text-sm text-gray-900">{match.matchScore}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(match.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link href={`/resultado/${match.id}`} className="text-indigo-600 hover:text-indigo-900">
                          Ver detalhes
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-4 py-4 sm:px-6 text-sm text-gray-500">
              Nenhuma avaliação realizada ainda. Crie uma nova avaliação para ver resultados.
            </div>
          )}
        </div>
      </div>
      
      {/* Gráfico de Tendências */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Tendências de Compatibilidade</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Evolução da pontuação média de compatibilidade ao longo do tempo.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <div className="h-64 flex items-end justify-around relative">
            {trends.map((item: { month: string; score: number; evaluations?: number; candidates?: string[] }) => (
              <div key={item.month} className="flex flex-col items-center w-1/6 group">
                <div 
                  className="w-12 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t hover:from-indigo-700 hover:to-indigo-500 transition-all duration-200 cursor-pointer relative" 
                  style={{ height: `${Math.max(10, item.score * 0.6)}px` }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-gray-900 text-white text-xs rounded py-1 px-2 min-w-[120px]">
                      <div className="font-bold text-center">{item.month}</div>
                      <div className="flex justify-between">
                        <span>Score:</span>
                        <span className="font-medium">{item.score}%</span>
                      </div>
                      {item.evaluations && (
                        <div className="flex justify-between">
                          <span>Avaliações:</span>
                          <span className="font-medium">{item.evaluations}</span>
                        </div>
                      )}
                      <div className="absolute left-1/2 top-full transform -translate-x-1/2 border-solid border-t-gray-900 border-t-4 border-x-transparent border-x-4 border-b-0"></div>
                    </div>
                  </div>
                  
                  {/* Score indicator */}
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-bold text-indigo-700">{item.score}%</div>
                </div>
                <div className="text-xs text-center mt-1 font-medium">{item.month}</div>
                {item.evaluations && (
                  <div className="text-[10px] text-center text-gray-500">{item.evaluations} aval.</div>
                )}
              </div>
            ))}
          </div>
          
          {/* Legend */}
          <div className="mt-6 flex justify-center items-center">
            <div className="flex items-center mr-4">
              <div className="w-3 h-3 bg-gradient-to-t from-indigo-600 to-indigo-400 mr-1"></div>
              <span className="text-xs text-gray-600">Score Médio</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 rounded-full bg-gray-400 mr-1"></div>
              <span className="text-xs text-gray-600">Número de Avaliações</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
