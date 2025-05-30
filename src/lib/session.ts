// src/lib/session.ts
import { nanoid } from 'nanoid'
import { EvaluationSession } from '@/types/database.types'

export class SessionManager {
  private static readonly KEYS = {
    EVALUATION_TOKEN: 'evaluation_token',
    EMPRESA_ID: 'empresa_id',
    EVALUATION_START_TIME: 'evaluation_start_time',
    EVALUATION_ANSWERS: 'evaluation_answers',
    CURRENT_STEP: 'current_step'
  } as const

  // Generate a new evaluation token
  static generateToken(length: number = 32): string {
    return nanoid(length)
  }

  // Create evaluation session
  static createSession(companyId: string): string {
    if (typeof window === 'undefined') return ''
    
    const token = this.generateToken()
    const startTime = new Date().toISOString()
    
    sessionStorage.setItem(this.KEYS.EVALUATION_TOKEN, token)
    sessionStorage.setItem(this.KEYS.EMPRESA_ID, companyId)
    sessionStorage.setItem(this.KEYS.EVALUATION_START_TIME, startTime)
    sessionStorage.setItem(this.KEYS.EVALUATION_ANSWERS, JSON.stringify({}))
    sessionStorage.setItem(this.KEYS.CURRENT_STEP, '0')
    
    return token
  }

  // Get session data
  static getSession(): EvaluationSession | null {
    if (typeof window === 'undefined') return null
    
    const token = sessionStorage.getItem(this.KEYS.EVALUATION_TOKEN)
    const companyId = sessionStorage.getItem(this.KEYS.EMPRESA_ID)
    const startTime = sessionStorage.getItem(this.KEYS.EVALUATION_START_TIME)
    const answersStr = sessionStorage.getItem(this.KEYS.EVALUATION_ANSWERS)
    
    if (!token || !companyId || !startTime) return null
    
    try {
      const answers = answersStr ? JSON.parse(answersStr) : {}
      return {
        token,
        companyId,
        startTime,
        answers
      }
    } catch {
      return null
    }
  }

  // Validate session token
  static validateSession(token: string): boolean {
    if (typeof window === 'undefined') return false
    
    const sessionToken = sessionStorage.getItem(this.KEYS.EVALUATION_TOKEN)
    return sessionToken === token
  }

  // Update answers in session
  static updateAnswers(answers: Record<string, string>): void {
    if (typeof window === 'undefined') return
    
    sessionStorage.setItem(this.KEYS.EVALUATION_ANSWERS, JSON.stringify(answers))
  }

  // Update current step
  static updateCurrentStep(step: number): void {
    if (typeof window === 'undefined') return
    
    sessionStorage.setItem(this.KEYS.CURRENT_STEP, step.toString())
  }

  // Get current step
  static getCurrentStep(): number {
    if (typeof window === 'undefined') return 0
    
    const step = sessionStorage.getItem(this.KEYS.CURRENT_STEP)
    return step ? parseInt(step, 10) : 0
  }

  // Clear session
  static clearSession(): void {
    if (typeof window === 'undefined') return
    
    Object.values(this.KEYS).forEach(key => {
      sessionStorage.removeItem(key)
    })
  }

  // Check if session exists
  static hasSession(): boolean {
    if (typeof window === 'undefined') return false
    
    return Boolean(
      sessionStorage.getItem(this.KEYS.EVALUATION_TOKEN) &&
      sessionStorage.getItem(this.KEYS.EMPRESA_ID)
    )
  }

  // Get session duration
  static getSessionDuration(): number {
    if (typeof window === 'undefined') return 0
    
    const startTime = sessionStorage.getItem(this.KEYS.EVALUATION_START_TIME)
    if (!startTime) return 0
    
    const start = new Date(startTime)
    const now = new Date()
    return now.getTime() - start.getTime()
  }

  // Check if session is expired (optional timeout)
  static isSessionExpired(timeoutMinutes: number = 60): boolean {
    const duration = this.getSessionDuration()
    const timeoutMs = timeoutMinutes * 60 * 1000
    return duration > timeoutMs
  }
}