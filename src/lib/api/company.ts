import { supabase } from '../supabase/client';
import { Company } from '../supabase/schema';

// Fetch the company profile linked to the logged-in user
export async function getCompanyProfile() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('user_id', user.id)
      .single();
    
    if (error) {
      throw error;
    }
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Erro ao buscar perfil da empresa:', error.message);
    return { data: null, error };
  }
}

// Create a company profile if it doesn't exist
export async function createCompanyProfile(companyData: Omit<Company, 'id' | 'user_id' | 'created_at' | 'updated_at'>) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    // Check if company already exists for this user
    const { data: existingCompany } = await supabase
      .from('companies')
      .select('id')
      .eq('user_id', user.id)
      .single();
    
    if (existingCompany) {
      throw new Error('Perfil da empresa já existe');
    }
    
    const { data, error } = await supabase
      .from('companies')
      .insert([{
        ...companyData,
        user_id: user.id
      }])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Erro ao criar perfil da empresa:', error.message);
    return { data: null, error };
  }
}

// Update the company profile
export async function updateCompanyProfile(companyId: string, companyData: Partial<Omit<Company, 'id' | 'user_id' | 'created_at' | 'updated_at'>>) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    // Verify ownership
    const { data: existingCompany, error: fetchError } = await supabase
      .from('companies')
      .select('id')
      .eq('id', companyId)
      .eq('user_id', user.id)
      .single();
    
    if (fetchError || !existingCompany) {
      throw new Error('Empresa não encontrada ou você não tem permissão para atualizá-la');
    }
    
    const { data, error } = await supabase
      .from('companies')
      .update({
        ...companyData,
        updated_at: new Date().toISOString()
      })
      .eq('id', companyId)
      .eq('user_id', user.id)
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Erro ao atualizar perfil da empresa:', error.message);
    return { data: null, error };
  }
}
