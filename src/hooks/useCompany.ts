"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createCompanyProfile, getCompanyProfile, updateCompanyProfile } from '@/lib/api/company';
import { Company } from '@/lib/supabase/schema';

// Hook para buscar o perfil da empresa
export function useCompanyProfile() {
  return useQuery({
    queryKey: ['companyProfile'],
    queryFn: getCompanyProfile,
  });
}

// Hook para criar o perfil da empresa
export function useCreateCompany() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Omit<Company, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => 
      createCompanyProfile(data),
    onSuccess: () => {
      // Invalidar a query para recarregar os dados
      queryClient.invalidateQueries({ queryKey: ['companyProfile'] });
    },
  });
}

// Hook para atualizar o perfil da empresa
export function useUpdateCompany() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { 
      id: string; 
      data: Partial<Omit<Company, 'id' | 'user_id' | 'created_at' | 'updated_at'>>; 
    }) => updateCompanyProfile(id, data),
    onSuccess: () => {
      // Invalidar a query para recarregar os dados
      queryClient.invalidateQueries({ queryKey: ['companyProfile'] });
    },
  });
}
