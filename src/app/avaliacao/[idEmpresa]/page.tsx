// src/app/avaliacao/[idEmpresa]/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SessionManager } from '@/lib/session';

interface AvaliacaoPageProps {
  params: {
    idEmpresa: string;
  };
}

export default function AvaliacaoPage({ params }: AvaliacaoPageProps) {
  const router = useRouter();
  const { idEmpresa } = params;

  useEffect(() => {
    if (idEmpresa) {
      // Criar sessão de avaliação com token único
      const token = SessionManager.createSession(idEmpresa);
      
      // Redirect imediato para a página pública do formulário
      router.push(`/p/${token}`);
    }
  }, [idEmpresa, router]);

  // Loading state durante o redirect
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 text-lg">Preparando sua avaliação...</p>
        <p className="text-gray-500 text-sm mt-2">Você será redirecionado em instantes</p>
      </div>
    </div>
  );
}