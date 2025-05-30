// src/types/database.types.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          role: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
          role?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          role?: string
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      questions: {
        Row: {
          id: string
          question_text: string
          question_type: string
          order_index: number | null
          created_at: string
          updated_at: string
          company_id: string | null
        }
        Insert: {
          id?: string
          question_text: string
          question_type: string
          order_index?: number | null
          created_at?: string
          updated_at?: string
          company_id?: string | null
        }
        Update: {
          id?: string
          question_text?: string
          question_type?: string
          order_index?: number | null
          created_at?: string
          updated_at?: string
          company_id?: string | null
        }
      }
      people: {
        Row: {
          id: string
          company_id: string
          evaluation_token: string | null
          name: string | null
          email: string | null
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          company_id: string
          evaluation_token?: string | null
          name?: string | null
          email?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          company_id?: string
          evaluation_token?: string | null
          name?: string | null
          email?: string | null
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
      answers: {
        Row: {
          id: string
          person_id: string
          question_id: string
          answer_text: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          person_id: string
          question_id: string
          answer_text: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          person_id?: string
          question_id?: string
          answer_text?: string
          created_at?: string
          updated_at?: string
        }
      }
      matches: {
        Row: {
          id: string
          person_id: string
          company_id: string
          compatibility_score: number | null
          analysis_result: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          person_id: string
          company_id: string
          compatibility_score?: number | null
          analysis_result?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          person_id?: string
          company_id?: string
          compatibility_score?: number | null
          analysis_result?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_role: 'admin' | 'user'
      person_status: 'pending' | 'completed' | 'archived'
      question_type: 'person' | 'company' | 'custom'
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

// Type helpers for easier usage
export type User = Database['public']['Tables']['users']['Row']
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type UserUpdate = Database['public']['Tables']['users']['Update']

export type Company = Database['public']['Tables']['companies']['Row']
export type CompanyInsert = Database['public']['Tables']['companies']['Insert']
export type CompanyUpdate = Database['public']['Tables']['companies']['Update']

export type Question = Database['public']['Tables']['questions']['Row']
export type QuestionInsert = Database['public']['Tables']['questions']['Insert']
export type QuestionUpdate = Database['public']['Tables']['questions']['Update']

export type Person = Database['public']['Tables']['people']['Row']
export type PersonInsert = Database['public']['Tables']['people']['Insert']
export type PersonUpdate = Database['public']['Tables']['people']['Update']

export type Answer = Database['public']['Tables']['answers']['Row']
export type AnswerInsert = Database['public']['Tables']['answers']['Insert']
export type AnswerUpdate = Database['public']['Tables']['answers']['Update']

export type Match = Database['public']['Tables']['matches']['Row']
export type MatchInsert = Database['public']['Tables']['matches']['Insert']
export type MatchUpdate = Database['public']['Tables']['matches']['Update']

// Enum types
export type UserRole = Database['public']['Enums']['user_role']
export type PersonStatus = Database['public']['Enums']['person_status']
export type QuestionType = Database['public']['Enums']['question_type']

// Extended types for application use
export interface QuestionWithAnswers extends Question {
  answers?: Answer[]
}

export interface PersonWithAnswers extends Person {
  answers?: Answer[]
  questions?: Question[]
}

export interface CompanyWithQuestions extends Company {
  questions?: Question[]
}

export interface MatchWithDetails extends Match {
  person?: Person
  company?: Company
}

// Form types for frontend
export interface EvaluationForm {
  answers: Record<string, string>
  currentStep: number
  totalSteps: number
  isCompleted: boolean
}

export interface EvaluationSession {
  token: string
  companyId: string
  startTime: string
  answers: Record<string, string>
}

// API Response types
export interface ApiResponse<T = any> {
  data?: T
  error?: string
  message?: string
  success: boolean
}

export interface PaginatedResponse<T = any> {
  data: T[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

// Analysis types
export interface CompatibilityAnalysis {
  score: number
  strengths: string[]
  concerns: string[]
  recommendations: string[]
  culturalFit: 'high' | 'medium' | 'low'
  summary: string
}

export interface AnalysisResult {
  compatibility: CompatibilityAnalysis
  personProfile: {
    traits: string[]
    values: string[]
    workStyle: string[]
  }
  companyProfile: {
    culture: string[]
    values: string[]
    environment: string[]
  }
  createdAt: string
  version: string
}