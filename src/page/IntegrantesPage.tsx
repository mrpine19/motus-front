import GustavoImage from "../assets/gustavo.jpg";

const teamMembers = [
  {
    id: 1,
    name: "Gustavo Pinheiro de Oliveira",
    rm: "RM: 566358",
    photo: GustavoImage,
    githubUrl: "https://github.com/mrpine19",
    linkedinUrl:
      "https://www.linkedin.com/in/gustavo-pinheiro-de-oliveira-0165281b5/",
  },
];

export function IntegrantesPage() {
  return (
    <div className="container mx-auto px-4 text-center">
      <h1 className="text-4xl font-bold text-cyan-400 mb-8">
        Nossos Integrantes
      </h1>
      <div className="flex justify-center gap-8">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-gray-800/50 p-6 rounded-lg border border-gray-700 flex flex-col items-center"
          >
            <img
              className="w-32 h-32 rounded-full mb-4 border-2 border-cyan-400"
              src={member.photo}
              alt={member.name}
            />
            <h2 className="text-xl font-bold text-gray-200">{member.name}</h2>
            <p className="text-indigo-400">{member.rm}</p>
            <div className="flex space-x-4 mt-4">
              <a
                href={member.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-cyan-400"
              >
                GitHub
              </a>
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-cyan-400"
              >
                LinkedIn
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IntegrantesPage;
