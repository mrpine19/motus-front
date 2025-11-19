import { useState } from "react";
import { Wand2, Save, LoaderCircle, Check } from "lucide-react";

// --- Constante de Simulação ---
//const MOCK_VOLUNTARIO_ID = 1;

interface SugestaoIA {
  nivel: "Básico" | "Médio" | "Avançado";
  titulo: string;
  descricao: string;
  respostaCorreta: string;
  feedback: string;
}

const MOCK_SUGESTOES: SugestaoIA[] = [
  {
    nivel: "Básico",
    titulo: "Soma Simples",
    descricao: "Qual é o resultado da soma de 5 + 7?",
    respostaCorreta: "12",
    feedback: "Correto! A soma é uma das operações fundamentais da matemática.",
  },
  {
    nivel: "Médio",
    titulo: "Sequência Lógica",
    descricao: "Qual o próximo número na sequência: 2, 4, 8, 16, ...?",
    respostaCorreta: "32",
    feedback:
      "Exato! Cada número é o dobro do anterior. Isso é uma progressão geométrica.",
  },
  {
    nivel: "Avançado",
    titulo: "Enigma do Rio",
    descricao:
      "Um fazendeiro precisa atravessar um rio com um lobo, uma ovelha e um repolho. O barco só leva ele e mais um item. Se deixar o lobo e a ovelha sozinhos, o lobo come a ovelha. Se deixar a ovelha e o repolho, a ovelha come o repolho. Como ele atravessa todos?",
    respostaCorreta:
      "Levar a ovelha, voltar, levar o lobo, voltar com a ovelha, levar o repolho, voltar e buscar a ovelha.",
    feedback:
      "Perfeito! Este é um clássico problema de lógica que exige pensar em etapas e movimentos de retorno.",
  },
];

type GeneratorStatus = "idle" | "loading" | "reviewing" | "published";

