import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Settings, Bell, LogOut, Menu, X } from "lucide-react";
import { Sidebar } from "../../page/Sidebar";

export function SystemLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600">
      {sidebarOpen && (
        <div className="relative z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-gray-900/80" 
            aria-hidden="true"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="fixed inset-0 flex">
            <div className="relative mr-16 flex w-full max-w-xs flex-1 transform transition ease-in-out duration-300 translate-x-0">
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                  <span className="sr-only">Close sidebar</span>
                  <X className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
              </div>
              <Sidebar />
            </div>
          </div>
        </div>
      )}

      <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col md:pl-64">
        <header className="bg-white/90 backdrop-blur-sm border-b border-white/20 flex items-center justify-between px-6 py-4 flex-shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-4">
             <button
                type="button"
                className="p-2.5 text-gray-700 md:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            <div>
                <h1 className="text-xl md:text-2xl font-bold text-[#1a1a1a]">
                Painel do Mentor
                </h1>
                <p className="text-[#1a1a1a]/70 text-sm hidden md:block">
                Gerencie seus alunos e acompanhe o progresso
                </p>
            </div>
          </div>


          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="relative p-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors rounded-lg hover:bg-white/50">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </button>

            <button className="hidden md:block p-2 text-[#1a1a1a]/70 hover:text-[#1a1a1a] transition-colors rounded-lg hover:bg-white/50">
              <Settings size={20} />
            </button>

            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-sm font-medium text-[#1a1a1a]/80 hover:text-red-500 transition-colors p-2 rounded-lg hover:bg-white/50"
            >
              <LogOut size={16} />
              <span className="hidden md:inline">Sair</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 md:p-8 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-4 md:p-8">
              <Outlet />
            </div>
          </div>
        </main>

        <footer className="fixed bottom-0 left-0 md:left-64 right-0 bg-white/90 backdrop-blur-sm border-t border-white/20 py-4 px-6 z-10">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-center">
            <p className="text-[#1a1a1a] font-medium">
              © 2025 Motus.IA - Todos os direitos reservados
            </p>
            <p className="text-[#1a1a1a]/70 mt-2 md:mt-0">
              Transformando educação através da inteligência artificial
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default SystemLayout;
