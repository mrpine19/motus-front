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
      color: "border-gray-300",
      shadow: "shadow-gray-400/20",
      iconColor: "text-gray-300",
    },
    {
      rank: 1,
      color: "border-yellow-400",
      shadow: "shadow-yellow-500/30",
      iconColor: "text-yellow-400",
    },
    {
      rank: 3,
      color: "border-orange-400",
      shadow: "shadow-orange-500/20",
      iconColor: "text-orange-400",
    },
  ];

  const podiumOrder = [1, 0, 2]; // 2º, 1º, 3º

  if (loading) {
    return (
      <div className="container mx-auto px-4 text-center animate-pulse">
        <div className="h-10 bg-gray-700 rounded w-1/3 mx-auto mb-4"></div>
        <div className="h-6 bg-gray-700 rounded w-1/4 mx-auto mb-12"></div>
        <div className="flex justify-center items-end gap-4 mb-12">
          <div className="w-40 h-48 bg-gray-800 rounded-lg"></div>
          <div className="w-48 h-56 bg-gray-800 rounded-lg"></div>
          <div className="w-40 h-48 bg-gray-800 rounded-lg"></div>
        </div>
        <div className="space-y-3 max-w-3xl mx-auto">
          <div className="h-16 bg-gray-800 rounded-lg"></div>
          <div className="h-16 bg-gray-800 rounded-lg"></div>
          <div className="h-16 bg-gray-800 rounded-lg"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 text-center text-gray-300">
        <h1 className="text-2xl font-bold mb-4">Ops! Algo deu errado.</h1>
        <p className="mb-6">{error}</p>
        <button
          onClick={fetchData}
          className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 text-center">
      <div className="flex justify-center items-center gap-3 mb-2">
        <Trophy className="text-yellow-400" size={36} />
        <h1 className="text-4xl font-bold text-cyan-400">Ranking da Semana</h1>
      </div>
      <p className="text-gray-400 mb-10">Turma de Teste - ID 1</p>

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
              className={`relative flex flex-col items-center bg-gray-800/70 p-4 rounded-lg border-2 transition-all duration-300
                ${podiumInfo.color} ${podiumInfo.shadow} shadow-lg
                ${
                  isFirstPlace
                    ? "w-40 md:w-48 h-56 transform scale-110 z-10"
                    : "w-32 md:w-40 h-48"
                }`}
            >
              {isFirstPlace && (
                <Crown className="absolute -top-5 text-yellow-400" size={36} />
              )}

              <div className="relative w-20 h-20 mb-3">
                <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center text-2xl font-bold text-gray-300 border-2 border-gray-600">
                  {getInitials(player.nomeAluno)}
                </div>
                <div
                  className={`absolute -bottom-2 -right-2 p-1.5 rounded-full bg-gray-900 ${podiumInfo.iconColor}`}
                >
                  <Medal size={20} />
                </div>
              </div>

              <p className="font-bold text-gray-100 truncate w-full">
                {player.nomeAluno}
              </p>
              <p className="text-sm text-indigo-400 font-semibold">
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
              className={`flex items-center bg-gray-800/50 p-4 rounded-lg border border-gray-700 transition-all
                ${
                  isCurrentUser
                    ? "border-cyan-400 ring-2 ring-cyan-400/50 bg-indigo-900/30"
                    : "hover:bg-gray-700/50"
                }`}
            >
              <div className="w-12 text-xl font-bold text-gray-400">
                {item.posicao}º
              </div>

              <div className="flex-1 flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-gray-700 flex-shrink-0 flex items-center justify-center font-bold text-gray-300">
                  {getInitials(item.nomeAluno)}
                </div>
                <div className="flex-grow">
                  <p className="font-semibold text-gray-100">
                    {item.nomeAluno}
                  </p>
                  <p className="text-xs text-gray-500">ID: {item.alunoId}</p>
                </div>
              </div>

              {isCurrentUser && (
                <span className="bg-cyan-500 text-white text-xs font-bold mr-4 px-2.5 py-1 rounded-full">
                  VOCÊ
                </span>
              )}

              <div className="w-28 text-right font-bold text-cyan-400 text-lg">
                {item.pontuacaoTotal} pts
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigate("/aulas")}
        className="mt-8 mb-12 bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-6 rounded-lg transition-colors"
      >
        Escolher Próxima Missão
      </button>
    </div>
  );
}

export default RankingPage;
