import React, { useState, useEffect } from "react";
import { School, GraduationCap, Plus, Trash2, Save } from "lucide-react";

interface Turma {
  id: number;
  nome: string;
  descricao: string;
}

interface Aluno {
  id: number;
  nome: string;
  email: string;
  turmaId: number;
  status: "ATIVO" | "INATIVO";
}

// Dados Mocados para Simulação
const MOCK_TURMAS: Turma[] = [
  {
    id: 1,
    nome: "9º Ano - Reforço de Matemática",
    descricao: "Turma focada em preparar os alunos para a OBMEP.",
  },
  {
    id: 2,
    nome: "3º Ano EM - Redação para o ENEM",
    descricao: "Aulas de redação e gramática para o Ensino Médio.",
  },
];

const MOCK_ALUNOS: Aluno[] = [
  {
    id: 101,
    nome: "Ana Silva",
    email: "ana.silva@example.com",
    turmaId: 1,
    status: "ATIVO",
  },
  {
    id: 102,
    nome: "Bruno Costa",
    email: "bruno.costa@example.com",
    turmaId: 2,
    status: "ATIVO",
  },
  {
    id: 103,
    nome: "Carla Dias",
    email: "carla.dias@example.com",
    turmaId: 1,
    status: "INATIVO",
  },
];

const GestaoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"turmas" | "alunos">("turmas");
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  const [novaTurma, setNovaTurma] = useState({ nome: "", descricao: "" });
  const [novoAluno, setNovoAluno] = useState({
    nome: "",
    email: "",
    turmaId: 0,
  });

  const [showTurmaForm, setShowTurmaForm] = useState(false);
  const [showAlunoForm, setShowAlunoForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTurmas(MOCK_TURMAS);
      setAlunos(MOCK_ALUNOS);
    }, 500);

    return () => clearTimeout(timer);

    /*
    // GET /api/turmas
    fetch('/api/turmas')
      .then(res => res.json())
      .then(data => setTurmas(data));

    // GET /api/alunos
    fetch('/api/alunos')
      .then(res => res.json())
      .then(data => setAlunos(data));
    */
  }, []);

  // Simulação de CRUD
  const handleSalvarTurma = (e: React.FormEvent) => {
    e.preventDefault();
    const turmaParaAdicionar: Turma = {
      id: Date.now(),
      ...novaTurma,
    };
    setTurmas([...turmas, turmaParaAdicionar]);
    setNovaTurma({ nome: "", descricao: "" });
    setShowTurmaForm(false);

    /*
    // POST /api/turmas
    fetch('/api/turmas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaTurma),
    })
    .then(res => res.json())
    .then(turmaSalva => {
      setTurmas([...turmas, turmaSalva]);
    });
    */
  };

  const handleSalvarAluno = (e: React.FormEvent) => {
    e.preventDefault();
    if (novoAluno.turmaId === 0) {
      alert("Por favor, selecione uma turma.");
      return;
    }
    const alunoParaAdicionar: Aluno = {
      id: Date.now(),
      ...novoAluno,
      status: "ATIVO",
    };
    setAlunos([...alunos, alunoParaAdicionar]);
    setNovoAluno({ nome: "", email: "", turmaId: 0 }); // Limpa o formulário
    setShowAlunoForm(false);

    /*
    // POST /api/alunos
    fetch('/api/alunos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoAluno),
    })
    .then(res => res.json())
    .then(alunoSalvo => {
      setAlunos([...alunos, alunoSalvo]);
    });
    */
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-cyan-400">
        Portal de Gestão de Voluntários
      </h1>

      <div className="mb-6 border-b border-gray-700">
        <nav className="-mb-px flex space-x-6">
          <button
            onClick={() => setActiveTab("turmas")}
            className={`py-4 px-1 inline-flex items-center gap-2 text-lg font-medium ${
              activeTab === "turmas"
                ? "border-b-2 border-cyan-400 text-cyan-400"
                : "text-gray-400 hover:text-cyan-300"
            }`}
          >
            <School /> Gerenciar Turmas
          </button>
          <button
            onClick={() => setActiveTab("alunos")}
            className={`py-4 px-1 inline-flex items-center gap-2 text-lg font-medium ${
              activeTab === "alunos"
                ? "border-b-2 border-cyan-400 text-cyan-400"
                : "text-gray-400 hover:text-cyan-300"
            }`}
          >
            <GraduationCap /> Gerenciar Alunos
          </button>
        </nav>
      </div>

      <div>
        {activeTab === "turmas" && (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowTurmaForm(!showTurmaForm)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded inline-flex items-center gap-2"
              >
                <Plus size={20} /> Nova Turma
              </button>
            </div>

            {showTurmaForm && (
              <div className="bg-gray-800 p-4 rounded-lg mb-6">
                <form onSubmit={handleSalvarTurma}>
                  <h3 className="text-xl font-semibold mb-3">
                    Cadastrar Nova Turma
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Nome da Turma"
                      value={novaTurma.nome}
                      onChange={(e) =>
                        setNovaTurma({ ...novaTurma, nome: e.target.value })
                      }
                      className="bg-gray-700 border border-gray-600 rounded p-2 w-full"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Descrição"
                      value={novaTurma.descricao}
                      onChange={(e) =>
                        setNovaTurma({
                          ...novaTurma,
                          descricao: e.target.value,
                        })
                      }
                      className="bg-gray-700 border border-gray-600 rounded p-2 w-full"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded inline-flex items-center gap-2"
                  >
                    <Save size={20} /> Salvar Turma
                  </button>
                </form>
              </div>
            )}

            <div className="overflow-x-auto bg-gray-800 rounded-lg">
              <table className="min-w-full text-left">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-4">Nome</th>
                    <th className="p-4">Descrição</th>
                    <th className="p-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {turmas.map((turma) => (
                    <tr key={turma.id} className="border-b border-gray-700">
                      <td className="p-4">{turma.nome}</td>
                      <td className="p-4">{turma.descricao}</td>
                      <td className="p-4">
                        <button className="text-red-400 hover:text-red-500">
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "alunos" && (
          <div>
            <div className="flex justify-end mb-4">
              <button
                onClick={() => setShowAlunoForm(!showAlunoForm)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded inline-flex items-center gap-2"
              >
                <Plus size={20} /> Novo Aluno
              </button>
            </div>

            {showAlunoForm && (
              <div className="bg-gray-800 p-4 rounded-lg mb-6">
                <form onSubmit={handleSalvarAluno}>
                  <h3 className="text-xl font-semibold mb-3">
                    Cadastrar Novo Aluno
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      placeholder="Nome Completo"
                      value={novoAluno.nome}
                      onChange={(e) =>
                        setNovoAluno({ ...novoAluno, nome: e.target.value })
                      }
                      className="bg-gray-700 border border-gray-600 rounded p-2 w-full"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={novoAluno.email}
                      onChange={(e) =>
                        setNovoAluno({ ...novoAluno, email: e.target.value })
                      }
                      className="bg-gray-700 border border-gray-600 rounded p-2 w-full"
                      required
                    />
                    <select
                      value={novoAluno.turmaId}
                      onChange={(e) =>
                        setNovoAluno({
                          ...novoAluno,
                          turmaId: Number(e.target.value),
                        })
                      }
                      className="bg-gray-700 border border-gray-600 rounded p-2 w-full"
                      required
                    >
                      <option value={0} disabled>
                        Selecione a Turma
                      </option>
                      {turmas.map((turma) => (
                        <option key={turma.id} value={turma.id}>
                          {turma.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-4 rounded inline-flex items-center gap-2"
                  >
                    <Save size={20} /> Salvar Aluno
                  </button>
                </form>
              </div>
            )}

            <div className="overflow-x-auto bg-gray-800 rounded-lg">
              <table className="min-w-full text-left">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="p-4">Nome</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Turma Vinculada</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {alunos.map((aluno) => (
                    <tr key={aluno.id} className="border-b border-gray-700">
                      <td className="p-4">{aluno.nome}</td>
                      <td className="p-4">{aluno.email}</td>
                      <td className="p-4">
                        {turmas.find((t) => t.id === aluno.turmaId)?.nome ||
                          "N/A"}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            aluno.status === "ATIVO"
                              ? "bg-green-500 text-green-900"
                              : "bg-red-500 text-red-900"
                          }`}
                        >
                          {aluno.status}
                        </span>
                      </td>
                      <td className="p-4">
                        <button className="text-red-400 hover:text-red-500">
                          <Trash2 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GestaoPage;
