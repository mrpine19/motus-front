import { useState, useEffect, useRef } from 'react';
import { Brain, CheckCircle, Clock, Send, XCircle } from 'lucide-react';

// --- Constantes de Simulação ---
const MOCK_ALUNO_ID = 4;

// --- Interfaces de Dados (DTOs) ---
interface DesafioData {
  id: number;
  titulo: string;
  descricao: string;
  urlImagem?: string;
  areaCompetencia: 'LOGICA' | 'PORTUGUES' | 'RESOLUCAO';
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

// --- Dados Mockados para Desenvolvimento ---
const MOCK_DESAFIO: DesafioData = {
  id: 101,
  titulo: 'O Enigma dos Potes de Água',
  descricao: 'Você tem dois potes, um de 5 litros e outro de 3 litros, e uma fonte de água infinita. Como você consegue medir exatamente 4 litros de água?',
  urlImagem: 'https://images.unsplash.com/photo-1595431678408-b25cf373a469?q=80&w=1974&auto=format&fit=crop',
  areaCompetencia: 'LOGICA',
  nivelDificuldade: 'Médio',
};

const MOCK_FEEDBACK_ACERTO: FeedbackDTO = {
  acertou: true,
  feedback: 'Parabéns! Você demonstrou um excelente raciocínio lógico. A chave era usar a diferença entre os potes.',
  pontosGanhos: 150,
  novaStreak: 3,
};

const MOCK_FEEDBACK_ERRO: FeedbackDTO = {
  acertou: false,
  feedback: 'Quase lá! Lembre-se que você pode encher, esvaziar e transferir a água entre os potes para chegar à solução.',
  pontosGanhos: 20, // Pontos por esforço
  novaStreak: 0,
};

/**
 * Tela principal do Core Loop de Gamificação, onde o aluno resolve desafios.
 */
export function DesafioPage() {
  const [desafio, setDesafio] = useState<DesafioData>(MOCK_DESAFIO);
  const [resposta, setResposta] = useState('');
  const [tempoGasto, setTempoGasto] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Inicia o timer quando o componente monta ou quando um novo desafio é carregado
    if (!submitted) {
      timerRef.current = setInterval(() => {
        setTempoGasto((prev) => prev + 1);
      }, 1000);
    }

    // Limpa o timer na desmontagem ou na submissão
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [submitted, desafio]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (timerRef.current) clearInterval(timerRef.current);

    const respostaDTO: RespostaDTO = {
      alunoId: MOCK_ALUNO_ID,
      desafioId: desafio.id,
      respostaSubmetida: resposta,
      tempoGastoSegundos: tempoGasto,
    };

    try {
      // Simulação de chamada à API com fallback para mock
      const response = await Promise.race([
        fetch('http://localhost:8080/pontuacao/submeter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(respostaDTO),
        }),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000)) // Timeout de 5s
      ]) as Response;

      if (!response.ok) throw new Error('Falha na API');
      
      const data: FeedbackDTO = await response.json();
      setFeedback(data);

    } catch (error) {
      console.warn("API indisponível ou falhou. Usando mock de feedback.", error);
      // Fallback para dados mockados em caso de erro na API
      // Simula acerto ou erro aleatoriamente para teste
      setFeedback(Math.random() > 0.5 ? MOCK_FEEDBACK_ACERTO : MOCK_FEEDBACK_ERRO);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const handleNextChallenge = () => {
    // Reseta o estado para um novo desafio
    setDesafio({ ...MOCK_DESAFIO, id: MOCK_DESAFIO.id + Math.floor(Math.random() * 10) }); // Novo ID para forçar re-render
    setResposta('');
    setTempoGasto(0);
    setFeedback(null);
    setSubmitted(false);
  };

  if (submitted && feedback) {
    const isCorrect = feedback.acertou;
    return (
      <div className="container mx-auto px-4 max-w-3xl text-center">
        <div className={`p-8 rounded-xl bg-gray-800 border-2 ${isCorrect ? 'border-teal-500' : 'border-red-500'}`}>
          <div className="flex justify-center mb-4">
            {isCorrect ? <CheckCircle size={48} className="text-teal-400" /> : <XCircle size={48} className="text-red-400" />}
          </div>
          <h2 className={`text-2xl font-bold ${isCorrect ? 'text-teal-400' : 'text-red-400'}`}>
            {isCorrect ? 'Resposta Correta!' : 'Opa, não foi desta vez!'}
          </h2>
          <p className="text-gray-300 mt-2 mb-6">{feedback.feedback}</p>
          <div className="flex justify-center gap-6 text-lg">
            <p className="font-semibold">Pontos: <span className="text-cyan-400">+{feedback.pontosGanhos}</span></p>
            <p className="font-semibold">Streak: <span className="text-indigo-400">{feedback.novaStreak}🔥</span></p>
          </div>
          <button
            onClick={handleNextChallenge}
            className="mt-8 w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            Próximo Desafio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-3xl">
      {/* Header do Desafio com Timer */}
      <div className="relative bg-gray-800/50 border border-gray-700 rounded-t-lg p-6">
        <div className="absolute top-4 right-4 flex items-center gap-2 text-cyan-400 font-mono text-lg bg-gray-900/50 px-3 py-1 rounded-full">
          <Clock size={20} />
          <span>{formatTime(tempoGasto)}</span>
        </div>
        <div className="flex items-center gap-3 mb-4">
          <Brain className="text-indigo-400" size={28} />
          <h1 className="text-3xl font-bold text-gray-100">{desafio.titulo}</h1>
        </div>
        <span className="text-xs font-semibold bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-full">{desafio.areaCompetencia} - {desafio.nivelDificuldade}</span>
      </div>

      {/* Conteúdo do Desafio */}
      <div className="bg-gray-800 p-6 space-y-6">
        {desafio.urlImagem && (
          <img src={desafio.urlImagem} alt="Visual do desafio" className="rounded-lg w-full h-64 object-cover" />
        )}
        <p className="text-gray-300 leading-relaxed text-lg">{desafio.descricao}</p>
      </div>

      {/* Área de Resposta */}
      <div className="bg-gray-800/50 border-t border-gray-700 p-6 rounded-b-lg">
        <textarea
          value={resposta}
          onChange={(e) => setResposta(e.target.value)}
          placeholder="Digite sua solução aqui..."
          className="w-full h-40 p-4 bg-gray-900/50 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          disabled={loading}
        />
        <button
          onClick={handleSubmit}
          disabled={!resposta.trim() || loading}
          className="mt-4 w-full flex items-center justify-center gap-2 bg-teal-600 text-white font-bold py-3 px-4 rounded-lg transition-colors 
                     hover:bg-teal-500 
                     disabled:bg-gray-600 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          {loading ? (
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
  );
}

export default DesafioPage;