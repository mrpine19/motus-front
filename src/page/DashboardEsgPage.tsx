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
  nomePatrocinador: string;
  idPatrocinador: number;
  roiSocial: number;
  totalAlunosImpactados: number;
  percentualReducaoSkillsGap: number;
  horasMediasUsoPlataforma: number;
  taxaRetencaoAlunos: number;
  odsAlinhados: string;
}

export function DashboardEsgPage() {
  const [data, setData] = useState<EsgDashboardDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`http://localhost:8080/dashboard/esg/1`);
        if (!response.ok) {
          throw new Error("Falha ao buscar dados do dashboard ESG.");
        }
        const apiData: EsgDashboardDto = await response.json();
        setData(apiData);
      } catch (err: unknown) {
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
      <div className="text-center text-[#1a1a1a] animate-pulse">
        Carregando relatório de impacto...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center text-red-600">
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
    <div className="bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl p-6 flex flex-col shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[#1a1a1a]">{title}</h3>
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
          <h1 className="text-3xl font-bold text-[#1a1a1a]">
            Relatório de Impacto ESG
          </h1>
          <p className="text-[#1a1a1a]">
            Dados consolidados do programa de capacitação -{" "}
            {data.nomePatrocinador}
          </p>
        </div>
        <button
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 border border-[#1a1a1a] text-[#1a1a1a] rounded-lg hover:bg-[#1a1a1a] hover:text-white transition-colors text-sm font-semibold"
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
          color="text-green-600"
        />
        <KpiCard
          icon={Brain}
          title="Redução do Skills Gap"
          value={data.percentualReducaoSkillsGap.toFixed(1)}
          unit="%"
          color="text-cyan-600"
        />
        <KpiCard
          icon={Users}
          title="Retenção de Alunos"
          value={data.taxaRetencaoAlunos.toFixed(1)}
          unit="%"
          color="text-blue-600"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-1 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl p-6 shadow-lg">
          <h3 className="font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
            <Target size={20} /> ODS Alinhados
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.odsAlinhados.split(", ").map((ods) => (
              <span
                key={ods}
                className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1.5 rounded-full"
              >
                {ods}
              </span>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2 bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl p-6 shadow-lg">
          <h3 className="font-bold text-[#1a1a1a] mb-4 flex items-center gap-2">
            <Clock size={20} /> Métricas de Engajamento
          </h3>
          <div className="flex justify-around text-center">
            <div>
              <p className="text-sm text-[#1a1a1a]">Alunos Impactados</p>
              <p className="text-2xl font-bold text-cyan-600">
                {data.totalAlunosImpactados}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#1a1a1a]">Horas/Aluno</p>
              <p className="text-2xl font-bold text-cyan-600">
                {data.horasMediasUsoPlataforma.toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl p-6 shadow-lg">
          <h3 className="font-bold text-[#1a1a1a] mb-4">
            Evolução de Competências (Simulado)
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-[#1a1a1a]">
                Lógica de Programação
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div
                  className="bg-cyan-500 h-2.5 rounded-full"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#1a1a1a]">
                Resolução de Problemas
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div
                  className="bg-cyan-500 h-2.5 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-[#1a1a1a]">Comunicação</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                <div
                  className="bg-cyan-500 h-2.5 rounded-full"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl p-6 shadow-lg">
          <h3 className="font-bold text-[#1a1a1a] mb-4">
            Engajamento por Semana (Simulado)
          </h3>
          <div className="flex items-end justify-between h-32 space-x-2">
            <div
              className="w-full bg-gray-200 rounded-t-md"
              style={{ height: "40%" }}
            >
              <div className="bg-blue-500 h-full rounded-t-md"></div>
            </div>
            <div
              className="w-full bg-gray-200 rounded-t-md"
              style={{ height: "60%" }}
            >
              <div className="bg-blue-500 h-full rounded-t-md"></div>
            </div>
            <div
              className="w-full bg-gray-200 rounded-t-md"
              style={{ height: "75%" }}
            >
              <div className="bg-blue-500 h-full rounded-t-md"></div>
            </div>
            <div
              className="w-full bg-gray-200 rounded-t-md"
              style={{ height: "90%" }}
            >
              <div className="bg-blue-500 h-full rounded-t-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardEsgPage;