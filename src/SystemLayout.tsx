import { Outlet, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Sidebar } from "./page/Sidebar";

export function SystemLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Futuramente, aqui você chamaria a função de logout do seu AuthContext
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-gray-900 text-gray-200">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800/50 backdrop-blur-sm flex justify-end p-4 border-b border-gray-700/50 flex-shrink-0">
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-gray-300 hover:text-red-400 transition-colors"
            >
              <LogOut size={18} /> Sair
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default SystemLayout;
