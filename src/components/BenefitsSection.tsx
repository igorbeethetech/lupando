
import { ArrowDown, ArrowUp, Clock, Heart, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";

const benefits = [
  {
    title: "Tempo de contratação",
    value: "47%",
    direction: "down",
    icon: Clock,
    description: "Reduza o tempo do processo seletivo com avaliações culturais automatizadas",
  },
  {
    title: "Engajamento",
    value: "32%",
    direction: "up",
    icon: Heart,
    description: "Aumente o engajamento contratando pessoas alinhadas à cultura da empresa",
  },
  {
    title: "Retenção",
    value: "18%",
    direction: "up",
    icon: Users,
    description: "Melhore a retenção de talentos através do fit cultural adequado",
  },
];

const BenefitsSection = () => {
  return (
    <section id="beneficios" className="py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Benefícios Comprovados</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border border-gray-medium hover:border-primary transition-colors duration-300">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-primary/10 rounded-full p-4">
                    <benefit.icon size={32} className="text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-3xl font-bold">{benefit.value}</span>
                  {benefit.direction === "up" ? (
                    <ArrowUp className="text-green-600" />
                  ) : (
                    <ArrowDown className="text-green-600" />
                  )}
                </div>
                <p className="text-gray-dark">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
