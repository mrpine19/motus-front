import { useNavigate } from "react-router-dom";
import { LogIn, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useState } from "react";

export function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/dashboard/mentor");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LogIn className="text-white" size={32} />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Motus.IA
            </h1>
            <p className="text-white/80">
              Acesse sua conta
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-8">
            <div className="space-y-6">
              <div>
                <label
                  className="block text-[#1a1a1a] text-sm font-bold mb-3"
                  htmlFor="email"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="text-gray-400" size={20} />
                  </div>
                  <input
                    className="shadow appearance-none border rounded-xl w-full py-3 px-4 pl-10 bg-white border-gray-300 text-[#1a1a1a] leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500 transition-colors"
                    id="email"
                    type="email"
                    placeholder="seuemail@exemplo.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  className="block text-[#1a1a1a] text-sm font-bold mb-3"
                  htmlFor="password"
                >
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="text-gray-400" size={20} />
                  </div>
                  <input
                    className="shadow appearance-none border rounded-xl w-full py-3 px-4 pl-10 pr-10 bg-white border-gray-300 text-[#1a1a1a] leading-tight focus:outline-none focus:shadow-outline focus:border-cyan-500 transition-colors"
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="text-gray-400 hover:text-gray-600" size={20} />
                    ) : (
                      <Eye className="text-gray-400 hover:text-gray-600" size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-cyan-500 focus:ring-cyan-500"
                  />
                  <span className="ml-2 text-sm text-[#1a1a1a]">Lembrar-me</span>
                </label>
                <a
                  className="text-sm font-medium text-cyan-600 hover:text-cyan-500 transition-colors"
                  href="#"
                >
                  Esqueceu a senha?
                </a>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-4 rounded-xl focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <LogIn size={20} />
                <span>Entrar na Plataforma</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;