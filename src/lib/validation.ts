// src/lib/validation.ts
import { z } from 'zod'

// Validation schema for evaluation answers
export const evaluationAnswersSchema = z.object({
  answers: z.record(z.string().min(1, 'Resposta é obrigatória').max(1000, 'Resposta muito longa'))
})

// Validation schema for person creation
export const personSchema = z.object({
  company_id: z.string().uuid('ID da empresa inválido'),
  evaluation_token: z.string().min(1, 'Token é obrigatório'),
  name: z.string().optional(),
  email: z.string().email('Email inválido').optional(),
  status: z.enum(['pending', 'completed', 'archived']).default('completed')
})

// Validation schema for answer creation
export const answerSchema = z.object({
  person_id: z.string().uuid('ID da pessoa inválido'),
  question_id: z.string().uuid('ID da pergunta inválido'),
  answer_text: z.string().min(1, 'Resposta é obrigatória').max(1000, 'Resposta muito longa')
})

// Validation for evaluation session
export const evaluationSessionSchema = z.object({
  token: z.string().min(16, 'Token inválido'),
  companyId: z.string().uuid('ID da empresa inválido'),
  startTime: z.string().datetime('Data inválida'),
  answers: z.record(z.string())
})

// Helper function to validate evaluation data
export function validateEvaluationData(data: {
  answers: Record<string, string>
  questions: Array<{ id: string }>
}) {
  const errors: string[] = []

  // Check if all questions have answers
  for (const question of data.questions) {
    if (!data.answers[question.id] || data.answers[question.id].trim().length === 0) {
      errors.push(`Pergunta ${question.id} não foi respondida`)
    }
  }

  // Check answer lengths
  for (const [questionId, answer] of Object.entries(data.answers)) {
    if (answer.length > 1000) {
      errors.push(`Resposta da pergunta ${questionId} excede 1000 caracteres`)
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

// Token validation
export function validateEvaluationToken(token: string): boolean {
  // Token should be at least 16 characters and alphanumeric
  const tokenRegex = /^[a-zA-Z0-9_-]{16,}$/
  return tokenRegex.test(token)
}

// Session data validation
export function validateSessionData(sessionData: any): sessionData is {
  evaluation_token: string
  empresa_id: string
  evaluation_start_time: string
} {
  return (
    typeof sessionData.evaluation_token === 'string' &&
    typeof sessionData.empresa_id === 'string' &&
    typeof sessionData.evaluation_start_time === 'string' &&
    validateEvaluationToken(sessionData.evaluation_token)
  )
}