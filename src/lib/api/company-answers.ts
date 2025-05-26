'use client';

import { supabase } from '@/lib/supabase/client';

export interface CompanyAnswer {
  question_id: string;
  answer_value: string;
}

// Buscar respostas da empresa logada
export async function getCompanyAnswers(): Promise<CompanyAnswer[]> {
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
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

  const { data: answers, error: answersError } = await supabase
    .from('company_answers')
    .select('question_id, answer_value')
    .eq('company_id', companyId);

  if (answersError) {
    throw new Error('Erro ao buscar respostas da empresa');
  }

  return answers ?? []; // ✅ retorna sempre um array
}

// Enviar respostas diretamente ao banco
export async function submitCompanyAnswersToDB(
  answers: CompanyAnswer[],
  companyId: string
): Promise<CompanyAnswer[]> {
  const payload = answers.map(a => ({
    ...a,
    company_id: companyId,
  }));

  const { data, error } = await supabase
    .from('company_answers')
    .insert(payload);

  if (error) {
    throw new Error(error.message);
  }

  return data ?? []; // ✅ também aqui, por segurança
}
