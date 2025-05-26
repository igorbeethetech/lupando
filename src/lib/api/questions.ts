import { supabase } from '../supabase/client';
import { Question } from '../supabase/schema';

// Fetch all questions from the database
export async function getQuestions() {
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('id, type, question_text, placeholder, created_at')
      .order('id', { ascending: true });
    
    if (error) {
      throw error;
    }
    
    return { data, error: null };
  } catch (error: any) {
    console.error('Erro ao buscar perguntas:', error.message);
    return { data: null, error };
  }
}
