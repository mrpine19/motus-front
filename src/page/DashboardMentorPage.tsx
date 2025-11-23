import { useEffect, useState } from "react";
import { Users, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

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

const MOCK_VOLUNTARIO_ID = 1;

export function DashboardMentorPage() {
  const [turmas, setTurmas] = useState<TurmaDashboardDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:8080/dashboard/voluntario/${MOCK_VOLUNTARIO_ID}`
        );
        if (!response.ok) {
          throw new Error("Falha ao buscar dados do dashboard.");
        }
        const data: TurmaDashboardDto[] = await response.json();
        setTurmas(data);
      } catch (err: unknown) {
        setError("Não foi possível carregar os dados do painel.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

const getCorTaxaErro = (taxa: number) => {
    if (taxa > 0.5) return "bg-red-200 text-red-800 border-red-300";
    if (taxa > 0.3)
      return "bg-yellow-200 text-yellow-800 border-yellow-300";
    return "bg-green-200 text-green-800 border-green-300";
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600">
        Carregando dados do painel...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center gap-4 mb-4">
        <Users className="text-cyan-500" size={32} />
        <h1 className="text-3xl font-bold text-gray-800">Painel de Mentoria</h1>
      </div>
      <p className="text-gray-600 mb-8">
        Acompanhamento de Desempenho por Turma
      </p>

      <div className="space-y-8">
        {turmas.map((turma) => (
          <div
            key={turma.id}
            className="bg-white/50 border border-gray-300 rounded-lg shadow-lg overflow-hidden"
          >
            <div className="p-6 border-b border-gray-300">
              <h2 className="text-xl font-bold text-indigo-600 mb-3">
                {turma.nome}
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-600">
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

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-200">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                    >
                      Aluno
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                    >
                      Nível Atual
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                    >
                      Desempenho Recente
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/50 divide-y divide-gray-300/50">
                  {turma.alunos.map((aluno) => {
                    const emRisco = aluno.taxaAcertoUltimos10 < 0.5;
                    const corProgresso = emRisco ? "bg-red-500" : "bg-cyan-500";

                    return (
                      <tr
                        key={aluno.id}
                        className={
                          emRisco ? "bg-red-200/30" : "hover:bg-gray-200/30"
                        }
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div
                            className={`font-medium ${
                              emRisco ? "text-red-700" : "text-gray-800"
                            }`}
                          >
                            {aluno.nome}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-200 text-indigo-800">
                            {aluno.nivelAtual}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-32 bg-gray-300 rounded-full h-2.5">
                              <div
                                className={`${corProgresso} h-2.5 rounded-full transition-all duration-500`}
                                style={{
                                  width: `${aluno.taxaAcertoUltimos10 * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span
                              className={`text-sm font-bold ${
                                emRisco ? "text-red-600" : "text-cyan-600"
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
                                className="text-yellow-500"
                                size={20}
                              />
                              <div className="absolute bottom-full mb-2 hidden group-hover:block w-max bg-white text-gray-800 text-xs rounded py-1 px-2 border border-gray-300 shadow-lg">
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