export function ContentGeneratorPage() {
  const [tema, setTema] = useState("");
  const [area, setArea] = useState("LOGICA");
  const [sugestoes, setSugestoes] = useState<SugestaoIA[]>([]);
  const [status, setStatus] = useState<GeneratorStatus>("idle");

  const handleGenerate = async () => {
    if (!tema.trim()) {
      alert("Por favor, insira um tema para a geração.");
      return;
    }
    setStatus("loading");

    await new Promise((resolve) => setTimeout(resolve, 4000));

    // --- LÓGICA DE FETCH REAL (COMENTADA) ---
    /*
    try {
      const response = await fetch('/api/gerador-conteudo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tema, area, voluntarioId: MOCK_VOLUNTARIO_ID })
      });

      if (!response.ok) {
        throw new Error('Falha ao gerar conteúdo.');
      }

      const data: SugestaoIA[] = await response.json();
      setSugestoes(data);
    } catch (error) {
      console.error(error);
      setStatus('idle'); // Volta ao estado inicial em caso de erro
      alert('Ocorreu um erro ao se comunicar com a IA.');
    }
    */

    // Usando dados mockados
    setSugestoes(MOCK_SUGESTOES);
    setStatus("reviewing");
  };

  const handleSuggestionChange = (
    index: number,
    field: keyof SugestaoIA,
    value: string
  ) => {
    const newSuggestions = [...sugestoes];
    newSuggestions[index] = { ...newSuggestions[index], [field]: value };
    setSugestoes(newSuggestions);
  };

  const handlePublish = async () => {
    setStatus("loading");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // --- LÓGICA DE FETCH REAL (COMENTADA) ---
    /*
    try {
      const response = await fetch('/api/desafios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sugestoes)
      });

      if (!response.ok) {
        throw new Error('Falha ao publicar desafios.');
      }
      
      setStatus('published');
    } catch (error) {
      console.error(error);
      setStatus('reviewing'); // Volta para revisão em caso de erro
      alert('Ocorreu um erro ao publicar o conteúdo.');
    }
    */

    // Simulação de sucesso
    setStatus("published");
  };

  const resetGenerator = () => {
    setTema("");
    setSugestoes([]);
    setStatus("idle");
  };

  const nivelCores: Record<string, string> = {
    Básico: "border-green-500",
    Médio: "border-yellow-500",
    Avançado: "border-red-500",
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex items-center gap-3 mb-2">
        <Wand2 className="text-cyan-400" size={32} />
        <h1 className="text-3xl font-bold text-gray-100">
          Assistente de Conteúdo (IA)
        </h1>
      </div>
      <p className="text-gray-400 mb-8">
        Gere, revise e publique desafios de forma adaptativa.
      </p>

      {/* Card de Prompt */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <div className="md:col-span-2">
            <label
              htmlFor="tema"
              className="block text-sm font-bold text-gray-300 mb-2"
            >
              Tema do Desafio
            </label>
            <input
              id="tema"
              type="text"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              placeholder="Ex: Problemas de lógica com potes de água"
              className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-gray-200 focus:ring-2 focus:ring-indigo-500"
              disabled={status === "loading"}
            />
          </div>
          <div>
            <label
              htmlFor="area"
              className="block text-sm font-bold text-gray-300 mb-2"
            >
              Área de Competência
            </label>
            <select
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="w-full bg-gray-700 border-gray-600 rounded-md py-2 px-3 text-gray-200 focus:ring-2 focus:ring-indigo-500"
              disabled={status === "loading"}
            >
              <option value="LOGICA">Lógica</option>
              <option value="PORTUGUES">Português</option>
              <option value="RESOLUCAO">Resolução de Problemas</option>
            </select>
          </div>
        </div>
        <button
          onClick={handleGenerate}
          disabled={status === "loading" || !tema.trim()}
          className="mt-6 w-full md:w-auto flex items-center justify-center gap-2 bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition-colors hover:bg-cyan-500 disabled:bg-gray-600 disabled:cursor-wait"
        >
          {status === "loading" ? (
            <>
              <LoaderCircle size={20} className="animate-spin" /> Gerando...
            </>
          ) : (
            <>
              <Wand2 size={20} /> Gerar Conteúdo Adaptativo
            </>
          )}
        </button>
      </div>

      {/* Área de Resultados */}
      {status === "reviewing" && sugestoes.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-200">
            Revisão Humana: Edite o conteúdo gerado
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {sugestoes.map((sugestao, index) => (
              <div
                key={index}
                className={`bg-gray-800 rounded-lg border-2 ${
                  nivelCores[sugestao.nivel]
                } p-5 flex flex-col gap-4`}
              >
                <h3 className="font-bold text-lg text-cyan-400">
                  {sugestao.nivel}
                </h3>
                <div>
                  <label className="text-xs font-bold text-gray-400">
                    Título
                  </label>
                  <input
                    type="text"
                    value={sugestao.titulo}
                    onChange={(e) =>
                      handleSuggestionChange(index, "titulo", e.target.value)
                    }
                    className="w-full bg-gray-700/50 p-2 rounded-md mt-1 text-gray-100"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-400">
                    Descrição/Pergunta
                  </label>
                  <textarea
                    value={sugestao.descricao}
                    onChange={(e) =>
                      handleSuggestionChange(index, "descricao", e.target.value)
                    }
                    className="w-full bg-gray-700/50 p-2 rounded-md mt-1 h-32 text-gray-200"
                  />
                </div>
                <div className="text-xs text-gray-400 mt-auto">
                  <p>
                    <strong className="text-gray-300">Resposta:</strong>{" "}
                    {sugestao.respostaCorreta}
                  </p>
                  <p>
                    <strong className="text-gray-300">Feedback:</strong>{" "}
                    {sugestao.feedback}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={handlePublish}
            className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Save size={20} /> Aprovar e Publicar Tudo
          </button>
        </div>
      )}

      {status === "published" && (
        <div className="text-center bg-gray-800 border border-green-500 rounded-lg p-8">
          <Check size={48} className="text-green-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-400">
            Conteúdo Publicado!
          </h2>
          <p className="text-gray-300 mt-2">
            Os novos desafios já estão disponíveis para os alunos.
          </p>
          <button
            onClick={resetGenerator}
            className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg"
          >
            Gerar Novo Conteúdo
          </button>
        </div>
      )}
    </div>
  );
}

export default ContentGeneratorPage;
