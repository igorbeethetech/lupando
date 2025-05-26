import { supabase } from '../supabase/client';
import { Match } from '../supabase/schema';

// Save the result of the evaluation
export async function saveMatchResult(matchData: {
  person_id: string;
  company_id: string;
  match_score: number;
  result_data: any;
}) {
  try {
    const { data, error } = await supabase
      .from('matches')
      .insert([matchData])
      .select()
      .single();
    
    if (error) {
      throw error;
    }
    
    // Update the person record with the match_id
    const { error: updateError } = await supabase
      .from('people')
      .update({ match_id: data.id })
      .eq('id', matchData.person_id);
    
    if (updateError) {
      throw updateError;
    }
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Erro ao salvar resultado do match:', error.message);
    return { data: null, error };
  }
}

// Fetch a specific match result
export async function getMatchById(matchId: string) {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    // Get company ID if user is logged in
    let companyId = null;
    if (user) {
      const { data: company } = await supabase
        .from('companies')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (company) {
        companyId = company.id;
      }
    }
    
    // Get the match data
    const { data: matchData, error } = await supabase
      .from('matches')
      .select(`
        id,
        person_id,
        company_id,
        match_score,
        result_data,
        created_at
      `)
      .eq('id', matchId)
      .single();
      
    if (error || !matchData) {
      if (error) throw error;
      return { data: null, error: new Error('Match não encontrado') };
    }
    
    // Get person data
    const { data: personData, error: personError } = await supabase
      .from('people')
      .select('id, token, name')
      .eq('id', matchData.person_id)
      .single();
      
    if (personError) {
      console.warn('Erro ao buscar dados da pessoa:', personError.message);
    }
    
    // Get company data
    const { data: companyData, error: companyError } = await supabase
      .from('companies')
      .select('id, name')
      .eq('id', matchData.company_id)
      .single();
      
    if (companyError) {
      console.warn('Erro ao buscar dados da empresa:', companyError.message);
    }
    
    // Combine the data
    const data = {
      ...matchData,
      people: personData || null,
      companies: companyData || null
    };
    
    if (error) {
      throw error;
    }
    
    // If user is logged in, verify they have access to this match
    if (user && companyId && data.company_id !== companyId) {
      throw new Error('Você não tem permissão para acessar este resultado');
    }
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Erro ao buscar match por ID:', error.message);
    return { data: null, error };
  }
}

// Fetch all matches for the current company
export async function getCompanyMatches() {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    // Get company ID
    const { data: company, error: companyError } = await supabase
      .from('companies')
      .select('id')
      .eq('user_id', user.id)
      .single();
    
    if (companyError || !company) {
      // Retornar array vazio em vez de lançar erro
      console.warn('Perfil da empresa não encontrado. Retornando array vazio.');
      return { data: [], error: null };
    }
    
    // Get matches for the company
    const { data: matchesData, error } = await supabase
      .from('matches')
      .select(`
        id,
        person_id,
        match_score,
        result_data,
        created_at
      `)
      .eq('company_id', company.id)
      .order('created_at', { ascending: false });
      
    // If there's an error or no matches, return early
    if (error || !matchesData || matchesData.length === 0) {
      if (error) throw error;
      return { data: [], error: null };
    }
    
    // Get people data separately
    const personIds = matchesData.map(match => match.person_id);
    const { data: peopleData, error: peopleError } = await supabase
      .from('people')
      .select('id, token, name')
      .in('id', personIds);
      
    if (peopleError) {
      console.warn('Erro ao buscar dados de pessoas:', peopleError.message);
    }
    
    // Combine the data
    const data = matchesData.map(match => {
      const person = peopleData?.find(p => p.id === match.person_id) || null;
      return {
        ...match,
        people: person
      };
    });
    
    if (error) {
      throw error;
    }
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Erro ao buscar matches da empresa:', error.message);
    return { data: null, error };
  }
}

// Get aggregated match data for dashboard
export async function getDashboardData() {
  try {
    const { data: matches, error } = await getCompanyMatches();
    
    // Se houver erro, retornar dados vazios em vez de lançar erro
    if (error) {
      console.warn('Erro ao buscar matches:', error.message);
      return { 
        data: { 
          totalEvaluations: 0, 
          averageScore: 0, 
          topTraits: [], 
          recentMatches: [] 
        }, 
        error: null 
      };
    }
    
    // Garantir que matches é um array
    const matchesArray = matches || [];
    
    // Calculate aggregated data
    const totalEvaluations = matchesArray.length;
    
    // Calculate average match score
    const totalScore = matchesArray.reduce((sum, match) => {
      return sum + (match.match_score || 0);
    }, 0);
    const averageScore = totalEvaluations > 0 ? totalScore / totalEvaluations : 0;
    
    // Extract most common traits
    const traitCounts: Record<string, number> = {};
    matchesArray.forEach(match => {
      if (match.result_data?.traits) {
        match.result_data.traits.forEach((trait: { name: string; alignment: string }) => {
          if (trait.alignment === 'high') {
            traitCounts[trait.name] = (traitCounts[trait.name] || 0) + 1;
          }
        });
      }
    });
    
    // Sort traits by count
    const sortedTraits = Object.entries(traitCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([name, count]) => ({ name, count }));
    
    // Recent matches
    const recentMatches = matchesArray.slice(0, 5).map(match => ({
      id: match.id,
      personName: match.people && typeof match.people === 'object' && 'name' in match.people ? match.people.name : 'Anônimo',
      personId: match.person_id,
      matchScore: match.match_score || 0,
      date: match.created_at
    }));
    
    return {
      data: {
        totalEvaluations,
        averageScore,
        topTraits: sortedTraits.slice(0, 5),
        recentMatches
      },
      error: null
    };
  } catch (error: any) {
    console.error('Erro ao buscar dados do dashboard:', error.message);
    return { data: null, error };
  }
}
