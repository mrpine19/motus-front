import { useEffect, useState } from "react";
import { Crown, Medal, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MOCK_ALUNO_ID = 4;

interface RankingItem {
  posicao: number;
  nomeAluno: string;
  alunoId: number;
  pontuacaoTotal: number;
  tempoTotalGasto: number;
}

export function RankingPage() {
  const [ranking, setRanking] = useState<RankingItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:8080/ranking/turma/1`);
      if (!response.ok) {
        throw new Error("Falha ao buscar dados da API");
      }
      const data: RankingItem[] = await response.json();
      setRanking(data);
    } catch (err: unknown) {
      setError(
        "Não foi possível carregar o ranking. Verifique sua conexão e tente novamente."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getPodium = () => ranking.slice(0, 3);
  const getRestOfList = () => ranking.slice(3);

  const getInitials = (name: string) => {
    const names = name.split(" ");
    if (names.length > 1) {
      return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const podiumPlacements = [
    {
      rank: 2,
      color: "border-gray-400",
      shadow: "shadow-gray-500/20",
      iconColor: "text-gray-500",
    },
    {
      rank: 1,
      color: "border-yellow-500",
      shadow: "shadow-yellow-600/30",
      iconColor: "text-yellow-500",
    },
    {
      rank: 3,
      color: "border-orange-500",
      shadow: "shadow-orange-600/20",
      iconColor: "text-orange-500",
    },
  ];

  const podiumOrder = [1, 0, 2];

  if (loading) {
    return (
      <div className="container mx-auto px-4 text-center animate-pulse">
        <div className="h-10 bg-white/50 rounded w-1/3 mx-auto mb-4"></div>
        <div className="h-6 bg-white/50 rounded w-1/4 mx-auto mb-12"></div>
        <div className="flex justify-center items-end gap-4 mb-12">
          <div className="w-40 h-48 bg-white/50 rounded-xl"></div>
          <div className="w-48 h-56 bg-white/50 rounded-xl"></div>
          <div className="w-40 h-48 bg-white/50 rounded-xl"></div>
        </div>
        <div className="space-y-3 max-w-3xl mx-auto">
          <div className="h-16 bg-white/50 rounded-xl"></div>
          <div className="h-16 bg-white/50 rounded-xl"></div>
          <div className="h-16 bg-white/50 rounded-xl"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 text-center text-[#1a1a1a]">
        <h1 className="text-2xl font-bold mb-4">Ops! Algo deu errado.</h1>
        <p className="mb-6">{error}</p>
        <button
          onClick={fetchData}
          className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 text-center">
      <div className="flex justify-center items-center gap-3 mb-2">
        <Trophy className="text-yellow-500" size={36} />
        <h1 className="text-4xl font-bold text-[#1a1a1a]">Ranking da Semana</h1>
      </div>
      <p className="text-[#1a1a1a] mb-10">Turma de Teste - ID 1</p>

      <div className="flex justify-center items-end gap-4 md:gap-8 mb-12">
        {podiumOrder.map((orderIndex) => {
          const podiumInfo = podiumPlacements[orderIndex];
          const player = getPodium().find((p) => p.posicao === podiumInfo.rank);

          if (!player)
            return <div key={podiumInfo.rank} className="w-32 md:w-40"></div>;

          const isFirstPlace = player.posicao === 1;

          return (
            <div
              key={player.alunoId}
              className={`relative flex flex-col items-center bg-white/90 backdrop-blur-sm p-4 rounded-xl border-2 transition-all duration-300
                ${podiumInfo.color} ${podiumInfo.shadow} shadow-xl
                ${
                  isFirstPlace
                    ? "w-40 md:w-48 h-56 transform scale-110 z-10"
                    : "w-32 md:w-40 h-48"
                }`}
            >
              {isFirstPlace && (
                <Crown className="absolute -top-5 text-yellow-500" size={36} />
              )}

              <div className="relative w-20 h-20 mb-3">
                <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-2xl font-bold text-[#1a1a1a] border-2 border-gray-300">
                  {getInitials(player.nomeAluno)}
                </div>
                <div
                  className={`absolute -bottom-2 -right-2 p-1.5 rounded-full bg-white border border-gray-300 ${podiumInfo.iconColor}`}
                >
                  <Medal size={20} />
                </div>
              </div>

              <p className="font-bold text-[#1a1a1a] truncate w-full">
                {player.nomeAluno}
              </p>
              <p className="text-sm text-cyan-600 font-semibold">
                {player.pontuacaoTotal} pts
              </p>
            </div>
          );
        })}
      </div>

      <div className="max-w-3xl mx-auto space-y-3">
        {getRestOfList().map((item) => {
          const isCurrentUser = item.alunoId === MOCK_ALUNO_ID;
          return (
            <div
              key={item.alunoId}
              className={`flex items-center bg-white/90 backdrop-blur-sm p-4 rounded-xl border border-gray-300 transition-all duration-300
                ${
                  isCurrentUser
                    ? "border-cyan-500 ring-2 ring-cyan-500/50 bg-cyan-50/50"
                    : "hover:bg-white/70 hover:shadow-md"
                }`}
            >
              <div className="w-12 text-xl font-bold text-[#1a1a1a]">
                {item.posicao}º
              </div>

              <div className="flex-1 flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex-shrink-0 flex items-center justify-center font-bold text-[#1a1a1a] border border-gray-300">
                  {getInitials(item.nomeAluno)}
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-[#1a1a1a]">
                    {item.nomeAluno}
                  </p>
                  <p className="text-xs text-[#1a1a1a]/70">ID: {item.alunoId}</p>
                </div>
              </div>

              {isCurrentUser && (
                <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-bold mr-4 px-2.5 py-1 rounded-full">
                  VOCÊ
                </span>
              )}

              <div className="w-28 text-right font-bold text-cyan-600 text-lg">
                {item.pontuacaoTotal} pts
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigate("/aulas")}
        className="mt-8 mb-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
      >
        Escolher Próxima Missão
      </button>
    </div>
  );
}

export default RankingPage;