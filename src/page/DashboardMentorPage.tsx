import { useEffect, useState } from "react";
import { Users, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

// --- Constante de Simulação ---

// --- Interfaces de Dados (DTOs) ---
interface DificuldadeAreaDto {
  areaCompetencia: string;
  taxaErro: number;
}

interface AlunoDashboardDto {
  id: number;
  nome: string;
  nivelAtual: string;
  taxaAcertoUltimos10: number;
  teveIntervencaoManual: boolean;
}

interface TurmaDashboardDto {
  id: number;
  nome: string;
  alunos: AlunoDashboardDto[];
  maioresDificuldades: DificuldadeAreaDto[];
}

// --- Dados Mockados para Desenvolvimento ---
const MOCK_DASHBOARD_DATA: TurmaDashboardDto[] = [
  {
    id: 1,
    nome: "Turma A - Lógica de Programação",
    maioresDificuldades: [
      { areaCompetencia: "LOGICA", taxaErro: 0.45 },
      { areaCompetencia: "RESOLUCAO", taxaErro: 0.25 },
    ],
    alunos: [
      {
        id: 10,
        nome: "Carlos Andrade",
        nivelAtual: "Nível Básico",
        taxaAcertoUltimos10: 0.8,
        teveIntervencaoManual: false,
      },
      {
        id: 11,
        nome: "Beatriz Martins",
        nivelAtual: "Nível Intermediário",
        taxaAcertoUltimos10: 0.9,
        teveIntervencaoManual: false,
      },
      {
        id: 12,
        nome: "Daniela Rocha",
        nivelAtual: "Nível Básico",
        taxaAcertoUltimos10: 0.4,
        teveIntervencaoManual: true,
      },
      {
        id: 13,
        nome: "Felipe Barros",
        nivelAtual: "Nível Avançado",
        taxaAcertoUltimos10: 1.0,
        teveIntervencaoManual: false,
      },
    ],
  },
  {
    id: 2,
    nome: "Turma B - Interpretação de Texto",
    maioresDificuldades: [
      { areaCompetencia: "PORTUGUES", taxaErro: 0.6 },
      { areaCompetencia: "LOGICA", taxaErro: 0.15 },
    ],
    alunos: [
      {
        id: 20,
        nome: "Juliana Lima",
        nivelAtual: "Nível Intermediário",
        taxaAcertoUltimos10: 0.7,
        teveIntervencaoManual: false,
      },
      {
        id: 21,
        nome: "Marcos Vinicius",
        nivelAtual: "Nível Básico",
        taxaAcertoUltimos10: 0.3,
        teveIntervencaoManual: false,
      },
      {
        id: 22,
        nome: "Patricia Alves",
        nivelAtual: "Nível Básico",
        taxaAcertoUltimos10: 0.5,
        teveIntervencaoManual: true,
      },
    ],
  },
];

/**
 * Componente de Dashboard para o Voluntário/Mentor acompanhar o desempenho das turmas.
 */
export function DashboardMentorPage() {
  const [turmas, setTurmas] = useState<TurmaDashboardDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulação de chamada à API com delay
        await new Promise((resolve) => setTimeout(resolve, 1200));

        // --- LÓGICA DE FETCH REAL (COMENTADA) ---
        /*
        const response = await fetch(`http://localhost:8080/dashboard/voluntario/${MOCK_VOLUNTARIO_ID}`);
        if (!response.ok) {
          throw new Error('Falha ao buscar dados do dashboard.');
        }
        const data: TurmaDashboardDto[] = await response.json();
        setTurmas(data);
        */

        // Usando dados mockados
        setTurmas(MOCK_DASHBOARD_DATA);
      } catch (err) {
        setError("Não foi possível carregar os dados do painel.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getCorTaxaErro = (taxa: number) => {
    if (taxa > 0.5) return "bg-red-500/20 text-red-400 border-red-500/30";
    if (taxa > 0.3)
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
    return "bg-green-500/20 text-green-400 border-green-500/30";
  };

  if (loading) {
    return (
      <div className="text-center text-gray-400">
        Carregando dados do painel...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-400">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center gap-4 mb-4">
        <Users className="text-cyan-400" size={32} />
        <h1 className="text-3xl font-bold text-gray-100">Painel de Mentoria</h1>
      </div>
      <p className="text-gray-400 mb-8">
        Acompanhamento de Desempenho por Turma
      </p>

      <div className="space-y-8">
        {turmas.map((turma) => (
          <div
            key={turma.id}
            className="bg-gray-800/50 border border-gray-700 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-indigo-400 mb-3">
                {turma.nome}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-400">
                  Maiores Dificuldades:
                </span>
                {turma.maioresDificuldades.map((d) => (
                  <span
                    key={d.areaCompetencia}
                    className={`px-2.5 py-1 text-xs font-bold rounded-full border ${getCorTaxaErro(
                      d.taxaErro
                    )}`}
                  >
                    {d.areaCompetencia}: {(d.taxaErro * 100).toFixed(0)}% de
                    Erro
                  </span>
                ))}
              </div>
            </div>

            {/* Tabela de Alunos */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Aluno
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Nível Atual
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Desempenho Recente
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800/50 divide-y divide-gray-700/50">
                  {turma.alunos.map((aluno) => {
                    const emRisco = aluno.taxaAcertoUltimos10 < 0.5;
                    const corProgresso = emRisco ? "bg-red-500" : "bg-cyan-500";

                    return (
                      <tr
                        key={aluno.id}
                        className={
                          emRisco ? "bg-red-900/20" : "hover:bg-gray-700/30"
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`font-medium ${
                              emRisco ? "text-red-300" : "text-gray-100"
                            }`}
                          >
                            {aluno.nome}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-500/20 text-indigo-300">
                            {aluno.nivelAtual}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-32 bg-gray-700 rounded-full h-2.5">
                              <div
                                className={`${corProgresso} h-2.5 rounded-full transition-all duration-500`}
                                style={{
                                  width: `${aluno.taxaAcertoUltimos10 * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span
                              className={`text-sm font-bold ${
                                emRisco ? "text-red-400" : "text-cyan-400"
                              }`}
                            >
                              {(aluno.taxaAcertoUltimos10 * 100).toFixed(0)}%
                            </span>
                            {emRisco ? (
                              <TrendingDown
                                className="text-red-500"
                                size={18}
                              />
                            ) : (
                              <TrendingUp
                                className="text-green-500"
                                size={18}
                              />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {aluno.teveIntervencaoManual && (
                            <div className="relative group flex items-center">
                              <AlertTriangle
                                className="text-yellow-400"
                                size={20}
                              />
                              <div className="absolute bottom-full mb-2 hidden group-hover:block w-max bg-gray-900 text-white text-xs rounded py-1 px-2 border border-gray-600 shadow-lg">
                                Ajuste Manual de Dificuldade Realizado
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardMentorPage;
