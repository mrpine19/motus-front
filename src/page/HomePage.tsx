export function HomePage() {
  const handleVepinhoClick = () => {
    window.open('https://ceappedreira.org.br/cursos/ensino-livre-vepinho/', '_blank');
  };

  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="max-w-6xl mx-auto">

        <header className="mb-16">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#1a1a1a] leading-tight">
            Motus.IA: Infraestrutura Ética de Capital Humano
          </h1>

          <p className="mt-4 text-xl md:text-2xl text-[#1a1a1a] max-w-4xl mx-auto">
            Transformamos a responsabilidade social em investimento estratégico,
            mitigando o Abismo Cognitivo e formando o pipeline de talentos para 2030.
          </p>
        </header>

        <hr className="my-12 border-white/30" />

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-10">
            Valor para Cada Parceiro
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border-t-4 border-green-500">
              <h3 className="text-xl font-bold text-green-700 mb-3">
                🏢 Corporações (B2B-ESG)
              </h3>
              <ul className="text-[#1a1a1a] list-disc list-inside space-y-2 text-left">
                <li>Inteligência Preditiva de Capital Humano (HCA): KPIs auditáveis de Workforce Readiness.</li>
                <li>Risco Reputacional Zero: Conformidade proativa com LGPD e UNESCO.</li>
                <li>ROI Social (SROI): Transforme filantropia em ativo de investimento mensurável.</li>
              </ul>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border-t-4 border-blue-500">
              <h3 className="text-xl font-bold text-blue-700 mb-3">
                📚 Escolas & ONGs (Parceiros)
              </h3>
              <ul className="text-[#1a1a1a] list-disc list-inside space-y-2 text-left">
                <li>Tecnologia Gratuita: Acesso completo à IA de Nivelamento (Clustering).</li>
                <li>UDL para Neurodiversidade: Atendimento adaptativo (TDAH, Autismo) sem sobrecarga docente.</li>
                <li>Dados para Financiamento Contínuo: Geração de métricas de impacto para captar investimentos.</li>
              </ul>
            </div>

            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-lg border-t-4 border-orange-500">
              <h3 className="text-xl font-bold text-orange-700 mb-3">
                🧠 Alunos e Talentos em Formação
              </h3>
              <ul className="text-[#1a1a1a] list-disc list-inside space-y-2 text-left">
                <li>Reskilling Preditivo: Foco no Pensamento Analítico e Lógica Computacional.</li>
                <li>Aprendizagem Adaptativa: Trilhas de conhecimento ajustadas individualmente pela IA.</li>
                <li>Engajamento Gamificado: Mecânicas de recompensa que transformam o estudo em dopamina.</li>
              </ul>
            </div>
          </div>
        </section>

        <hr className="my-12 border-white/30" />

        <section className="bg-white/90 backdrop-blur-sm p-10 rounded-xl shadow-lg max-w-4xl mx-auto border border-white/20">
          <h2 className="text-3xl font-bold text-[#1a1a1a] mb-4">
            🚀 Nosso Laboratório Vivo: O Case Vepinho
          </h2>
          <p className="text-lg text-[#1a1a1a] leading-relaxed mb-6">
            A solução Motus.IA não é teoria. Ela foi validada na prática
            na ONG Vepinho (Pedreira, SP). Nossa metodologia reverteu o ciclo de evasão e demonstrou
            potencial de redução de até 70% na disparidade de aprendizado, provando
            que a IA de nivelamento funciona onde os métodos tradicionais falham.
          </p>
          <button
            onClick={handleVepinhoClick}
            className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 mx-auto"
          >
            <span>🌱</span>
            Conheça o Projeto Vepinho
            <span>→</span>
          </button>
        </section>

      </div>
    </div>
  );
};

export default HomePage;