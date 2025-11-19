import { useState } from "react";

export function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="container mx-auto px-4 flex justify-center">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-cyan-400 mb-4">
            Entre em Contato
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto">
            Interessado em transformar o futuro do trabalho com o Motus.IA?
            Preencha o formulário abaixo para falar com nossa equipe sobre
            parcerias, investimentos ou para saber mais sobre nossa solução ESG.
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-gray-800/50 shadow-md rounded-lg px-8 py-12 mb-4 border border-gray-700 text-center">
            <h2 className="text-2xl font-bold text-cyan-400 mb-4">
              Mensagem Enviada com Sucesso!
            </h2>
            <p className="text-gray-300 mb-8">
              Agradecemos seu contato. Nossa equipe retornará em breve.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
            >
              Enviar Nova Mensagem
            </button>
          </div>
        ) : (
          <form className="bg-gray-800/50 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4 border border-gray-700">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mb-4">
                <label
                  className="block text-gray-300 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Seu Nome
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Nome Completo"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-300 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email Corporativo
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-200 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  placeholder="seuemail@empresa.com"
                />
              </div>
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-300 text-sm font-bold mb-2"
                htmlFor="message"
              >
                Mensagem
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-700 border-gray-600 text-gray-200 leading-tight focus:outline-none focus:shadow-outline h-32"
                id="message"
                placeholder="Como podemos ajudar?"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                onClick={() => setIsSubmitted(true)}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Enviar Mensagem
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default ContactPage;
