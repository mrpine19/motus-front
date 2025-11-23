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
    Básico: "bg-green-100 text-green-800 border-green-300",
    Médio: "bg-yellow-100 text-yellow-800 border-yellow-300",
    Avançado: "bg-red-100 text-red-800 border-red-300",
    Desconhecido: "bg-gray-100 text-gray-800 border-gray-300",
  };

  const handleIniciarDesafio = (id: number) => {
    navigate(`/trilha/${id}`);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center text-center h-64">
        <LoaderCircle className="animate-spin text-cyan-600 mb-4" size={48} />
        <p className="text-[#1a1a1a]">Carregando missões disponíveis...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center gap-3 mb-8">
        <Target className="text-cyan-600" size={32} />
        <h1 className="text-3xl font-bold text-[#1a1a1a]">Escolha Sua Missão</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aulas.map((aula) => (
          <div
            key={aula.id}
            className="bg-white/80 backdrop-blur-sm border border-gray-300 rounded-xl p-6 flex flex-col justify-between hover:border-cyan-500 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div>
              <div className="flex justify-between items-start mb-3">
                <h2 className="text-xl font-bold text-[#1a1a1a]">
                  {aula.titulo}
                </h2>
                <span
                  className={`px-2.5 py-1 text-xs font-bold rounded-full border whitespace-nowrap ${
                    nivelCores[aula.nivelDificuldade] || "bg-gray-100 text-gray-800 border-gray-300"
                  }`}
                >
                  {aula.nivelDificuldade}
                </span>
              </div>
              <div className="text-sm text-[#1a1a1a] mb-4 space-y-2">
                <p className="flex items-center gap-2">
                  <BookOpen size={16} className="text-cyan-600" /> 
                  {aula.areaCompetencia}
                </p>
                <p className="flex items-center gap-2">
                  <User size={16} className="text-cyan-600" /> 
                  Criado por: {aula.nomeVoluntario}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleIniciarDesafio(aula.id)}
              className="w-full mt-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-cyan-500"
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