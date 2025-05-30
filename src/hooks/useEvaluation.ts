// src/hooks/useEvaluation.ts
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Question, EvaluationForm } from '@/types/database.types'
import { SessionManager } from '@/lib/session'
import { supabaseOperations } from '@/lib/supabase'
import { validateEvaluationData } from '@/lib/validation'

interface UseEvaluationProps {
  token: string
}

interface UseEvaluationReturn {
  // State
  questions: Question[]
  currentStep: number
  answers: Record<string, string>
  isLoading: boolean
  isSubmitting: boolean
  error: string
  progress: number
  
  // Actions
  setAnswer: (questionId: string, answer: string) => void
  nextStep: () => void
  previousStep: () => void
  submitEvaluation: () => Promise<void>
  
  // Computed
  currentQuestion: Question | null
  isLastStep: boolean
  canProceed: boolean
}

export function useEvaluation({ token }: UseEvaluationProps): UseEvaluationReturn {
  const router = useRouter()
  
  // State
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  // Initialize evaluation
  useEffect(() => {
    const initializeEvaluation = async () => {
      try {
        setIsLoading(true)
        setError('')

        // Validate session
        if (!SessionManager.validateSession(token)) {
          router.push('/')
          return
        }

        // Load questions
        const questionsData = await supabaseOperations.getPersonQuestions()
        
        if (!questionsData || questionsData.length === 0) {
          setError('Nenhuma pergunta encontrada para avaliação.')
          return
        }

        setQuestions(questionsData)
        
        // Restore session state
        const session = SessionManager.getSession()
        if (session) {
          setAnswers(session.answers)
          setCurrentStep(SessionManager.getCurrentStep())
        }

      } catch (err) {
        console.error('Erro ao inicializar avaliação:', err)
        setError('Erro ao carregar perguntas. Tente novamente.')
      } finally {
        setIsLoading(false)
      }
    }

    initializeEvaluation()
  }, [token, router])

  // Set answer and update session
  const setAnswer = useCallback((questionId: string, answer: string) => {
    const newAnswers = {
      ...answers,
      [questionId]: answer
    }
    
    setAnswers(newAnswers)
    SessionManager.updateAnswers(newAnswers)
  }, [answers])

  // Navigation
  const nextStep = useCallback(() => {
    if (currentStep < questions.length - 1) {
      const newStep = currentStep + 1
      setCurrentStep(newStep)
      SessionManager.updateCurrentStep(newStep)
    }
  }, [currentStep, questions.length])

  const previousStep = useCallback(() => {
    if (currentStep > 0) {
      const newStep = currentStep - 1
      setCurrentStep(newStep)
      SessionManager.updateCurrentStep(newStep)
    }
  }, [currentStep])

  // Submit evaluation
  const submitEvaluation = useCallback(async () => {
    try {
      setIsSubmitting(true)
      setError('')

      // Validate data
      const validation = validateEvaluationData({ answers, questions })
      if (!validation.isValid) {
        setError(validation.errors.join(', '))
        return
      }

      const session = SessionManager.getSession()
      if (!session) {
        setError('Sessão inválida. Reinicie a avaliação.')
        return
      }

      // Create person record
      const personData = await supabaseOperations.createPerson({
        company_id: session.companyId,
        evaluation_token: token,
        status: 'completed'
      })

      // Create answers
      const answersToInsert = Object.entries(answers).map(([questionId, answer]) => ({
        person_id: personData.id,
        question_id: questionId,
        answer_text: answer.trim()
      }))

      await supabaseOperations.createAnswers(answersToInsert)

      // Clear session
      SessionManager.clearSession()

      // Redirect to success page
      router.push('/p/obrigado')

    } catch (err) {
      console.error('Erro ao enviar avaliação:', err)
      setError('Erro ao enviar avaliação. Tente novamente.')
    } finally {
      setIsSubmitting(false)
    }
  }, [answers, questions, token, router])

  // Computed values
  const currentQuestion = questions[currentStep] || null
  const isLastStep = currentStep === questions.length - 1
  const progress = questions.length > 0 ? ((currentStep + 1) / questions.length) * 100 : 0
  const canProceed = currentQuestion ? Boolean(answers[currentQuestion.id]?.trim()) : false

  return {
    // State
    questions,
    currentStep,
    answers,
    isLoading,
    isSubmitting,
    error,
    progress,
    
    // Actions
    setAnswer,
    nextStep,
    previousStep,
    submitEvaluation,
    
    // Computed
    currentQuestion,
    isLastStep,
    canProceed
  }
}