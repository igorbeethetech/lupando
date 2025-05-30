"use client";

import { useEffect } from 'react';
import { useCreatePerson } from '@/hooks/usePeople';
import { useRouter, useParams } from 'next/navigation';

export default function AvaliacaoPage() {
  const router = useRouter();
  const params = useParams();
  const idEmpresa = Array.isArray(params.idEmpresa) ? params.idEmpresa[0] : params.idEmpresa || ''; // Ensure it's a string
  const createPerson = useCreatePerson(idEmpresa);

  useEffect(() => {
    if (idEmpresa && createPerson.mutate) {
      createPerson.mutate(undefined, {
        onSuccess: (data) => {
          if (data && data.data && data.data.token) {
            const token = data.data.token;
            router.push(`/p/${token}`);
          } else {
            console.error('Token não encontrado na resposta:', data);
          }
        },
        onError: (error) => {
          console.error('Erro ao criar pessoa:', error);
        },
      });
    }
  }, [idEmpresa]);

  return (
    <div>
      <h1>Avaliando Empresa {idEmpresa}</h1>
      <p>Redirecionando...</p>
    </div>
  );
}