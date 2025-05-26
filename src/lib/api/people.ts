import { supabase } from '../supabase/client';
import { Person } from '../supabase/schema';
import { v4 as uuidv4 } from 'uuid';

// Create a new person entry with a random token
export async function createPerson() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Usuu00e1rio nu00e3o autenticado');
    }
    
    // Get company ID
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('id')
      .eq('user_id', user.id)
      .single();
    
    if (companyError || !company) {
      throw new Error('Perfil da empresa nu00e3o encontrado');
    }
    
    // Generate a unique token
    const token = uuidv4();
    
    const { data, error } = await supabase
      .from('people')
      .insert([{
        token,
        company_id: company.id
      }])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Erro ao criar pessoa:', error.message);
    return { data: null, error };
  }
}

// List all people who answered the evaluation via that company's token
export async function getPeople() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Usuu00e1rio nu00e3o autenticado');
    }
    
    // Get company ID
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('id')
      .eq('user_id', user.id)
      .single();
    
    if (companyError || !company) {
      throw new Error('Perfil da empresa nu00e3o encontrado');
    }
    
    // Get people with their match data
    const { data, error } = await supabase
      .from('people')
      .select(`
        id,
        token,
        created_at,
        matches (id, match_score, result_data, created_at)
      `)
      .eq('company_id', company.id)
      .order('created_at', { ascending: false });
    
    if (error) {
      throw error;
    }
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Erro ao buscar pessoas:', error.message);
    return { data: null, error };
  }
}

// Retrieve data for a specific person by their token
export async function getPersonByToken(token: string) {
  try {
    const { data, error } = await supabase
      .from('people')
      .select(`
        id,
        token,
        name,
        created_at,
        companies:company_id (id, name)
      `)
      .eq('token', token)
      .single();
    
    if (error) {
      throw error;
    }
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Erro ao buscar pessoa por token:', error.message);
    return { data: null, error };
  }
}
