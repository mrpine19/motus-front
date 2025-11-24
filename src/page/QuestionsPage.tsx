import { useState } from "react";
import { ChevronDown, ChevronUp, MessageCircle } from "lucide-react";

export function QuestionsPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev =>
      prev.includes(index)
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqItems = [
    {
      question: "O que é o Motus.IA?",
      answer: "O Motus.IA é uma plataforma de impacto social que combate o skills gap na base da pirâmide através de inteligência artificial adaptativa, nivelamento científico e gamificação do aprendizado."
    },
    {
      question: "Como a plataforma funciona?",
      answer: "Usamos neurociência e IA para criar percursos de aprendizado personalizados que se adaptam ao ritmo de cada aluno, transformando o estudo em engajamento através de metodologias gamificadas."
    },
    {
      question: "Quem pode usar o Motus.IA?",
      answer: "Nossa plataforma é voltada para jovens em situação de vulnerabilidade social, instituições de ensino, ONGs e empresas que queiram investir em capacitação e inclusão digital."
    },
    {
      question: "Qual o custo para usar a plataforma?",
      answer: "Oferecemos diferentes modelos de negócio: versão gratuita para instituições sem fins lucrativos, e planos premium para empresas que desejam implementar programas de capacitação em larga escala."
    },
    {
      question: "Quais competências são desenvolvidas?",
      answer: "Focamos nas habilidades do futuro listadas pelo Fórum Econômico Mundial, com ênfase em pensamento analítico, resolução de problemas, criatividade e competências digitais básicas."
    },
    {
      question: "Como é feita a avaliação do aprendizado?",
      answer: "Utilizamos um sistema de avaliação contínua baseado em IA que acompanha o progresso em tempo real, identificando gaps de conhecimento e sugerindo conteúdos complementares automaticamente."
    },
    {
      question: "A plataforma é acessível?",
      answer: "Sim, desenvolvemos nossa solução seguindo as diretrizes de acessibilidade WCAG, com suporte a leitores de tela, alto contraste e navegação por teclado."
    },
    {
      question: "Posso integrar com outros sistemas?",
      answer: "Oferecemos APIs REST para integração com sistemas existentes, LMS (Learning Management Systems) e plataformas de RH corporativas."
    }
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <MessageCircle className="text-white" size={32} />
        </div>
        <h1 className="text-5xl font-bold text-[#1a1a1a] mb-4">
          Perguntas Frequentes
        </h1>
        <p className="text-xl text-[#1a1a1a]/80 max-w-2xl mx-auto">
          Encontre respostas para as dúvidas mais comuns sobre o Motus.IA
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className="border-b border-gray-200/50 last:border-b-0"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50/50 transition-colors duration-200"
              >
                <h3 className="text-lg font-semibold text-[#1a1a1a] pr-4">
                  {item.question}
                </h3>
                <div className="flex-shrink-0">
                  {openItems.includes(index) ? (
                    <ChevronUp className="text-cyan-500" size={20} />
                  ) : (
                    <ChevronDown className="text-gray-400" size={20} />
                  )}
                </div>
              </button>
              
              {openItems.includes(index) && (
                <div className="px-8 pb-6">
                  <p className="text-[#1a1a1a]/80 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50">
            <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">
              Não encontrou o que procurava?
            </h3>
            <p className="text-[#1a1a1a]/80 mb-6 max-w-md mx-auto">
              Nossa equipe está pronta para esclarecer todas as suas dúvidas.
            </p>
            <a
              href="/contato"
              className="inline-flex items-center bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105"
            >
              <MessageCircle size={20} className="mr-2" />
              Fale Conosco
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionsPage;
