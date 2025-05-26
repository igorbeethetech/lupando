"use client";

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createPerson, getPeople, getPersonByToken } from '@/lib/api/people';
import { mockPeopleData } from '@/lib/mockData';
import { useState, useEffect } from 'react';

// Hook para buscar todas as pessoas
export function usePeople() {
  const [useMockData, setUseMockData] = useState(false);
  
  // Check localStorage for mock data preference
  useEffect(() => {
    const savedPreference = localStorage.getItem('useMockData');
    if (savedPreference) {
      setUseMockData(savedPreference === 'true');
    }
  }, []);
  
  return useQuery({
    queryKey: ['people', useMockData],
    queryFn: async () => {
      // If using mock data, return mock data
      if (useMockData) {
        return { data: mockPeopleData, error: null };
      }
      // Otherwise fetch real data
      return getPeople();
    },
  });
}

// Hook para buscar uma pessoa específica pelo token
export function usePersonByToken(token: string) {
  const [useMockData, setUseMockData] = useState(false);
  
  // Check localStorage for mock data preference
  useEffect(() => {
    const savedPreference = localStorage.getItem('useMockData');
    if (savedPreference) {
      setUseMockData(savedPreference === 'true');
    }
  }, []);
  
  return useQuery({
    queryKey: ['person', token, useMockData],
    queryFn: async () => {
      // If using mock data, find the person in mock data
      if (useMockData) {
        const mockPerson = mockPeopleData.find(person => person.token === token);
        if (mockPerson) {
          return { data: mockPerson, error: null };
        }
      }
      // Otherwise fetch real data
      return getPersonByToken(token);
    },
    enabled: !!token, // Só executa a query se o token existir
  });
}

// Hook para criar uma nova pessoa
export function useCreatePerson() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => createPerson(),
    onSuccess: () => {
      // Invalidar a query para recarregar os dados
      queryClient.invalidateQueries({ queryKey: ['people'] });
    },
  });
}
