import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Trophy,
  Flame,
  ShieldCheck,
  Briefcase,
  Wand2,
} from "lucide-react";

const navLinks = [
  { to: "/dashboard/mentor", icon: LayoutDashboard, label: "Painel do Mentor" },
  { to: "/dashboard/esg", icon: Briefcase, label: "Relatório ESG" },
  { to: "/conteudo/gerar", icon: Wand2, label: "Gerador de Conteúdo" },
  { to: "/ranking", icon: Trophy, label: "Ranking" },
  { to: "/trilha", icon: Flame, label: "Trilha de Desafios" },
];

export function Sidebar() {
  const activeLinkStyle = "bg-indigo-600 text-white";
  const inactiveLinkStyle =
    "text-gray-400 hover:bg-gray-700/50 hover:text-white";

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-800/90 p-4 border-r border-gray-700/50 flex flex-col">
      <div className="flex items-center gap-3 mb-8 px-2">
        <ShieldCheck className="text-cyan-400" size={28} />
        <h1 className="text-xl font-bold text-gray-100">Motus.IA</h1>
      </div>
      <nav className="flex flex-col gap-2">
        {navLinks.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive ? activeLinkStyle : inactiveLinkStyle
              }`
            }
          >
            <Icon className="h-5 w-5" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;
