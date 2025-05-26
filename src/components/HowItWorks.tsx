'use client'
import { useState } from "react";
import { CheckCircle, Link, MessageCircle, BarChart, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const steps = [
  {
    id: 1,
    title: "Empresa responde",
    description: "Complete um formulário detalhado sobre a cultura da sua organização",
    detail: "Nosso questionário especializado captura os verdadeiros valores e práticas da sua empresa, não apenas o que está escrito no site. Avaliamos 6 dimensões culturais críticas.",
    icon: CheckCircle,
    image: "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 2,
    title: "Compartilha link",
    description: "Gere e compartilhe links personalizados com candidatos",
    detail: "Com um simples clique, crie um link único que pode ser enviado para qualquer número de candidatos. O sistema gera IDs únicos para cada acesso, mantendo o mesmo link para sua conveniência.",
    icon: Link,
    image: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 3,
    title: "Pessoas avaliam",
    description: "Candidatos respondem a perguntas via chat interativo",
    detail: "Nossa interface de chat guiada por IA cria uma experiência conversacional fluida e natural para candidatos. As perguntas são adaptadas para extrair valores e expectativas culturais autênticas.",
    icon: MessageCircle,
    image: "https://images.unsplash.com/photo-1552960562-daf630e9278b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
  },
  {
    id: 4,
    title: "Dashboards em tempo real",
    description: "Visualize resultados e compatibilidade cultural instantaneamente",
    detail: "Algoritmos especializados analisam respostas e geram pontuações de compatibilidade. Identifique rapidamente alinhamentos e desalinhamentos culturais em cada dimensão para tomar decisões embasadas.",
    icon: BarChart,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
  },
];

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(1);
  
  return (
    <section id="como-funciona" className="py-20 bg-gradient-to-b from-gray-50 to-white w-full">
      <div className="container mx-auto px-4 max-w-full lg:max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Como Funciona</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Um processo simples e eficaz para encontrar as pessoas certas para sua cultura organizacional
          </p>
        </div>
        
        <div className="hidden md:block">
          {/* Desktop version - Interactive tabs */}
          <Tabs defaultValue="1" className="w-full" onValueChange={(value) => setActiveStep(parseInt(value))}>
            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="md:w-1/2">
                <TabsList className="grid grid-cols-1 h-auto bg-transparent">
                  {steps.map((step) => (
                    <TabsTrigger 
                      key={step.id}
                      value={step.id.toString()}
                      className={cn(
                        "flex items-start gap-4 p-6 rounded-lg text-left h-auto border transition-all",
                        activeStep === step.id 
                          ? "border-primary bg-primary/5 shadow-sm data-[state=active]:bg-primary/5" 
                          : "border-gray-200 hover:bg-gray-50 data-[state=active]:bg-primary/5"
                      )}
                    >
                      <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center border-2 border-primary shrink-0 mt-1">
                        <span className="text-lg font-bold text-primary">{step.id}</span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2 flex items-center">
                          {step.title}
                          {activeStep === step.id && <ChevronRight className="ml-2 h-5 w-5 text-primary" />}
                        </h3>
                        <p className="text-gray-600 line-clamp-2">{step.description}</p>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
              
              <div className="md:w-1/2">
                {steps.map((step) => (
                  <TabsContent key={step.id} value={step.id.toString()} className="mt-0">
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
                      <div className="h-64 overflow-hidden">
                        <img 
                          src={step.image} 
                          alt={step.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6">
                        <div className="mb-4 text-primary">
                          <step.icon size={28} className="text-primary" />
                        </div>
                        <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                        <p className="text-gray-600">{step.detail}</p>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </div>
            </div>
          </Tabs>
        </div>
        
        {/* Mobile version - Cards stacked */}
        <div className="grid grid-cols-1 gap-8 md:hidden">
          {steps.map((step) => (
            <div key={step.id} className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
              <div className="h-48 overflow-hidden">
                <img 
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center border-2 border-primary shrink-0">
                    <span className="text-lg font-bold text-primary">{step.id}</span>
                  </div>
                  <step.icon size={24} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600 mb-4">{step.description}</p>
                <p className="text-gray-700 text-sm line-clamp-4">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
