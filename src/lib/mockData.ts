// Mock data for dashboard and match results

export const mockDashboardData = {
  totalEvaluations: 24,
  averageScore: 78.5,
  topTraits: [
    { name: 'Inovação', count: 18 },
    { name: 'Colaboração', count: 15 },
    { name: 'Autonomia', count: 12 },
    { name: 'Foco no Cliente', count: 10 },
    { name: 'Transparência', count: 8 }
  ],
  recentMatches: [
    {
      id: 'mock-1',
      personName: 'João Silva',
      matchScore: 92,
      date: '2025-05-10T14:30:00Z'
    },
    {
      id: 'mock-2',
      personName: 'Maria Oliveira',
      matchScore: 85,
      date: '2025-05-08T10:15:00Z'
    },
    {
      id: 'mock-3',
      personName: 'Carlos Santos',
      matchScore: 78,
      date: '2025-05-05T16:45:00Z'
    },
    {
      id: 'mock-4',
      personName: 'Ana Pereira',
      matchScore: 65,
      date: '2025-05-03T09:20:00Z'
    },
    {
      id: 'mock-5',
      personName: 'Lucas Mendes',
      matchScore: 45,
      date: '2025-05-01T11:10:00Z'
    }
  ]
};

export const mockMonthlyTrends = [
  { month: 'Jan', score: 72, evaluations: 4, candidates: ['Ana Silva', 'Carlos Mendes', 'Juliana Costa', 'Roberto Alves'] },
  { month: 'Fev', score: 74, evaluations: 6, candidates: ['Pedro Santos', 'Mariana Lima', 'Thiago Oliveira', 'Fernanda Souza', 'Lucas Pereira', 'Camila Rodrigues'] },
  { month: 'Mar', score: 75, evaluations: 5, candidates: ['Gabriel Almeida', 'Isabela Martins', 'Rafael Ferreira', 'Amanda Gomes', 'Bruno Castro'] },
  { month: 'Abr', score: 77, evaluations: 8, candidates: ['Larissa Dias', 'Matheus Cardoso', 'Bianca Ribeiro', 'Felipe Nunes', 'Carla Moreira', 'Daniel Barbosa', 'Natalia Campos', 'Vitor Teixeira'] },
  { month: 'Mai', score: 78, evaluations: 7, candidates: ['João Silva', 'Maria Oliveira', 'Carlos Santos', 'Ana Pereira', 'Lucas Mendes', 'Juliana Freitas', 'Rodrigo Andrade'] },
  { month: 'Jun', score: 80, evaluations: 3, candidates: ['Renata Duarte', 'Gustavo Mello', 'Patricia Vieira'] }
];

