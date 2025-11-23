import { useState, useEffect, useRef } from "react";
import {
  Brain,
  CheckCircle,
  Clock,
  Send,
  XCircle,
  BookText,
  HelpCircle,
  LoaderCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const MOCK_ALUNO_ID = 4;

interface DesafioData {
  id: number;
  titulo: string;
  descricao: string;
  urlImagem?: string;
  areaCompetencia: string;
  nivelDificuldade: string;
}

interface RespostaDTO {
  alunoId: number;
  desafioId: number;
  respostaSubmetida: string;
  tempoGastoSegundos: number;
}

interface FeedbackDTO {
  acertou: boolean;
  feedback: string;
  pontosGanhos: number;
  novaStreak: number;
}

const MOCK_FEEDBACK_ACERTO: FeedbackDTO = {
  acertou: true,
  feedback:
    "Parabéns! Você demonstrou um excelente raciocínio lógico. A chave era usar a diferença entre os potes.",
  pontosGanhos: 150,
  novaStreak: 3,
};

const MOCK_FEEDBACK_ERRO: FeedbackDTO = {
  acertou: false,
  feedback:
    "Quase lá! Lembre-se que você pode encher, esvaziar e transferir a água entre os potes para chegar à solução.",
  pontosGanhos: 20,
  novaStreak: 0,
};

export function DesafioPage() {
  const [desafio, setDesafio] = useState<DesafioData | null>(null);
  const [resposta, setResposta] = useState("");
  const [tempoGasto, setTempoGasto] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { idDesafio } = useParams<{ idDesafio: string }>();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async (id: number) => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/desafios/${id}`);
        if (!response.ok) {
          throw new Error("Desafio não encontrado.");
        }
        const data: DesafioData = await response.json();
        setDesafio(data);
      } catch (error) {
        console.error("Erro ao buscar desafio:", error);
        navigate("/aulas");
      } finally {
        setLoading(false);
      }
    };

    if (idDesafio) {
      fetchData(parseInt(idDesafio, 10));
    }

    if (!submitted) {
      timerRef.current = setInterval(() => {
        setTempoGasto((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [idDesafio, submitted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const respostaDTO: RespostaDTO = {
      alunoId: MOCK_ALUNO_ID,
      desafioId: desafio!.id,
      respostaSubmetida: resposta,
      tempoGastoSegundos: tempoGasto,
    };

    try {
      const response = (await Promise.race([
        fetch("http://localhost:8080/pontuacao/submeter", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(respostaDTO),
        }),
        new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout")), 5000)
        ), // Timeout de 5s
      ])) as Response;

      if (!response.ok) throw new Error("Falha na API");

      const data: FeedbackDTO = await response.json();
      setFeedback(data);
    } catch (error) {
      console.warn(
        "API indisponível ou falhou. Usando mock de feedback.",
        error
      );
      setFeedback(
        Math.random() > 0.5 ? MOCK_FEEDBACK_ACERTO : MOCK_FEEDBACK_ERRO
      );
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleNextChallenge = () => {
    navigate("/aulas");
  };

  if (loading && !feedback) {
    return (
      <div className="bg-[#38b7ff] p-8">
        <div className="flex flex-col items-center justify-center text-center h-64">
          <LoaderCircle className="animate-spin text-cyan-500 mb-4" size={48} />
          <p className="text-gray-800">Carregando desafio...</p>
        </div>
      </div>
    );
  }

  if (submitted && feedback) {
    const isCorrect = feedback.acertou;
    return (
      <div className="bg-[#38b7ff] p-8">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <div
            className={`p-8 rounded-xl bg-white/50 border-2 ${
              isCorrect ? "border-teal-500" : "border-red-500"
            }`}
          >
            <div className="flex justify-center mb-4">
              {isCorrect ? (
                <CheckCircle size={48} className="text-teal-500" />
              ) : (
                <XCircle size={48} className="text-red-500" />
              )}
            </div>
            <h2
              className={`text-2xl font-bold ${
                isCorrect ? "text-teal-600" : "text-red-600"
              }`}
            >
              {isCorrect ? "Resposta Correta!" : "Opa, não foi desta vez!"}
            </h2>
            <p className="text-gray-800 mt-2 mb-6">{feedback.feedback}</p>
            <div className="flex justify-center gap-6 text-lg">
              <p className="font-semibold text-gray-800">
                Pontos:{" "}
                <span className="text-cyan-600">+{feedback.pontosGanhos}</span>
              </p>
              <p className="font-semibold text-gray-800">
                Streak:{" "}
                <span className="text-indigo-600">{feedback.novaStreak}🔥</span>
              </p>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/aulas")}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-4 rounded-lg transition-colors"
              >
                Ver Outras Missões
              </button>
              <button
                onClick={handleNextChallenge}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                Próximo Desafio
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!desafio) {
    return (
    <div className="bg-[#38b7ff] p-8">
        <div>Desafio não encontrado.</div>
    </div>
  );
  }

  return (
    <div className="bg-[#38b7ff] p-8">
    <div className="container mx-auto px-4 max-w-3xl">
      <div className="relative bg-white/50 border border-gray-300 rounded-lg p-6 mb-6">
        <div className="absolute top-4 right-4 flex items-center gap-2 text-cyan-600 font-mono text-lg bg-white/50 px-3 py-1 rounded-full">
          <Clock size={20} />
          <span>{formatTime(tempoGasto)}</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <Brain className="text-indigo-500" size={28} />
          <h1 className="text-3xl font-bold text-gray-800">{desafio.titulo}</h1>
        </div>
        <span className="text-xs font-semibold bg-indigo-200 text-indigo-800 px-2 py-1 rounded-full">
          {desafio.areaCompetencia} - {desafio.nivelDificuldade}
        </span>
      </div>

      <div className="bg-white/80 border border-gray-300 rounded-lg p-6 mb-8 space-y-4">
        <h2 className="text-xl font-bold text-cyan-600 flex items-center gap-2">
          <BookText size={22} /> Material de Apoio
        </h2>
        {desafio.urlImagem && (
          <img
            src={desafio.urlImagem}
            alt="Visual do desafio"
            className="rounded-lg w-full h-64 object-cover my-4"
          />
        )}
        <p className="text-gray-800 leading-relaxed text-lg">
          {/* O campo 'descricao' agora serve como material de apoio e pergunta */}
          Use o espaço abaixo para responder ao desafio proposto no título.
        </p>
      </div>
      
      <div className="bg-white/50 border border-teal-500/30 rounded-lg p-6">
        <h2 className="text-xl font-bold text-teal-600 flex items-center gap-2 mb-4">
          <HelpCircle size={22} /> Seu Desafio
        </h2>
        <p className="text-gray-800 leading-relaxed text-lg mb-6">
          {desafio.descricao}
        </p>
        <div className="bg-white/50 p-6 rounded-b-lg">
          <textarea
            value={resposta}
            onChange={(e) => setResposta(e.target.value)}
            placeholder="Digite sua solução aqui..."
            className="w-full h-40 p-4 bg-gray-200 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            disabled={submitted}
          />
          <button
            onClick={handleSubmit}
            disabled={!resposta.trim() || submitted}
            className="mt-4 w-full flex items-center justify-center gap-2 bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-colors hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-white"
          >
            {loading && submitted ? (
              <>
                <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                <span>Enviando...</span>
              </>
            ) : (
              <>
                <Send size={18} />
                <span>Submeter Resposta</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default DesafioPage;
