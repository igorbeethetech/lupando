'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase/client';

// Interface para as respostas da empresa
interface CompanyAnswer {
  question_id: string;
  answer_value: string;
}

// 🔍 Função para buscar respostas da empresa logada
async function getCompanyAnswers(): Promise<CompanyAnswer[]> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('Usuário não autenticado');
  }

  // Obter a empresa do usuário
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select('id')
    .eq('user_id', user.id)
    .single();

  if (companyError || !company) {
    throw new Error('Perfil da empresa não encontrado');
  }

  const companyId = company.id;

  // Buscar respostas já salvas para essa empresa
  const { data: answers, error: answersError } = await supabase
    .from('company_answers')
    .select('question_id, answer_value')
    .eq('company_id', companyId)

    
    console.log('Resposta da query:', { answers, answersError });
  if (answersError) {
    throw new Error('Erro ao buscar respostas da empresa');
  }

  return answers || [];
}

// Hook para buscar respostas da empresa
export function useCompanyAnswers() {
  return useQuery<CompanyAnswer[]>({
    queryKey: ['companyAnswers'],
    queryFn: getCompanyAnswers,
  });
}

// Hook para enviar as respostas da empresa
export function useSubmitCompanyAnswers() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (answers: CompanyAnswer[]) => {
      try {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          throw new Error('Usuário não autenticado');
        }

        const { data: company, error: companyError } = await supabase
          .from('companies')
          .select('id')
          .eq('user_id', user.id)
          .single();

        if (companyError || !company) {
          throw new Error('Perfil da empresa não encontrado');
        }

        const companyId = company.id;

        // Chamar API de envio
        const response = await fetch('/api/company-answers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ answers, companyId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erro ao enviar respostas');
        }

        const data = await response.json();
        return { data: data.data, error: null };
      } catch (error: any) {
        console.error('Erro ao enviar respostas:', error);
        return {
          data: null,
          error: { message: error.message || 'Erro inesperado' },
        };
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companyAnswers'] });
    },
  });
}