export const mockPeopleData = [
  {
    id: 'person-1',
    token: 'JoaoSilva2025',
    name: 'João Silva',
    email: 'joao.silva@email.com',
    created_at: '2025-05-10T14:30:00Z',
    matches: [
      {
        id: 'mock-1',
        match_score: 92,
        created_at: '2025-05-10T14:30:00Z'
      }
    ],
    cultural_profile: {
      strengths: ['Inovação', 'Colaboração', 'Foco no Cliente'],
      development_areas: ['Autonomia'],
      work_style: 'Colaborativo e orientado a resultados',
      communication_style: 'Direto e transparente',
      leadership_potential: 'Alto',
      team_fit: 'Excelente',
      adaptability: 'Alta',
      growth_mindset: 'Forte'
    },
    career_aspirations: {
      short_term: 'Liderar projetos de inovação',
      long_term: 'Assumir posição de liderança em tecnologia',
      learning_interests: ['Metodologias ágeis', 'Liderança técnica', 'Inovação de produtos']
    }
  },
  {
    id: 'person-2',
    token: 'MariaOliveira2025',
    name: 'Maria Oliveira',
    email: 'maria.oliveira@email.com',
    created_at: '2025-05-08T10:15:00Z',
    matches: [
      {
        id: 'mock-2',
        match_score: 85,
        created_at: '2025-05-08T10:15:00Z'
      }
    ],
    cultural_profile: {
      strengths: ['Colaboração', 'Transparência', 'Foco no Cliente'],
      development_areas: ['Autonomia', 'Agilidade'],
      work_style: 'Estruturado e meticuloso',
      communication_style: 'Colaborativo e inclusivo',
      leadership_potential: 'Médio-alto',
      team_fit: 'Muito bom',
      adaptability: 'Média',
      growth_mindset: 'Forte'
    },
    career_aspirations: {
      short_term: 'Aprimorar habilidades de gestão de projetos',
      long_term: 'Coordenar equipes multidisciplinares',
      learning_interests: ['Gestão de projetos', 'Comunicação eficaz', 'Liderança']
    }
  },
  {
    id: 'person-3',
    token: 'CarlosSantos2025',
    name: 'Carlos Santos',
    email: 'carlos.santos@email.com',
    created_at: '2025-05-05T16:45:00Z',
    matches: [
      {
        id: 'mock-3',
        match_score: 78,
        created_at: '2025-05-05T16:45:00Z'
      }
    ],
    cultural_profile: {
      strengths: ['Autonomia', 'Inovação', 'Agilidade'],
      development_areas: ['Colaboração', 'Foco no Cliente'],
      work_style: 'Independente e criativo',
      communication_style: 'Direto e objetivo',
      leadership_potential: 'Médio',
      team_fit: 'Bom',
      adaptability: 'Alta',
      growth_mindset: 'Médio'
    },
    career_aspirations: {
      short_term: 'Especialização técnica',
      long_term: 'Desenvolver soluções inovadoras',
      learning_interests: ['Novas tecnologias', 'Arquitetura de software', 'Inovação']
    }
  },
  {
    id: 'person-4',
    token: 'AnaPereira2025',
    name: 'Ana Pereira',
    email: 'ana.pereira@email.com',
    created_at: '2025-05-03T09:20:00Z',
    matches: [
      {
        id: 'mock-4',
        match_score: 65,
        created_at: '2025-05-03T09:20:00Z'
      }
    ],
    cultural_profile: {
      strengths: ['Foco no Cliente', 'Inovação'],
      development_areas: ['Autonomia', 'Colaboração', 'Transparência', 'Agilidade'],
      work_style: 'Orientado a detalhes',
      communication_style: 'Cauteloso e reflexivo',
      leadership_potential: 'Baixo-médio',
      team_fit: 'Razoável',
      adaptability: 'Média-baixa',
      growth_mindset: 'Em desenvolvimento'
    },
    career_aspirations: {
      short_term: 'Melhorar habilidades de comunicação',
      long_term: 'Especialista em experiência do cliente',
      learning_interests: ['UX/UI', 'Comunicação', 'Atendimento ao cliente']
    }
  },
  {
    id: 'person-5',
    token: 'LucasMendes2025',
    name: 'Lucas Mendes',
    email: 'lucas.mendes@email.com',
    created_at: '2025-05-01T11:10:00Z',
    matches: [
      {
        id: 'mock-5',
        match_score: 45,
        created_at: '2025-05-01T11:10:00Z'
      }
    ],
    cultural_profile: {
      strengths: ['Potencial para crescimento'],
      development_areas: ['Inovação', 'Colaboração', 'Autonomia', 'Foco no Cliente', 'Transparência', 'Agilidade'],
      work_style: 'Estruturado e tradicional',
      communication_style: 'Reservado',
      leadership_potential: 'Baixo',
      team_fit: 'Desafiador',
      adaptability: 'Baixa',
      growth_mindset: 'Limitado'
    },
    career_aspirations: {
      short_term: 'Estabilidade profissional',
      long_term: 'Especialização em área atual',
      learning_interests: ['Habilidades técnicas específicas', 'Processos estruturados']
    }
  },
  {
    id: 'person-6',
    token: 'JulianaFreitas2025',
    name: 'Juliana Freitas',
    email: 'juliana.freitas@email.com',
    created_at: '2025-04-28T13:25:00Z',
    matches: [
      {
        id: 'mock-6',
        match_score: 88,
        created_at: '2025-04-28T13:25:00Z'
      }
    ],
    cultural_profile: {
      strengths: ['Colaboração', 'Transparência', 'Foco no Cliente', 'Inovação'],
      development_areas: ['Agilidade'],
      work_style: 'Colaborativo e criativo',
      communication_style: 'Aberto e empático',
      leadership_potential: 'Alto',
      team_fit: 'Excelente',
      adaptability: 'Alta',
      growth_mindset: 'Muito forte'
    },
    career_aspirations: {
      short_term: 'Liderar iniciativas de inovação centradas no cliente',
      long_term: 'Gestão de equipes de produto',
      learning_interests: ['Design Thinking', 'Liderança', 'Inovação centrada no usuário']
    }
  },
  {
    id: 'person-7',
    token: 'RodrigoAndrade2025',
    name: 'Rodrigo Andrade',
    email: 'rodrigo.andrade@email.com',
    created_at: '2025-04-25T09:40:00Z',
    matches: [
      {
        id: 'mock-7',
        match_score: 71,
        created_at: '2025-04-25T09:40:00Z'
      }
    ],
    cultural_profile: {
      strengths: ['Autonomia', 'Agilidade', 'Inovação'],
      development_areas: ['Colaboração', 'Transparência'],
      work_style: 'Independente e rápido',
      communication_style: 'Sucinto e direto',
      leadership_potential: 'Médio',
      team_fit: 'Moderado',
      adaptability: 'Alta',
      growth_mindset: 'Forte'
    },
    career_aspirations: {
      short_term: 'Aprimorar habilidades técnicas',
      long_term: 'Empreendedorismo ou intraempreendedorismo',
      learning_interests: ['Desenvolvimento ágil', 'Inovação', 'Empreendedorismo']
    }
  },
  {
    id: 'person-8',
    token: 'FernandaSouza2025',
    name: 'Fernanda Souza',
    email: 'fernanda.souza@email.com',
    created_at: '2025-04-22T15:50:00Z',
    matches: [
      {
        id: 'mock-8',
        match_score: 82,
        created_at: '2025-04-22T15:50:00Z'
      }
    ],
    cultural_profile: {
      strengths: ['Colaboração', 'Foco no Cliente', 'Transparência'],
      development_areas: ['Inovação'],
      work_style: 'Estruturado e colaborativo',
      communication_style: 'Claro e detalhado',
      leadership_potential: 'Alto',
      team_fit: 'Muito bom',
      adaptability: 'Média-alta',
      growth_mindset: 'Forte'
    },
    career_aspirations: {
      short_term: 'Aprimorar habilidades de gestão de pessoas',
      long_term: 'Liderança de equipes',
      learning_interests: ['Gestão de pessoas', 'Comunicação', 'Metodologias ágeis']
    }
  }
];

