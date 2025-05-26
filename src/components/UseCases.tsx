'use client'
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const cases = [
  {
    id: "startup",
    title: "Startup de Tecnologia",
    description: "Reduziu o tempo de contratação em 40% e melhorou a retenção de talentos",
    detail: "Uma startup de tecnologia com 50 funcionários utilizou o Lupa para alinhar seu crescimento acelerado com a cultura ágil e colaborativa que construíram.",
    challenge: "A empresa estava crescendo rapidamente e precisava contratar muitos profissionais sem perder a essência cultural que os diferenciava no mercado.",
    solution: "Utilizando o Lupa, conseguiram identificar candidatos que se identificavam com valores de autonomia, inovação e colaboração.",
    results: [
      "Redução de 40% no tempo de contratação", 
      "Diminuição de 35% no turnover dos primeiros 6 meses", 
      "Aumento de 28% na satisfação do time"
    ],
    testimonial: {
      quote: "O Lupa nos permitiu escalar nosso time sem diluir nossa cultura. A diferença na integração e produtividade dos novos talentos é impressionante.",
      author: "Ana Luiza, Head de Pessoas",
      company: "TechFuture"
    },
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "industria",
    title: "Indústria Tradicional",
    description: "Diminuiu rotatividade em 25% com melhores contratações culturais",
    detail: "Uma indústria tradicional com 500 colaboradores conseguiu transformar seu ambiente operacional com contratações mais alinhadas aos novos valores.",
    challenge: "A empresa precisava modernizar sua cultura para atrair novos talentos, enquanto mantinha o respeito por sua história e valores fundamentais.",
    solution: "Com o Lupa, mapearam sua cultura atual e desejada, identificando candidatos que poderiam contribuir para a evolução cultural gradual.",
    results: [
      "Redução de 25% na rotatividade geral", 
      "Economia de R$1.2M em custos de recontratação", 
      "Aumento de 42% em propostas aceitas"
    ],
    testimonial: {
      quote: "Precisávamos evoluir sem perder nossa essência. O Lupa nos ajudou a identificar talentos que respeitam nossa trajetória mas trazem novas perspectivas.",
      author: "Roberto Mendes, Diretor Industrial",
      company: "BrasilFlex"
    },
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
  },
  {
    id: "agencia",
    title: "Agência Criativa",
    description: "Aumentou a satisfação dos funcionários e reduziu conflitos internos",
    detail: "Uma agência criativa com 30 talentos diversos melhorou a colaboração interna e o alinhamento de expectativas desde a contratação.",
    challenge: "O ambiente criativo gerava frequentes conflitos de expectativas entre equipes, afetando a qualidade das entregas e satisfação dos profissionais.",
    solution: "Implementaram o Lupa para alinhar expectativas culturais desde o início e identificar compatibilidades entre perfis de candidatos e times existentes.",
    results: [
      "Aumento de 38% em avaliação de satisfação interna", 
      "Redução de 65% em conflitos reportados", 
      "Crescimento de 27% na produtividade dos projetos"
    ],
    testimonial: {
      quote: "Nossa indústria depende de química entre os talentos. O Lupa transformou nossa forma de entender compatibilidade cultural e montar times complementares.",
      author: "Juliana Costa, Diretora Criativa",
      company: "ImpactoLab"
    },
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
  }
];

const UseCases = () => {
  const [activeTab, setActiveTab] = useState("startup");
  
  return (
    <section id="casos-de-uso" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="text-primary font-semibold">RESULTADOS COMPROVADOS</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Casos de Sucesso</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conheça organizações que transformaram seus processos com o Lupa e obtiveram resultados mensuráveis
          </p>
        </div>
        
        {/* Desktop version - Tabs */}
        <div className="hidden lg:block">
          <Tabs defaultValue="startup" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              {cases.map((item) => (
                <TabsTrigger 
                  key={item.id} 
                  value={item.id}
                  className="data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                >
                  {item.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {cases.map((item) => (
              <TabsContent key={item.id} value={item.id} className="mt-0">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2 h-64 md:h-auto">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="md:w-1/2 p-8">
                      <div className="mb-4">
                        <span className="text-sm text-primary font-medium">{item.description}</span>
                        <h3 className="text-2xl font-bold mt-2">{item.title}</h3>
                      </div>
                      
                      <div className="space-y-4 mb-6">
                        <div>
                          <h4 className="font-semibold text-gray-800">Desafio:</h4>
                          <p className="text-gray-600">{item.challenge}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-800">Solução:</h4>
                          <p className="text-gray-600">{item.solution}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-800">Resultados:</h4>
                          <ul className="mt-2 space-y-1">
                            {item.results.map((result, index) => (
                              <li key={index} className="flex items-center">
                                <span className="text-primary mr-2">•</span>
                                <span className="text-gray-600">{result}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      
                      <blockquote className="border-l-4 border-primary pl-4 italic text-gray-700">
                        "{item.testimonial.quote}"
                        <footer className="mt-2 text-sm text-gray-500">
                          <strong>{item.testimonial.author}</strong>, {item.testimonial.company}
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        {/* Mobile/tablet version - Carousel */}
        <div className="lg:hidden">
          <Carousel className="w-full">
            <CarouselContent>
              {cases.map((item, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-6">
                      <div className="mb-4">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <p className="text-sm text-primary font-medium mt-1">{item.description}</p>
                      </div>
                      
                      <div className="space-y-4 mb-4">
                        <div>
                          <h4 className="font-semibold text-gray-800">Desafio:</h4>
                          <p className="text-gray-600 text-sm">{item.challenge}</p>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-800">Resultados-chave:</h4>
                          <ul className="mt-1">
                            <li className="text-gray-600 text-sm">{item.results[0]}</li>
                          </ul>
                        </div>
                      </div>
                      
                      <blockquote className="border-l-2 border-primary pl-3 italic text-gray-700 text-sm">
                        "{item.testimonial.quote.substring(0, 100)}..."
                        <footer className="mt-1 text-xs text-gray-500">
                          {item.testimonial.author}
                        </footer>
                      </blockquote>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex justify-center mt-6">
              <CarouselPrevious className="static translate-y-0 mr-2" />
              <CarouselNext className="static translate-y-0 ml-2" />
            </div>
          </Carousel>
        </div>
        
        {/* CTAs */}
        <div className="mt-12 text-center">
          <div className="bg-white border border-gray-200 p-8 rounded-lg shadow-sm max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-4">Pronto para transformar seu processo de contratação?</h3>
            <p className="text-gray-600 mb-6">
              Agende uma demonstração gratuita e descubra como o Lupa pode ajudar sua empresa a construir times culturalmente alinhados
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contato" className={cn(
                "px-8 py-3 rounded-md font-medium text-white bg-primary hover:bg-primary/90 transition-colors",
                "flex items-center justify-center gap-2"
              )}>
                Solicitar demonstração
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;
