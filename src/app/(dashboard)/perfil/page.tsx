"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useCompanyProfile, useCreateCompany, useUpdateCompany } from '@/hooks/useCompany';

interface CompanyFormData {
  name: string;
  industry: string;
  size: string;
  website: string;
  description: string;
}

export default function CompanyProfilePage() {
  const { data: companyData, error: fetchError, isLoading } = useCompanyProfile();
  const createCompany = useCreateCompany();
  const updateCompany = useUpdateCompany();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CompanyFormData>();
  
  // Preencher o formulário quando os dados da empresa forem carregados
  useEffect(() => {
    if (companyData?.data) {
      reset({
        name: companyData.data.name || '',
        industry: companyData.data.industry || '',
        size: companyData.data.size || '',
        website: companyData.data.website || '',
        description: companyData.data.description || '',
      });
    }
  }, [companyData, reset]);
  
  // Função para lidar com o envio do formulário
  const onSubmit = async (formData: CompanyFormData) => {
    try {
      setIsSubmitting(true);
      setFormError(null);
      setFormSuccess(null);
      
      if (companyData?.data) {
        // Atualizar perfil existente
        const result = await updateCompany.mutateAsync({
          id: companyData.data.id,
          data: formData
        });
        
        if (result.error) {
          throw new Error(result.error.message);
        }
        
        setFormSuccess('Perfil da empresa atualizado com sucesso!');
      } else {
        // Criar novo perfil
        const result = await createCompany.mutateAsync(formData);
        
        if (result.error) {
          throw new Error(result.error.message);
        }
        
        setFormSuccess('Perfil da empresa criado com sucesso!');
      }
    } catch (error: any) {
      setFormError(error.message || 'Ocorreu um erro ao salvar o perfil da empresa.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Perfil da Empresa</h1>
      
      {/* Status de carregamento, erro ou sucesso */}
      {isLoading && (
        <div className="bg-blue-50 p-4 rounded-md mb-6">
          <p className="text-blue-700">Carregando dados da empresa...</p>
        </div>
      )}
      
      {fetchError && (
        <div className="bg-red-50 p-4 rounded-md mb-6">
          <p className="text-red-700">Erro ao carregar dados: {fetchError.message}</p>
        </div>
      )}
      
      {formError && (
        <div className="bg-red-50 p-4 rounded-md mb-6">
          <p className="text-red-700">{formError}</p>
        </div>
      )}
      
      {formSuccess && (
        <div className="bg-green-50 p-4 rounded-md mb-6">
          <p className="text-green-700">{formSuccess}</p>
        </div>
      )}
      
      {/* Formulário de Perfil */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Informações da Empresa</h2>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Atualize os detalhes da sua empresa para nos ajudar a entender melhor sua organização.
          </p>
        </div>
        
        <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Nome da Empresa */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome da Empresa
              </label>
              <div className="mt-1">
                <input 
                  type="text" 
                  id="name" 
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                  placeholder="SoftLab Tecnologia" 
                  {...register('name', { required: 'Nome da empresa é obrigatório' })}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                )}
              </div>
            </div>
            
            {/* Indústria/Setor */}
            <div>
              <label htmlFor="industry" className="block text-sm font-medium text-gray-700">
                Indústria/Setor
              </label>
              <div className="mt-1">
                <select 
                  id="industry" 
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  {...register('industry', { required: 'Setor é obrigatório' })}
                >
                  <option value="">Selecione um setor</option>
                  <option value="technology">Tecnologia</option>
                  <option value="healthcare">Saúde</option>
                  <option value="finance">Finanças</option>
                  <option value="education">Educação</option>
                  <option value="retail">Varejo</option>
                  <option value="manufacturing">Indústria</option>
                  <option value="services">Serviços Profissionais</option>
                  <option value="other">Outro</option>
                </select>
                {errors.industry && (
                  <p className="mt-1 text-sm text-red-600">{errors.industry.message}</p>
                )}
              </div>
            </div>
            
            {/* Tamanho da Empresa */}
            <div>
              <label htmlFor="size" className="block text-sm font-medium text-gray-700">
                Tamanho da Empresa
              </label>
              <div className="mt-1">
                <select 
                  id="size" 
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  {...register('size', { required: 'Tamanho da empresa é obrigatório' })}
                >
                  <option value="">Selecione o tamanho da empresa</option>
                  <option value="1-10">1-10 funcionários</option>
                  <option value="11-50">11-50 funcionários</option>
                  <option value="51-200">51-200 funcionários</option>
                  <option value="201-500">201-500 funcionários</option>
                  <option value="501-1000">501-1000 funcionários</option>
                  <option value="1001+">1001+ funcionários</option>
                </select>
                {errors.size && (
                  <p className="mt-1 text-sm text-red-600">{errors.size.message}</p>
                )}
              </div>
            </div>
            
            {/* Site */}
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                Site
              </label>
              <div className="mt-1">
                <input 
                  type="url" 
                  id="website" 
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                  placeholder="https://exemplo.com.br" 
                  {...register('website')}
                />
              </div>
            </div>
            
            {/* Descrição da Empresa */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Descrição da Empresa
              </label>
              <div className="mt-1">
                <textarea 
                  id="description" 
                  rows={4} 
                  className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" 
                  placeholder="Breve descrição da sua empresa, missão e valores..."
                  {...register('description', { required: 'Descrição da empresa é obrigatória' })}
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
                )}
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Breve descrição da sua empresa que ajudará os candidatos a entenderem sua organização.
              </p>
            </div>
            
            {/* Upload de Logo - Será implementado posteriormente */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Logo da Empresa</label>
              <div className="mt-1 flex items-center">
                <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <button
                  type="button"
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Alterar
                </button>
              </div>
            </div>
            
            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => reset()}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isSubmitting}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Salvando...' : 'Salvar'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
