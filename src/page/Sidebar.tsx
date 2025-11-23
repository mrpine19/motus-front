import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Trophy,
  Briefcase,
  Wand2,
  Users,
  BookOpen,
} from "lucide-react";
import logo from "../assets/logo.jpg";

const navLinks = [
  { to: "/dashboard/mentor", icon: LayoutDashboard, label: "Dashboard do Professor" },
  { to: "/dashboard/esg", icon: Briefcase, label: "Dashboard ESG" },
  { to: "/conteudo/gerar", icon: Wand2, label: "Gerar Conteúdo com IA" },
  { to: "/alunos/gestao", icon: Users, label: "Gerenciar Alunos" },
  { to: "/aulas", icon: BookOpen, label: "Aulas Ativas" },
  { to: "/ranking", icon: Trophy, label: "Ranking Semanal" }
];

export function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 bg-white/90 backdrop-blur-sm border-r border-white/20 flex flex-col h-full">
      {/* Header da Sidebar */}
      <div className="p-6 border-b border-gray-200/50">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Motus.IA Logo" className="w-10 h-10 rounded-xl" />
          <div>
            <h1 className="text-xl font-bold text-[#1a1a1a]">Motus.IA</h1>
            <p className="text-xs text-[#1a1a1a]/70">Painel do Mentor</p>
          </div>
        </div>
      </div>

      {/* Navegação */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navLinks.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 group ${
                  isActive 
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25" 
                    : "text-[#1a1a1a]/70 hover:bg-white/50 hover:text-[#1a1a1a] hover:shadow-md"
                }`
              }
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              <span className="font-medium">{label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;