export const mockMatchResults = {
  'mock-1': {
    id: 'mock-1',
    person_id: 'person-1',
    company_id: 'company-1',
    match_score: 92,
    created_at: '2025-05-10T14:30:00Z',
    people: { name: 'João Silva' },
    companies: { name: 'Lupa Tecnologia' },
    result_data: {
      traits: [
        { name: 'Inovação', person: 95, company: 90, alignment: 'high' },
        { name: 'Colaboração', person: 85, company: 90, alignment: 'high' },
        { name: 'Autonomia', person: 80, company: 85, alignment: 'high' },
        { name: 'Foco no Cliente', person: 90, company: 85, alignment: 'high' },
        { name: 'Transparência', person: 85, company: 80, alignment: 'high' },
        { name: 'Agilidade', person: 90, company: 85, alignment: 'high' }
      ],
      alignmentPoints: [
        'Forte alinhamento em valores de inovação e criatividade',
        'Excelente compatibilidade na abordagem colaborativa',
        'Visão compartilhada sobre foco no cliente',
        'Alinhamento em práticas de transparência e comunicação aberta'
      ],
      frictionPoints: [
        'Pequena diferença na percepção sobre autonomia individual'
      ],
      recommendations: [
        'Explorar projetos inovadores que permitam criatividade',
        'Incentivar participação em iniciativas colaborativas',
        'Oferecer oportunidades de contato direto com clientes',
        'Estabelecer canais claros de comunicação e feedback'
      ]
    }
  },
  'mock-2': {
    id: 'mock-2',
    person_id: 'person-2',
    company_id: 'company-1',
    match_score: 85,
    created_at: '2025-05-08T10:15:00Z',
    people: { name: 'Maria Oliveira' },
    companies: { name: 'Lupa Tecnologia' },
    result_data: {
      traits: [
        { name: 'Inovação', person: 85, company: 90, alignment: 'high' },
        { name: 'Colaboração', person: 90, company: 90, alignment: 'high' },
        { name: 'Autonomia', person: 75, company: 85, alignment: 'medium' },
        { name: 'Foco no Cliente', person: 80, company: 85, alignment: 'high' },
        { name: 'Transparência', person: 80, company: 80, alignment: 'high' },
        { name: 'Agilidade', person: 75, company: 85, alignment: 'medium' }
      ],
      alignmentPoints: [
        'Forte compatibilidade em colaboração e trabalho em equipe',
        'Bom alinhamento em valores de inovação',
        'Visão compartilhada sobre transparência e comunicação'
      ],
      frictionPoints: [
        'Diferenças na percepção sobre autonomia individual',
        'Pequena divergência em práticas ágeis de trabalho'
      ],
      recommendations: [
        'Proporcionar ambiente colaborativo com espaço para contribuições individuais',
        'Oferecer treinamento em metodologias ágeis',
        'Estabelecer expectativas claras sobre autonomia e responsabilidade'
      ]
    }
  },
  'mock-3': {
    id: 'mock-3',
    person_id: 'person-3',
    company_id: 'company-1',
    match_score: 78,
    created_at: '2025-05-05T16:45:00Z',
    people: { name: 'Carlos Santos' },
    companies: { name: 'Lupa Tecnologia' },
    result_data: {
      traits: [
        { name: 'Inovação', person: 80, company: 90, alignment: 'high' },
        { name: 'Colaboração', person: 75, company: 90, alignment: 'medium' },
        { name: 'Autonomia', person: 85, company: 85, alignment: 'high' },
        { name: 'Foco no Cliente', person: 70, company: 85, alignment: 'medium' },
        { name: 'Transparência', person: 75, company: 80, alignment: 'medium' },
        { name: 'Agilidade', person: 80, company: 85, alignment: 'high' }
      ],
      alignmentPoints: [
        'Bom alinhamento em autonomia e independência',
        'Compatibilidade em valores de inovação',
        'Visão compartilhada sobre agilidade e adaptabilidade'
      ],
      frictionPoints: [
        'Diferenças na abordagem colaborativa',
        'Divergência em práticas de foco no cliente',
        'Pequenas diferenças em transparência e comunicação'
      ],
      recommendations: [
        'Equilibrar oportunidades para trabalho independente e colaborativo',
        'Proporcionar exposição a práticas de foco no cliente',
        'Estabelecer expectativas claras sobre comunicação e transparência'
      ]
    }
  },
  'mock-4': {
    id: 'mock-4',
    person_id: 'person-4',
    company_id: 'company-1',
    match_score: 65,
    created_at: '2025-05-03T09:20:00Z',
    people: { name: 'Ana Pereira' },
    companies: { name: 'Lupa Tecnologia' },
    result_data: {
      traits: [
        { name: 'Inovação', person: 70, company: 90, alignment: 'medium' },
        { name: 'Colaboração', person: 65, company: 90, alignment: 'medium' },
        { name: 'Autonomia', person: 60, company: 85, alignment: 'low' },
        { name: 'Foco no Cliente', person: 75, company: 85, alignment: 'medium' },
        { name: 'Transparência', person: 60, company: 80, alignment: 'low' },
        { name: 'Agilidade', person: 65, company: 85, alignment: 'medium' }
      ],
      alignmentPoints: [
        'Algum alinhamento em foco no cliente',
        'Potencial para desenvolvimento em práticas inovadoras'
      ],
      frictionPoints: [
        'Diferenças significativas em autonomia',
        'Divergências em práticas colaborativas',
        'Diferenças em transparência e comunicação',
        'Diferenças em agilidade e adaptabilidade'
      ],
      recommendations: [
        'Proporcionar mentoria em práticas colaborativas',
        'Estabelecer expectativas claras sobre autonomia e responsabilidade',
        'Oferecer treinamento em comunicação e transparência',
        'Desenvolver habilidades em metodologias ágeis'
      ]
    }
  },
  'mock-5': {
    id: 'mock-5',
    person_id: 'person-5',
    company_id: 'company-1',
    match_score: 45,
    created_at: '2025-05-01T11:10:00Z',
    people: { name: 'Lucas Mendes' },
    companies: { name: 'Lupa Tecnologia' },
    result_data: {
      traits: [
        { name: 'Inovação', person: 50, company: 90, alignment: 'low' },
        { name: 'Colaboração', person: 45, company: 90, alignment: 'low' },
        { name: 'Autonomia', person: 40, company: 85, alignment: 'low' },
        { name: 'Foco no Cliente', person: 55, company: 85, alignment: 'low' },
        { name: 'Transparência', person: 50, company: 80, alignment: 'low' },
        { name: 'Agilidade', person: 45, company: 85, alignment: 'low' }
      ],
      alignmentPoints: [
        'Potencial para crescimento em todas as áreas'
      ],
      frictionPoints: [
        'Diferenças significativas em todos os valores culturais principais',
        'Baixo alinhamento em práticas colaborativas',
        'Divergências em autonomia e responsabilidade',
        'Diferenças em foco no cliente',
        'Baixo alinhamento em transparência e comunicação',
        'Diferenças em agilidade e adaptabilidade'
      ],
      recommendations: [
        'Avaliar cuidadosamente o alinhamento cultural antes de prosseguir',
        'Considerar programas intensivos de desenvolvimento em valores culturais',
        'Estabelecer expectativas muito claras sobre todos os aspectos culturais',
        'Proporcionar mentoria regular e feedback contínuo'
      ]
    }
  }
};
