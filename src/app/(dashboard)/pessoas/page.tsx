"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePeople } from '@/hooks/usePeople';
import { useCompanyProfile } from '@/hooks/useCompany';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { mockPeopleData } from '@/lib/mockData';

export default function PeoplePage() {
  const { data: peopleData, isLoading, error } = usePeople();
  const { data: companyData, isLoading: isLoadingCompany } = useCompanyProfile();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPeople, setFilteredPeople] = useState<any[]>([]);
  const [linkCopied, setLinkCopied] = useState(false);
  const [useMockData, setUseMockData] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<any>(null);
  
  // Load mock data preference from localStorage
  useEffect(() => {
    const savedPreference = localStorage.getItem('useMockData');
    if (savedPreference) {
      setUseMockData(savedPreference === 'true');
    }
  }, []);
  
  // Toggle mock data
  const toggleMockData = () => {
    const newValue = !useMockData;
    setUseMockData(newValue);
    localStorage.setItem('useMockData', String(newValue));
    setSelectedPerson(null); // Reset selected person when toggling data source
  };
  
  // Filter people based on search term and data source
  useEffect(() => {
    if (useMockData) {
      // Use mock data
      const filtered = mockPeopleData.filter(person => {
        return (
          person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          person.token.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setFilteredPeople(filtered);
    } else if (peopleData?.data) {
      // Use real data from API
      const filtered = peopleData.data.filter(person => {
        // Filter by token since name column doesn't exist in real data
        return person.token.toLowerCase().includes(searchTerm.toLowerCase());
      });
      setFilteredPeople(filtered);
    }
  }, [searchTerm, peopleData, useMockData]);

  // Function to copy the evaluation link to clipboard
  const copyEvaluationLink = () => {
    if (companyData?.data?.id) {
      const baseUrl = window.location.origin;
      // Generate link to the chat page with the company ID
      const evaluationLink = `${baseUrl}/avaliacao/${companyData.data.id}`;
      navigator.clipboard.writeText(evaluationLink);
      setLinkCopied(true);
      
      // Reset the copied state after 3 seconds
      setTimeout(() => {
        setLinkCopied(false);
      }, 3000);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pessoas</h1>
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
          
          <div className="relative">
            <input 
              type="text" 
              placeholder="Buscar pessoas..." 
              className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md pr-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
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
      
      {/* Layout principal - Grid com lista de pessoas e detalhes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lista de Pessoas */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg leading-6 font-medium text-gray-900">Pessoas Avaliadas</h2>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Lista de todas as pessoas que completaram a avaliação cultural através do link exclusivo da sua empresa.
              </p>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center p-10">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
              </div>
            ) : error ? (
              <div className="p-6 text-center text-red-500">
                Erro ao carregar dados: {error.message}
              </div>
            ) : filteredPeople && filteredPeople.length > 0 ? (
              <div className="border-t border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {useMockData ? 'Nome' : 'ID'}
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pontuação</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredPeople.map((person) => {
                      // Get the most recent match if available
                      const match = person.matches && person.matches.length > 0 ? person.matches[0] : null;
                      const matchScore = match ? match.match_score : null;
                      
                      return (
                        <tr key={person.id} 
                            className={`${selectedPerson?.id === person.id ? 'bg-indigo-50' : 'hover:bg-gray-50'} cursor-pointer`}
                            onClick={() => setSelectedPerson(person)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {useMockData ? person.name : person.token}
                            </div>
                            {useMockData && (
                              <div className="text-xs text-gray-500">{person.token}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {matchScore !== null ? (
                              <div className="flex items-center">
                                <div className="text-sm text-gray-900">{matchScore}%</div>
                                <div 
                                  className={`ml-2 w-2 h-2 rounded-full ${
                                    matchScore >= 80 ? 'bg-green-500' : 
                                    matchScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                                  }`}
                                ></div>
                              </div>
                            ) : (
                              <div className="text-sm text-gray-500">Pendente</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {match ? (
                              <Link href={`/resultado/${match.id}`} className="text-indigo-600 hover:text-indigo-900">
                                Ver Resultados
                              </Link>
                            ) : (
                              <span className="text-gray-400">Aguardando resposta</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-10 text-center text-gray-500">
                <p>Nenhuma pessoa encontrada. Gere um link para convidar alguém para avaliação.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* Painel de Detalhes da Pessoa */}
        <div className="lg:col-span-2">
          {selectedPerson ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                <div>
                  <h2 className="text-lg leading-6 font-medium text-gray-900">
                    {useMockData ? selectedPerson.name : selectedPerson.token}
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Detalhes do perfil cultural e insights para melhor alinhamento
                  </p>
                </div>
                <div>
                  {selectedPerson.matches && selectedPerson.matches.length > 0 && (
                    <div className="text-3xl font-bold text-indigo-600">
                      {selectedPerson.matches[0].match_score}%
                    </div>
                  )}
                </div>
              </div>
              
              {useMockData && selectedPerson.cultural_profile ? (
                <div className="border-t border-gray-200">
                  {/* Tabs */}
                  <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                      <a href="#" className="border-indigo-500 text-indigo-600 whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm">
                        Perfil Cultural
                      </a>
                      <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm">
                        Aspirações de Carreira
                      </a>
                      <a href="#" className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm">
                        Insights
                      </a>
                    </nav>
                  </div>
                  
                  {/* Conteúdo do Perfil */}
                  <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Pontos Fortes */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Pontos Fortes</h3>
                        <ul className="space-y-2">
                          {selectedPerson.cultural_profile.strengths.map((strength: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <p className="ml-3 text-sm text-gray-700">{strength}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Áreas de Desenvolvimento */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Áreas de Desenvolvimento</h3>
                        <ul className="space-y-2">
                          {selectedPerson.cultural_profile.development_areas.map((area: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-yellow-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <p className="ml-3 text-sm text-gray-700">{area}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {/* Estilo de Trabalho e Comunicação */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Estilo de Trabalho e Comunicação</h3>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Estilo de Trabalho:</dt>
                            <dd className="text-sm text-gray-900">{selectedPerson.cultural_profile.work_style}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Comunicação:</dt>
                            <dd className="text-sm text-gray-900">{selectedPerson.cultural_profile.communication_style}</dd>
                          </div>
                        </dl>
                      </div>
                      
                      {/* Potencial e Adaptabilidade */}
                      <div>
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Potencial e Adaptabilidade</h3>
                        <dl className="space-y-2">
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Potencial de Liderança:</dt>
                            <dd className="text-sm text-gray-900">{selectedPerson.cultural_profile.leadership_potential}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Encaixe na Equipe:</dt>
                            <dd className="text-sm text-gray-900">{selectedPerson.cultural_profile.team_fit}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Adaptabilidade:</dt>
                            <dd className="text-sm text-gray-900">{selectedPerson.cultural_profile.adaptability}</dd>
                          </div>
                          <div className="flex justify-between">
                            <dt className="text-sm font-medium text-gray-500">Mentalidade de Crescimento:</dt>
                            <dd className="text-sm text-gray-900">{selectedPerson.cultural_profile.growth_mindset}</dd>
                          </div>
                        </dl>
                      </div>
                      
                      {/* Aspirações de Carreira */}
                      <div className="md:col-span-2">
                        <h3 className="text-lg font-medium text-gray-900 mb-3">Aspirações de Carreira</h3>
                        <dl className="space-y-2">
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Curto Prazo:</dt>
                            <dd className="text-sm text-gray-900 mt-1">{selectedPerson.career_aspirations.short_term}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Longo Prazo:</dt>
                            <dd className="text-sm text-gray-900 mt-1">{selectedPerson.career_aspirations.long_term}</dd>
                          </div>
                          <div>
                            <dt className="text-sm font-medium text-gray-500">Interesses de Aprendizado:</dt>
                            <dd className="text-sm text-gray-900 mt-1">
                              <div className="flex flex-wrap gap-2">
                                {selectedPerson.career_aspirations.learning_interests.map((interest: string, index: number) => (
                                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                    {interest}
                                  </span>
                                ))}
                              </div>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border-t border-gray-200 px-4 py-5 sm:p-6 text-center text-gray-500">
                  {useMockData ? (
                    <p>Selecione uma pessoa para ver detalhes do perfil cultural.</p>
                  ) : (
                    <p>Detalhes não disponíveis. Ative os dados simulados para ver informações detalhadas de perfil.</p>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Detalhes do Perfil</h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Selecione uma pessoa para ver informações detalhadas.
                </p>
              </div>
              <div className="border-t border-gray-200 px-4 py-16 sm:p-16 text-center text-gray-500">
                <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhuma pessoa selecionada</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Clique em uma pessoa na lista para ver detalhes do perfil cultural.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
