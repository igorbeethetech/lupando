// src/lib/supabase.ts
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/database.types'

export const createClient = () => {
  return createClientComponentClient<Database>()
}

// Utility functions for common operations
export const supabaseOperations = {
  // Questions operations
  async getPersonQuestions() {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('question_type', 'person')
      .order('order_index', { ascending: true })
      .limit(6)

    if (error) throw error
    return data
  },

  // People operations
  async createPerson(personData: {
    company_id: string
    evaluation_token: string
    status?: string
  }) {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('people')
      .insert({
        ...personData,
        status: personData.status || 'completed'
      })
      .select()
      .single()

    if (error) throw error
    return data
  },

  // Answers operations
  async createAnswers(answers: Array<{
    person_id: string
    question_id: string
    answer_text: string
  }>) {
    const supabase = createClient()
    const { error } = await supabase
      .from('answers')
      .insert(answers)

    if (error) throw error
    return true
  },

  // Get person with answers
  async getPersonWithAnswers(personId: string) {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('people')
      .select(`
        *,
        answers (
          *,
          questions (*)
        )
      `)
      .eq('id', personId)
      .single()

    if (error) throw error
    return data
  },

  // Get company evaluations
  async getCompanyEvaluations(companyId: string, page = 1, limit = 10) {
    const supabase = createClient()
    const from = (page - 1) * limit
    const to = from + limit - 1

    const { data, error, count } = await supabase
      .from('people')
      .select(`
        *,
        answers (
          *,
          questions (*)
        )
      `, { count: 'exact' })
      .eq('company_id', companyId)
      .order('created_at', { ascending: false })
      .range(from, to)

    if (error) throw error
    return {
      data: data || [],
      total: count || 0,
      page,
      limit,
      hasMore: (count || 0) > page * limit
    }
  }
}