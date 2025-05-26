'use client'
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowRight, CheckCircle, Loader2 } from "lucide-react";

const ContactForm = () => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Esta é a URL que o usuário deverá configurar para o webhook do n8n
  const N8N_WEBHOOK_URL = process.env.VITE_N8N_WEBHOOK_URL || "https://n8n.example.com/webhook/lupa-contato";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Apenas chamando o webhook do n8n via GET
      const webhookUrl = `${N8N_WEBHOOK_URL}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&company=${encodeURIComponent(company)}&position=${encodeURIComponent(position)}`;
      
      const response = await fetch(webhookUrl, {
        method: "GET",
        headers: {
          "Accept": "application/json",
        },
      });
      
      if (!response.ok) {
        throw new Error('Falha ao enviar formulário');
      }
      
      // Exibir mensagem de sucesso
      toast({
        title: "Formulário enviado",
        description: "Agradecemos pelo interesse! Entraremos em contato logo.",
      });
      
      // Reset form and show success state
      setName("");
      setEmail("");
      setCompany("");
      setPosition("");
      setMessage("");
      setSuccess(true);
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);
      
    } catch (error) {
      console.error("Erro ao enviar formulário:", error);
      toast({
        title: "Erro ao enviar",
        description: "Houve um problema ao processar seu pedido. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="py-16 relative">
      {/* Background with pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100 to-white -z-10 opacity-70">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}/>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Left side - Info */}
            <div className="md:w-2/5 bg-gradient-to-br from-primary to-purple-600 p-8 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Entre em contato</h2>
              <p className="mb-8 opacity-90">
                Descubra como o Lupa pode transformar seu processo de recrutamento e seleção com análise cultural avançada.
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-xl mb-3">O que oferecemos:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle size={18} className="text-white" />
                      <span>Demonstração personalizada</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={18} className="text-white" />
                      <span>Consultoria de implantação</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={18} className="text-white" />
                      <span>Teste gratuito por 14 dias</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle size={18} className="text-white" />
                      <span>Suporte técnico especializado</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Right side - Form */}
            <div className="md:w-3/5 p-8">
              <h3 className="text-xl font-semibold mb-6">Solicitar Demonstração</h3>
              
              {success ? (
                <div className="text-center py-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 text-green-600 mb-4">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="text-xl font-medium mb-2">Mensagem Enviada!</h4>
                  <p className="text-gray-500">Agradecemos seu interesse. Nossa equipe entrará em contato em breve.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nome completo *
                      </label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="Seu nome"
                        className="bg-gray-50"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email corporativo *
                      </label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="seu@email.com"
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                        Empresa *
                      </label>
                      <Input
                        id="company"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required
                        placeholder="Nome da empresa"
                        className="bg-gray-50"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                        Cargo *
                      </label>
                      <Input
                        id="position"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        required
                        placeholder="Seu cargo"
                        className="bg-gray-50"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Como podemos ajudar?
                    </label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Conte-nos um pouco sobre suas necessidades..."
                      rows={4}
                      className="bg-gray-50"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full flex items-center justify-center gap-2" 
                    disabled={loading}
                    size="lg"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Solicitar Demo
                        <ArrowRight size={16} />
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-gray-500 mt-4">
                    Ao enviar este formulário, você concorda com nossa política de privacidade.
                    Seus dados serão usados exclusivamente para atender à sua solicitação.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
