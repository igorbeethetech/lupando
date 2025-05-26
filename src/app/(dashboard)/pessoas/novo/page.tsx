"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreatePerson } from '@/hooks/usePeople';
import Link from 'next/link';

export default function NewPersonPage() {
  const router = useRouter();
  const createPerson = useCreatePerson();
  
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedLink, setGeneratedLink] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      setError(null);
      
      const result = await createPerson.mutateAsync(name || undefined);
      
      if (result.error) {
        throw new Error(result.error.message);
      }
      
      if (result.data) {
        // Gerar link para avaliação
        const baseUrl = window.location.origin;
        const evaluationLink = `${baseUrl}/avaliacao/${result.data.token}`;
        setGeneratedLink(evaluationLink);
      }
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao criar a pessoa para avaliação.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const copyToClipboard = () => {
    if (generatedLink) {
      navigator.clipboard.writeText(generatedLink);
      alert('Link copiado para a área de transferência!');
    }
  };
  
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Nova Avaliação</h1>
        <Link 
          href="/pessoas" 
          className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Voltar para Lista
        </Link>
      </div>
      
      {error && (
        <div className="bg-red-50 p-4 rounded-md mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      {generatedLink ? (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Link de Avaliação Gerado</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Compartilhe este link com a pessoa que você deseja avaliar.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Link para compartilhar:
              </label>
              <div className="flex rounded-md shadow-sm">
                <input
                  type="text"
                  readOnly
                  value={generatedLink}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                />
                <button
                  type="button"
                  onClick={copyToClipboard}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Copiar
                </button>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  setGeneratedLink(null);
                  setName('');
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Criar Outra Avaliação
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-lg leading-6 font-medium text-gray-900">Criar Nova Avaliação</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Preencha os detalhes para gerar um link de avaliação.
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome da Pessoa (opcional)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Ex: João Silva"
                  />
                </div>
                <p className="mt-2 text-sm text-gray-500">
                  Se deixado em branco, a avaliação será anônima.
                </p>
              </div>
              
              <div className="pt-5">
                <div className="flex justify-end">
                  <Link
                    href="/pessoas"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Cancelar
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    {isSubmitting ? 'Gerando...' : 'Gerar Link'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
