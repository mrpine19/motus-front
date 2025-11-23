import { useState } from "react";
import { Send, Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";

export function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: <Mail size={24} />,
      title: "Email",
      value: "contato@motusia.com",
      description: "Envie-nos um email"
    },
    {
      icon: <Phone size={24} />,
      title: "Telefone",
      value: "+55 (11) 99999-9999",
      description: "Segunda a Sexta, 9h-18h"
    },
    {
      icon: <MapPin size={24} />,
      title: "Localização",
      value: "São Paulo, SP",
      description: "Brasil"
    },
    {
      icon: <Clock size={24} />,
      title: "Horário Comercial",
      value: "Seg - Sex: 9h-18h",
      description: "Fechado nos feriados"
    }
  ];

  const subjects = [
    "Parceria Comercial",
    "Investimento",
    "Demonstração do Produto",
    "Suporte Técnico",
    "Trabalhe Conosco",
    "Outro"
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-[#1a1a1a] mb-4">
          Vamos Conversar
        </h1>
        <p className="text-xl text-[#1a1a1a]/80 max-w-2xl mx-auto">
          Pronto para transformar o futuro do trabalho? Entre em contato e 
          descubra como o Motus.IA pode impactar sua organização.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
        <div className="lg:col-span-1">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50">
            <h2 className="text-2xl font-bold text-[#1a1a1a] mb-6">
              Nossos Canais
            </h2>
            
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center text-white">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#1a1a1a]">{info.title}</h3>
                    <p className="text-[#1a1a1a] font-medium">{info.value}</p>
                    <p className="text-[#1a1a1a]/70 text-sm">{info.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2">
          {isSubmitted ? (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 text-center shadow-xl border border-gray-200/50">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="text-green-600" size={40} />
              </div>
              <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">
                Mensagem Enviada!
              </h2>
              <p className="text-[#1a1a1a]/80 text-lg mb-8 max-w-md mx-auto">
                Obrigado pelo seu interesse no Motus.IA. Nossa equipe entrará em 
                contato em até 24 horas úteis.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    name: "",
                    email: "",
                    company: "",
                    subject: "",
                    message: ""
                  });
                }}
                className="bg-[#1a1a1a] hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105"
              >
                Enviar Nova Mensagem
              </button>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    className="block text-[#1a1a1a] text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Nome Completo *
                  </label>
                  <input
                    className="shadow appearance-none border rounded-lg w-full py-3 px-4 bg-white border-gray-300 text-[#1a1a1a] leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500 transition-colors"
                    id="name"
                    type="text"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label
                    className="block text-[#1a1a1a] text-sm font-bold mb-2"
                    htmlFor="email"
                  >
                    Email Corporativo *
                  </label>
                  <input
                    className="shadow appearance-none border rounded-lg w-full py-3 px-4 bg-white border-gray-300 text-[#1a1a1a] leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500 transition-colors"
                    id="email"
                    type="email"
                    placeholder="seuemail@empresa.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    className="block text-[#1a1a1a] text-sm font-bold mb-2"
                    htmlFor="company"
                  >
                    Empresa
                  </label>
                  <input
                    className="shadow appearance-none border rounded-lg w-full py-3 px-4 bg-white border-gray-300 text-[#1a1a1a] leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500 transition-colors"
                    id="company"
                    type="text"
                    placeholder="Nome da sua empresa"
                    value={formData.company}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    className="block text-[#1a1a1a] text-sm font-bold mb-2"
                    htmlFor="subject"
                  >
                    Assunto *
                  </label>
                  <select
                    className="shadow appearance-none border rounded-lg w-full py-3 px-4 bg-white border-gray-300 text-[#1a1a1a] leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500 transition-colors"
                    id="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Selecione um assunto</option>
                    {subjects.map((subject, index) => (
                      <option key={index} value={subject}>
                        {subject}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <label
                  className="block text-[#1a1a1a] text-sm font-bold mb-2"
                  htmlFor="message"
                >
                  Mensagem *
                </label>
                <textarea
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 bg-white border-gray-300 text-[#1a1a1a] leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500 transition-colors h-40 resize-none"
                  id="message"
                  placeholder="Conte-nos mais sobre seu interesse no Motus.IA..."
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[#1a1a1a]/70 text-sm">
                  * Campos obrigatórios
                </p>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                >
                  <Send size={20} />
                  <span>Enviar Mensagem</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactPage;