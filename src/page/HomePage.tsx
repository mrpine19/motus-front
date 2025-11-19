export function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-indigo-400">
          Motus.IA: Motor de Impacto e Capacitação
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Combatendo o{" "}
          <strong className="font-semibold text-cyan-400">Skills Gap</strong> na
          base da pirâmide com{" "}
          <strong className="font-semibold text-cyan-400">
            Inteligência Adaptativa
          </strong>
          .
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-bold text-gray-200 mb-2">
              O Risco da Exclusão Digital
            </h2>
            <p className="text-gray-400">
              A automação ameaça milhões, e o modelo educacional tradicional
              falha em preparar jovens vulneráveis para o{" "}
              <strong className="font-medium text-gray-300">
                Pensamento Analítico
              </strong>{" "}
              exigido pelo Fórum Econômico Mundial (WEF).
            </p>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
            <h2 className="text-xl font-bold text-gray-200 mb-2">
              Nivelamento Científico e Gamificado
            </h2>
            <p className="text-gray-400">
              Usamos neurociência e IA para garantir que cada aluno aprenda no
              seu ritmo, transformando o estudo em{" "}
              <strong className="font-medium text-gray-300">engajamento</strong>{" "}
              e domínio de competências.
            </p>
          </div>
        </div>

        <div className="mt-12">
          <button
            className="px-8 py-4 bg-cyan-400 text-gray-900 font-bold text-lg rounded-lg hover:bg-cyan-300 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
          >
            Começar a Transformação
          </button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;