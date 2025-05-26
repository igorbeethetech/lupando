"use client";

import { useQuery } from '@tanstack/react-query';
import { getQuestions } from '@/lib/api/questions';

// Hook para buscar todas as perguntas do banco de dados
export function useQuestions() {
  return useQuery({
    queryKey: ['questions'],
    queryFn: getQuestions,
  });
}
