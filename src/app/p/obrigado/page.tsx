// src/app/p/obrigado/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ObrigadoPage() {
  const router = useRouter();
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    // Limpar qualquer dado de sessão restante
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('evaluation_token');
      sessionStorage.removeItem('empresa_id');
      sessionStorage.removeItem('evaluation_start_time');
    }

    // Animar entrada da página
    setTimeout(() => setIsAnimated(true), 100);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className={`bg-white py-12 px-8 shadow-xl rounded-2xl transform transition-all duration-700 ${
          isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <div className="text-center">
            {/* Success Animation */}
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-8 relative overflow-hidden">
              <div className={`absolute inset-0 bg-green-500 rounded-full transform transition-transform duration-1000 ${
                isAnimated ? 'scale-100' : 'scale-0'
              }`}></div>
              <svg 
                className={`h-12 w-12 text-white relative z-10 transform transition-all duration-700 delay-300 ${
                  isAnimated ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={3} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>

            {/* Success Message */}
            <h1 className={`text-3xl font-bold text-gray-900 mb-4 transform transition-all duration-700 delay-200 ${
              isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              Avaliação Concluída!
            </h1>
            
            <p className={`text-lg text-gray-600 mb-8 leading-relaxed transform transition-all duration-700 delay-300 ${
              isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              Muito obrigado por dedicar seu tempo para responder nossa avaliação. 
              Suas respostas são muito importantes para nós!
            </p>

            {/* Info Card */}
            <div className={`bg-blue-50 border-l-4 border-blue-400 rounded-r-lg p-6 mb-8 text-left transform transition-all duration-700 delay-400 ${
              isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <div className="flex items-start">
                <svg className="h-6 w-6 text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-blue-800 font-semibold mb-2">O que acontece agora?</h3>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Suas respostas serão analisadas pela nossa equipe</li>
                    <li>• Avaliaremos a compatibilidade cultural</li>
                    <li>• Você receberá um retorno em breve</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className={`grid grid-cols-2 gap-4 mb-8 transform transition-all duration-700 delay-500 ${
              isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900">6</div>
                <div className="text-sm text-gray-600">Perguntas</div>
                <div className="text-sm text-gray-600">Respondidas</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">100%</div>
                <div className="text-sm text-gray-600">Avaliação</div>
                <div className="text-sm text-gray-600">Completa</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={`space-y-4 transform transition-all duration-700 delay-600 ${
              isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <button
                onClick={() => router.push('/')}
                className="w-full flex justify-center items-center py-3 px-6 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Voltar ao Início
              </button>
              
              <button
                onClick={() => window.location.reload()}
                className="w-full flex justify-center items-center py-3 px-6 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Fazer Nova Avaliação
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className={`mt-12 text-center transform transition-all duration-700 delay-700 ${
        isAnimated ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}>
        <p className="text-sm text-gray-500 mb-2">
          Suas informações são tratadas com confidencialidade total
        </p>
        <div className="flex justify-center items-center space-x-4 text-xs text-gray-400">
          <span>🔒 Dados Seguros</span>
          <span>•</span>
          <span>🤝 Confidencial</span>
          <span>•</span>
          <span>⚡ Processamento Rápido</span>
        </div>
      </div>
    </div>
  );
}