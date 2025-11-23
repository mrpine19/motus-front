import { Outlet, useNavigate } from "react-router-dom";
import { Settings, Bell, LogOut } from "lucide-react";
import { Sidebar } from "../../page/Sidebar";

export function SystemLayout() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600">
      <div className="flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white/90 backdrop-blur-sm border-b border-white/20 flex items-center justify-between px-6 py-4 flex-shrink-0">
          <div>
            <h1 className="text-2xl font-bold text-[#1a1a1a]">
              Painel do Mentor
            </h1>
            <p className="text-[#1a1a1a]/70 text-sm">
              Gerencie seus alunos e acompanhe o progresso
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <button className="relative p-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors rounded-lg hover:bg-white/50">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <button className="p-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors rounded-lg hover:bg-white/50">
              <Settings size={20} />
            </button>

            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-sm font-medium text-[#1a1a1a]/80 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-white/50"
            >
              <LogOut size={16} />
              <span>Sair</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 md:p-8">
              <Outlet />
            </div>
          </div>
        </main>

        <footer className="bg-white/90 backdrop-blur-sm border-t border-white/20 py-4 px-6 flex-shrink-0">
          <div className="flex items-center justify-between text-sm">
            <p className="text-[#1a1a1a]/70">
              © 2025 Motus.IA - Todos os direitos reservados
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default SystemLayout;
