"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { submitContactForm } from "@/lib/api/contact";

export default function Home() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    empresa: "",
    mensagem: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: false,
    message: ""
  });
  
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: false, message: "" });
    
    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Solicitação enviada com sucesso! Entraremos em contato em breve."
        });
        // Reset the form
        setFormData({
          nome: "",
          email: "",
          empresa: "",
          mensagem: ""
        });
      } else {
        setSubmitStatus({
          success: false,
          message: `Erro ao enviar solicitação: ${result.error}`
        });
      }
    } catch (error: any) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus({
        success: false,
        message: "Erro ao enviar solicitação. Por favor, tente novamente mais tarde."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navegação */}
      <nav className="bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">Lupa</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="px-4 py-2 rounded text-indigo-600 hover:text-indigo-800">
              Entrar
            </Link>
            <Link href="/login" className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
              Solicitar Demo
            </Link>
          </div>
        </div>
      </nav>

      {/* Seção principal com fundo animado */}
      <section className="relative py-20 overflow-hidden bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] bg-repeat animate-grid-float"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-indigo-300 to-transparent rounded-full animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Repense o fit cultural. Encontre pessoas que realmente pertencem.
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              Lupa conecta candidatos com a alma da sua empresa — não apenas com habilidades.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/login" className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Comece Agora
              </Link>
              <a href="#contact" className="px-6 py-3 bg-white text-indigo-600 border border-indigo-600 rounded-md hover:bg-indigo-50 transition-colors">
                Saiba Mais
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Seção Antes & Depois */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">O Diferencial da Lupa</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Card Antes */}
            <div className="bg-gray-100 rounded-lg p-8 shadow-sm transition-transform hover:-translate-y-1">
              <h3 className="text-2xl font-semibold mb-4 text-red-600">Contratação sem a Lupa</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Expectativas e valores desalinhados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Alta rotatividade devido ao desalinhamento cultural</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Decisões de contratação baseadas apenas em habilidades e experiência</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>"Feeling" subjetivo sobre adequação cultural</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Avaliação inconsistente entre candidatos</span>
                </li>
              </ul>
            </div>
            
            {/* Card Depois */}
            <div className="bg-indigo-50 rounded-lg p-8 shadow-sm transition-transform hover:-translate-y-1">
              <h3 className="text-2xl font-semibold mb-4 text-green-600">Contratação com a Lupa</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Alinhamento claro de valores e expectativas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Redução da rotatividade e aumento da retenção</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Insights de compatibilidade cultural baseados em dados</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Avaliação objetiva do alinhamento cultural</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Estrutura de avaliação consistente para todos os candidatos</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">O Que Nossos Clientes Dizem</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Depoimento 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 overflow-hidden mr-4 flex items-center justify-center text-indigo-600 font-bold">
                  AR
                </div>
                <div>
                  <h4 className="font-semibold">Ana Ribeiro</h4>
                  <p className="text-sm text-gray-600">Gerente de RH @ SoftLab</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Com a Lupa, finalmente contratamos pessoas que realmente combinam com nossa cultura. A rotatividade caiu 30%."
              </p>
            </div>
            
            {/* Depoimento 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 overflow-hidden mr-4 flex items-center justify-center text-indigo-600 font-bold">
                  CM
                </div>
                <div>
                  <h4 className="font-semibold">Carlos Mendes</h4>
                  <p className="text-sm text-gray-600">CEO @ TechVision</p>
                </div>
              </div>
              <p className="text-gray-700">
                "A Lupa transformou nosso processo de contratação. Agora construimos equipes que realmente compartilham nossa visão e valores."
              </p>
            </div>
            
            {/* Depoimento 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-indigo-100 overflow-hidden mr-4 flex items-center justify-center text-indigo-600 font-bold">
                  MC
                </div>
                <div>
                  <h4 className="font-semibold">Mariana Costa</h4>
                  <p className="text-sm text-gray-600">People Ops @ Innovate Inc</p>
                </div>
              </div>
              <p className="text-gray-700">
                "Os insights da Lupa nos ajudaram a entender melhor nossa própria cultura e encontrar candidatos que realmente se encaixam."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Formulário de Contato */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Solicite uma Demo</h2>
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                    required 
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Nome da Empresa</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                  required 
                  value={formData.empresa}
                  onChange={(e) => setFormData({...formData, empresa: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensagem</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500" 
                  required
                  value={formData.mensagem}
                  onChange={(e) => setFormData({...formData, mensagem: e.target.value})}
                ></textarea>
              </div>
              <div>
                <button 
                  type="submit" 
                  className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 transition-colors"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
                </button>
              </div>
              {submitStatus.message && (
                <div className={`p-4 rounded-md ${submitStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {submitStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Rodapé */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Lupa</h3>
              <p className="text-gray-300">
                Conectando candidatos com a cultura da sua empresa — não apenas com habilidades.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-300 hover:text-white">Início</Link></li>
                <li><Link href="/login" className="text-gray-300 hover:text-white">Entrar</Link></li>
                <li><a href="#contact" className="text-gray-300 hover:text-white">Contato</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contato</h4>
              <p className="text-gray-300 mb-2">contato@oilupa.com</p>
              <p className="text-gray-300">+55 (21) 99999-9999</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Lupa. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
