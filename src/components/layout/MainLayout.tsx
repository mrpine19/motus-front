import { Outlet } from "react-router-dom";
import Header from "./Header";

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 text-[#1a1a1a]">
      <Header />
      <main className="flex-1 py-8">
        <Outlet />
      </main>
      <footer className="bg-white/90 backdrop-blur-sm text-center p-6 border-t border-white/20">
        <div className="container mx-auto">
          <p className="text-[#1a1a1a] font-medium">
            © 2025 Motus.IA - Todos os direitos reservados
          </p>
          <p className="text-[#1a1a1a]/70 text-sm mt-2">
            Transformando educação através da inteligência artificial
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;