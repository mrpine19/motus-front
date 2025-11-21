import React, { useState, useEffect } from "react";
import { School, GraduationCap, Plus, Trash2, Save } from "lucide-react";

interface Turma {
  id: number;
  nome: string;
  descricao: string;
  voluntarioResponsavel?: string;
}

interface Aluno {
  id: number;
  nome: string;
  email: string;
  nomeTurma: string;
  status: "ATIVO" | "INATIVO";
  nivelAtual: string;
}

interface AlunoApiResponse {
  id: number;
  nome: string;
  email: string;
  nomeTurma: string;
  nivelAtual: string;
}

const GestaoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"turmas" | "alunos">("turmas");
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [voluntarios, setVoluntarios] = useState<string[]>([]);

  const [novaTurma, setNovaTurma] = useState({
    nome: "",
    descricao: "",
    voluntario: "",
  });
  const [novoAluno, setNovoAluno] = useState({
    nome: "",
    email: "",
    nomeTurma: "",
    nivelAtual: "",
  });

  const [showTurmaForm, setShowTurmaForm] = useState(false);
  const [showAlunoForm, setShowAlunoForm] = useState(false);

  useEffect(() => {
    // GET /api/turmas
    fetch("http://localhost:8080/turmas")
      .then((res) => res.json())
      .then((data) => setTurmas(data));

    // GET /api/voluntarios/nomes
    fetch("http://localhost:8080/voluntarios/nomes")
      .then((res) => res.json())
      .then((data) => setVoluntarios(data));

    // GET /api/alunos
    fetch("http://localhost:8080/alunos")
      .then((res) => res.json())
      .then((data) => {
        const alunosAdaptados: Aluno[] = data.map(
          (aluno: AlunoApiResponse) => ({
            id: aluno.id,
            nome: aluno.nome,
            email: aluno.email,
            nomeTurma: aluno.nomeTurma,
            nivelAtual: aluno.nivelAtual,
            status: "ATIVO",
          })
        );
        setAlunos(alunosAdaptados);
      });
  }, []);

  // Simulação de CRUD
  const handleSalvarTurma = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaTurma.voluntario) {
      alert("Por favor, selecione um voluntário.");
      return;
    }

    const payload = {
      nomeDaTurma: novaTurma.nome,
      descricao: novaTurma.descricao,
      nomeVoluntarioResponsavel: novaTurma.voluntario,
    };

    // POST /turmas
    fetch("http://localhost:8080/turmas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Falha ao criar turma");
        }
        return res.json();
      })
      .then((turmaSalva) => {
        //Adapta o objeto retornado para a interface Turma do frontend
        const turmaAdaptada: Turma = {
          id: turmaSalva.id,
          nome: turmaSalva.nomeDaTurma,
          descricao: turmaSalva.descricao,
          voluntarioResponsavel: turmaSalva.nomeVoluntarioResponsavel,
        };
        setTurmas([...turmas, turmaAdaptada]);
        setNovaTurma({ nome: "", descricao: "", voluntario: "" });
        setShowTurmaForm(false);
      })
      .catch((error) => console.error("Erro ao salvar turma:", error));
  };
  useEffect(() => {
    console.log("Turmas", turmas);
  });

  const handleSalvarAluno = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoAluno.nomeTurma) {
      alert("Por favor, selecione uma turma.");
      return;
    }
    if (!novoAluno.nivelAtual) {
      alert("Por favor, selecione um nível para o aluno.");
      return;
    }

    const payload = {
      nomeCompleto: novoAluno.nome,
      email: novoAluno.email,
      senha: "password1234",
      nivelAtual: novoAluno.nivelAtual,
      nomeTurma: novoAluno.nomeTurma,
    };

    // POST /alunos
    fetch("http://localhost:8080/alunos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((alunoSalvo) => {
        setAlunos([...alunos, { ...alunoSalvo, status: "ATIVO" }]);
        setNovoAluno({ nome: "", email: "", nomeTurma: "", nivelAtual: "" });
        setShowAlunoForm(false);
      })
      .catch((error) => console.error("Erro ao salvar aluno:", error));
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
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <select
                      value={novaTurma.voluntario}
                      onChange={(e) =>
                        setNovaTurma({
                          ...novaTurma,
                          voluntario: e.target.value,
                        })
                      }
                      className="bg-gray-700 border border-gray-600 rounded p-2 w-full"
                      required
                    >
                      <option value="" disabled>
                        Selecione um Voluntário
                      </option>
                      {voluntarios.map((nome) => (
                        <option key={nome} value={nome}>
                          {nome}
                        </option>
                      ))}
                    </select>
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
                    <th className="p-4">Voluntário Responsável</th>
                    <th className="p-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {turmas.map((turma) => (
                    <tr key={turma.id} className="border-b border-gray-700">
                      <td className="p-4">{turma.nome}</td>
                      <td className="p-4">{turma.descricao}</td>
                      <td className="p-4">
                        {turma.voluntarioResponsavel || "N/A"}
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
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                      value={novoAluno.nomeTurma}
                      onChange={(e) =>
                        setNovoAluno({
                          ...novoAluno,
                          nomeTurma: e.target.value,
                        })
                      }
                      className="bg-gray-700 border border-gray-600 rounded p-2 w-full"
                      required
                    >
                      <option value="" disabled>
                        Selecione a Turma
                      </option>
                      {turmas.map((turma) => (
                        <option key={turma.id} value={turma.nome}>
                          {turma.nome}
                        </option>
                      ))}
                    </select>
                    <select
                      value={novoAluno.nivelAtual}
                      onChange={(e) =>
                        setNovoAluno({
                          ...novoAluno,
                          nivelAtual: e.target.value,
                        })
                      }
                      className="bg-gray-700 border border-gray-600 rounded p-2 w-full"
                      required
                    >
                      <option value="" disabled>
                        Selecione o Nível
                      </option>
                      <option value="Básico">Básico</option>
                      <option value="Médio">Médio</option>
                      <option value="Avançado">Avançado</option>
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
                    <th className="p-4">Nível Atual</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {alunos.map((aluno) => (
                    <tr key={aluno.id} className="border-b border-gray-700">
                      <td className="p-4">{aluno.nome}</td>
                      <td className="p-4">{aluno.email}</td>
                      <td className="p-4">{aluno.nomeTurma || "N/A"}</td>
                      <td className="p-4">{aluno.nivelAtual}</td>
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
