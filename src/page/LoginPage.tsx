import { useNavigate } from "react-router-dom";

export function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/ranking");
  };

  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="w-full max-w-md">
        <form className="bg-gray-800/50 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-700">
          <h1 className="text-center text-2xl font-bold text-cyan-400 mb-6">
            Acessar Plataforma
          </h1>
          <div className="mb-4">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="seuemail@exemplo.com"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-300 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="button"
              onClick={handleLogin}
            >
              Entrar
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-indigo-400 hover:text-indigo-300"
              href="#"
            >
              Esqueceu a senha?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
