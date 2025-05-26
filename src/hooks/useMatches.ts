"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCompanyMatches, getMatchById, getDashboardData, saveMatchResult } from '@/lib/api/matches';
import { mockMatchResults } from '@/lib/mockData';
import { Match } from '@/lib/supabase/schema';
import { useState, useEffect } from 'react';

// Hook para buscar todos os matches da empresa
export function useCompanyMatches() {
  const [useMockData, setUseMockData] = useState(false);
  
  // Check localStorage for mock data preference
  useEffect(() => {
    const savedPreference = localStorage.getItem('useMockData');
    if (savedPreference) {
      setUseMockData(savedPreference === 'true');
    }
  }, []);
  
  return useQuery({
    queryKey: ['matches', useMockData],
    queryFn: async () => {
      // If using mock data, return mock matches
      if (useMockData) {
        const mockMatches = Object.values(mockMatchResults).map(match => ({
          id: match.id,
          person_id: match.person_id,
          match_score: match.match_score,
          created_at: match.created_at,
          people: match.people,
          result_data: match.result_data
        }));
        return { data: mockMatches, error: null };
      }
      // Otherwise fetch real data
      return getCompanyMatches();
    },
  });
}

// Hook para buscar um match específico pelo ID
export function useMatchById(matchId: string) {
  const [useMockData, setUseMockData] = useState(false);
  
  // Check localStorage for mock data preference
  useEffect(() => {
    const savedPreference = localStorage.getItem('useMockData');
    if (savedPreference) {
      setUseMockData(savedPreference === 'true');
    }
  }, []);
  
  return useQuery({
    queryKey: ['match', matchId, useMockData],
    queryFn: async () => {
      // If using mock data and the ID starts with 'mock-', return mock data
      if (useMockData && matchId.startsWith('mock-')) {
        const mockMatch = mockMatchResults[matchId as keyof typeof mockMatchResults];
        if (mockMatch) {
          return { data: mockMatch, error: null };
        }
      }
      // Otherwise fetch real data
      return getMatchById(matchId);
    },
    enabled: !!matchId, // Só executa a query se o matchId existir
  });
}

// Hook para salvar o resultado de um match
export function useSaveMatchResult() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (matchData: {
      person_id: string;
      company_id: string;
      result_json: Match['result_json'];
    }) => {
      // Transform the data to match the expected API format
      return saveMatchResult({
        person_id: matchData.person_id,
        company_id: matchData.company_id,
        match_score: matchData.result_json.matchScore,
        result_data: matchData.result_json
      });
    },
    onSuccess: (data) => {
      // Invalidar as queries para recarregar os dados
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      if (data.data?.id) {
        queryClient.invalidateQueries({ queryKey: ['match', data.data.id] });
      }
    },
  });
}

// Hook para buscar dados agregados para o dashboard
export function useDashboardData() {
  const [useMockData, setUseMockData] = useState(false);
  
  // Check localStorage for mock data preference
  useEffect(() => {
    const savedPreference = localStorage.getItem('useMockData');
    if (savedPreference) {
      setUseMockData(savedPreference === 'true');
    }
  }, []);
  
  return useQuery({
    queryKey: ['dashboardData', useMockData],
    queryFn: async () => {
      // If using mock data, don't fetch from API
      if (useMockData) {
        // We'll handle the mock data in the dashboard component directly
        return { data: null, error: null };
      }
      // Otherwise fetch real data
      return getDashboardData();
    },
  });
}
