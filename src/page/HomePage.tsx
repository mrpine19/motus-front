export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#1a1a1a]">
          Motus.IA: Motor de Impacto e Capacitação
        </h1>

        <p className="mt-4 text-lg md:text-xl text-[#1a1a1a]">
          Combatendo o{" "}
          <strong className="font-semibold text-[#1a1a1a]">Skills Gap</strong> na
          base da pirâmide com{" "}
          <strong className="font-semibold text-[#1a1a1a]">
            Inteligência Adaptativa
          </strong>
          .
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-white/80 p-6 rounded-lg border border-gray-300">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">
              O Risco da Exclusão Digital
            </h2>
            <p className="text-[#1a1a1a]">
              A automação ameaça milhões, e o modelo educacional tradicional
              falha em preparar jovens vulneráveis para o{" "}
              <strong className="font-medium text-[#1a1a1a]">
                Pensamento Analítico
              </strong>{" "}
              exigido pelo Fórum Econômico Mundial (WEF).
            </p>
          </div>

          <div className="bg-white/80 p-6 rounded-lg border border-gray-300">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-2">
              Nivelamento Científico e Gamificado
            </h2>
            <p className="text-[#1a1a1a]">
              Usamos neurociência e IA para garantir que cada aluno aprenda no
              seu ritmo, transformando o estudo em{" "}
              <strong className="font-medium text-[#1a1a1a]">engajamento</strong>{" "}
              e domínio de competências.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;