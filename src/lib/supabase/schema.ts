// This file defines the database schema types for TypeScript

// User model
export interface User {
  id: string;
  email: string;
  role: 'admin' | 'company';
  created_at: string;
}

// Company model
export interface Company {
  id: string;
  user_id: string;
  name: string;
  industry: string;
  size: string;
  description: string;
  website: string;
  created_at: string;
  updated_at: string;
}

// Question model
export interface Question {
  id: string;
  type: 'slider' | 'multiple_choice' | 'text' | 'checkbox';
  text: string;
  options?: string[];
  created_at: string;
}

// Answer model
export interface Answer {
  id: string;
  user_id: string;
  question_id: string;
  value: string;
  created_at: string;
}

// Match model
export interface Match {
  id: string;
  person_token: string;
  company_id: string;
  result_json: {
    matchScore: number;
    traits: {
      name: string;
      person: number;
      company: number;
      alignment: 'high' | 'medium' | 'low';
    }[];
    alignmentPoints: string[];
    frictionPoints: string[];
    recommendations: string[];
  };
  created_at: string;
}

// Person model
export interface Person {
  id: string;
  token: string;
  name?: string;
  match_id: string;
  created_at: string;
}

// Database interface
export interface Database {
  users: User[];
  companies: Company[];
  questions: Question[];
  answers: Answer[];
  matches: Match[];
  people: Person[];
}
