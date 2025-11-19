import { Link, Outlet } from "react-router-dom";
import { LogOut, ShieldCheck } from "lucide-react";

export function SystemLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-200">
      <header className="bg-gray-800/80 backdrop-blur-sm shadow-md sticky top-0 z-50 border-b border-gray-700">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-cyan-400" />
            <Link
              to="/ranking"
              className="text-xl font-bold text-indigo-500 hover:text-indigo-400"
            >
              Motus.IA System
            </Link>
          </div>
          <button className="flex items-center gap-2 text-gray-300 hover:text-red-400">
            <LogOut size={18} /> Sair
          </button>
        </nav>
      </header>
      <main className="grow py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default SystemLayout;
