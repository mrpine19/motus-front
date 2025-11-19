import { useEffect, useState } from "react";
import {
  TrendingUp,
  Download,
  Users,
  Brain,
  Target,
  Clock,
} from "lucide-react";

interface EsgDashboardDto {
  roiSocial: number;
  totalAlunosImpactados: number;
  percentualReducaoSkillsGap: number;
  horasMediasUsoPlataforma: number;
  taxaRetencaoAlunos: number;
  odsAlinhados: string;
}

const MOCK_ESG_DATA: EsgDashboardDto = {
  roiSocial: 45.5,
  totalAlunosImpactados: 150,
  percentualReducaoSkillsGap: 35.5,
  horasMediasUsoPlataforma: 12.5,
  taxaRetencaoAlunos: 92.0,
  odsAlinhados: "ODS 4, ODS 8, ODS 10",
};

export function DashboardEsgPage() {
  const [data, setData] = useState<EsgDashboardDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulação de chamada à API com delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // --- LÓGICA DE FETCH REAL (COMENTADA) ---
        /*
        const response = await fetch(`http://localhost:8080/dashboard/esg`);
        if (!response.ok) {
          throw new Error('Falha ao buscar dados do dashboard ESG.');
        }
        const apiData: EsgDashboardDto = await response.json();
        setData(apiData);
        */

        // Usando dados mockados
        setData(MOCK_ESG_DATA);
      } catch (err) {
        setError("Não foi possível carregar os dados do painel de impacto.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleExport = () => {
    alert("Relatório PDF de auditoria baixado com sucesso!");
  };

  if (loading) {
    return (
      <div className="text-center text-gray-400 animate-pulse">
        Carregando relatório de impacto...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center text-red-400">
        {error || "Dados não encontrados."}
      </div>
    );
  }

  const KpiCard = ({
    icon: Icon,
    title,
    value,
    color,
    unit = "",
  }: {
    icon: React.ElementType;
    title: string;
    value: string | number;
    color: string;
    unit?: string;
  }) => (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400">{title}</h3>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
      <p className={`text-4xl font-bold ${color}`}>
        {value}
        <span className="text-lg">{unit}</span>
      </p>
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-100">
            Relatório de Impacto ESG
          </h1>
          <p className="text-gray-400">
            Dados consolidados do programa de capacitação.
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 border border-cyan-500 text-cyan-500 rounded-lg hover:bg-cyan-500/10 transition-colors text-sm font-semibold"
        >
          <Download size={16} />
          Exportar Relatório de Auditoria
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <KpiCard
          icon={TrendingUp}
          title="ROI Social (Multiplicador)"
          value={`x${data.roiSocial.toFixed(1)}`}
          color="text-green-400"
        />
        <KpiCard
          icon={Brain}
          title="Redução do Skills Gap"
          value={data.percentualReducaoSkillsGap.toFixed(1)}
          unit="%"
          color="text-cyan-400"
        />
        <KpiCard
          icon={Users}
          title="Retenção de Alunos"
          value={data.taxaRetencaoAlunos.toFixed(1)}
          unit="%"
          color="text-indigo-400"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h3 className="font-bold text-gray-200 mb-4 flex items-center gap-2">
            <Target size={20} /> ODS Alinhados
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.odsAlinhados.split(", ").map((ods) => (
              <span
                key={ods}
                className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1.5 rounded-full"
              >
                {ods}
              </span>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h3 className="font-bold text-gray-200 mb-4 flex items-center gap-2">
            <Clock size={20} /> Métricas de Engajamento
          </h3>
          <div className="flex justify-around text-center">
            <div>
              <p className="text-sm text-gray-400">Alunos Impactados</p>
              <p className="text-2xl font-bold text-cyan-400">
                {data.totalAlunosImpactados}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Horas/Aluno</p>
              <p className="text-2xl font-bold text-cyan-400">
                {data.horasMediasUsoPlataforma.toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h3 className="font-bold text-gray-200 mb-4">
            Evolução de Competências (Simulado)
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-300">
                Lógica de Programação
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                <div
                  className="bg-cyan-500 h-2.5 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">
                Resolução de Problemas
              </p>
              <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                <div
                  className="bg-cyan-500 h-2.5 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-300">Comunicação</p>
              <div className="w-full bg-gray-700 rounded-full h-2.5 mt-1">
                <div
                  className="bg-cyan-500 h-2.5 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
          <h3 className="font-bold text-gray-200 mb-4">
            Engajamento por Semana (Simulado)
          </h3>
          <div className="flex items-end justify-between h-32 space-x-2">
            <div
              className="w-full bg-gray-700 rounded-t-md"
              style={{ height: "40%" }}
            >
              <div className="bg-indigo-500 h-full rounded-t-md"></div>
            </div>
            <div
              className="w-full bg-gray-700 rounded-t-md"
              style={{ height: "60%" }}
            >
              <div className="bg-indigo-500 h-full rounded-t-md"></div>
            </div>
            <div
              className="w-full bg-gray-700 rounded-t-md"
              style={{ height: "75%" }}
            >
              <div className="bg-indigo-500 h-full rounded-t-md"></div>
            </div>
            <div
              className="w-full bg-gray-700 rounded-t-md"
              style={{ height: "90%" }}
            >
              <div className="bg-indigo-500 h-full rounded-t-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardEsgPage;
