import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-gray-800 shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-indigo-600 hover:text-indigo-500"
          >
            Motus.IA
          </Link>
        </div>
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-gray-300 hover:text-cyan-400">
            Home
          </Link>
          <Link to="/integrantes" className="text-gray-300 hover:text-cyan-400">
            Integrantes
          </Link>
          <Link to="/sobre" className="text-gray-300 hover:text-cyan-400">
            Sobre
          </Link>
          <Link to="/contato" className="text-gray-300 hover:text-cyan-400">
            Contato
          </Link>
          <Link to="/login" className="text-gray-300 hover:text-cyan-400">
            Login
          </Link>
          <button
            onClick={() => alert("Funcionalidade de tema a ser implementada!")}
            className="bg-gray-700 text-cyan-400 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-600"
          >
            Toggle Tema
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
