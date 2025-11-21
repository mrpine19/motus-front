import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Target, BookOpen, LoaderCircle, User } from "lucide-react";

interface AulaAtiva {
  id: number;
  titulo: string;
  areaCompetencia: string;
  nivelDificuldade: string;
  nomeVoluntario: string;
}

export function AulasAtivasPage() {
  const [aulas, setAulas] = useState<AulaAtiva[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAulas = async () => {
      setLoading(true);

      try {
        const response = await fetch("http://localhost:8080/desafios");
        if (!response.ok) {
          throw new Error("Falha ao buscar desafios ativos.");
        }
        
        const data: { desafios: AulaAtiva[] }[] = await response.json();
        if (data && data.length > 0 && data[0].desafios) {
          setAulas(data[0].desafios);
        } else {
          setAulas([]);
        }
      } catch (error) {
        console.error("Erro ao buscar aulas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAulas();
  }, []);

  const nivelCores: Record<string, string> = {
    Básico: "bg-green-500/20 text-green-400 border-green-500/30",
    Médio: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Avançado: "bg-red-500/20 text-red-400 border-red-500/30",
    Desconhecido: "bg-gray-500/20 text-gray-400 border-gray-500/30",
  };

  const handleIniciarDesafio = (id: number) => {
    navigate(`/trilha/${id}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-64">
        <LoaderCircle className="animate-spin text-cyan-400 mb-4" size={48} />
        <p className="text-gray-400">Carregando missões disponíveis...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center gap-3 mb-8">
        <Target className="text-cyan-400" size={32} />
        <h1 className="text-3xl font-bold text-gray-100">Escolha Sua Missão</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aulas.map((aula) => (
          <div
            key={aula.id}
            className="bg-gray-800/80 border border-gray-700 rounded-lg p-6 flex flex-col justify-between hover:border-cyan-400/50 hover:shadow-lg transition-all"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-gray-100">
                  {aula.titulo}
                </h2>
                <span
                  className={`px-2.5 py-1 text-xs font-bold rounded-full border whitespace-nowrap ${
                    nivelCores[aula.nivelDificuldade] || "bg-gray-500/20"
                  }`}
                >
                  {aula.nivelDificuldade}
                </span>
              </div>
              <div className="text-sm text-gray-400 mb-4 space-y-2">
                <p className="flex items-center gap-2"><BookOpen size={16} /> {aula.areaCompetencia}</p>
                <p className="flex items-center gap-2"><User size={16} /> Criado por: {aula.nomeVoluntario}</p>
              </div>
            </div>
            <button
              onClick={() => handleIniciarDesafio(aula.id)}
              className="w-full mt-4 bg-teal-600 text-white font-bold py-2.5 px-4 rounded-lg transition-colors hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              Iniciar Desafio
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AulasAtivasPage;
