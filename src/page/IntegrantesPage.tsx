import GustavoImage from "../assets/gustavo.jpg";
import { Github, Linkedin, BookOpen } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Gustavo Pinheiro de Oliveira",
    rm: "RM: 566358",
    photo: GustavoImage,
    githubUrl: "https://github.com/mrpine19",
    linkedinUrl: "https://www.linkedin.com/in/gustavo-pinheiro-de-oliveira-0165281b5/",
    email: "gustavo.pine19@example.com",
    role: "Full Stack Developer & AI Enthusiast",
    skills: ["React", "Node.js", "Python", "Machine Learning", "Tailwind CSS"],
    bio: "Apaixonado por tecnologia e inovação, com foco em desenvolver soluções que unem inteligência artificial e experiência do usuário.",
    contributions: [
      "Desenvolvimento do frontend responsivo",
      "Integração com APIs de IA",
      "Arquitetura do sistema"
    ]
  },
];

export function IntegrantesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-[#1a1a1a] mb-4">
          Conheça Nossa Equipe
        </h1>
        <p className="text-xl text-[#1a1a1a]/80 max-w-2xl mx-auto">
          Talentos dedicados que estão transformando educação através da 
          inteligência artificial e inovação tecnológica.
        </p>
      </div>

      <div className="flex justify-center">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white/90 backdrop-blur-sm rounded-2xl border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-full max-w-md"
          >
            <div className="relative">
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="relative">
                  <img
                    className="w-28 h-28 rounded-full border-4 border-white shadow-lg"
                    src={member.photo}
                    alt={member.name}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-cyan-500 text-white p-2 rounded-full shadow-lg">
                    <BookOpen size={16} />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-20 px-6 pb-6">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-[#1a1a1a] mb-1">
                  {member.name}
                </h2>
                <p className="text-[#1a1a1a]/70 font-medium mb-2">
                  {member.rm}
                </p>
                <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  {member.role}
                </div>
              </div>

              <p className="text-[#1a1a1a]/80 text-center mb-6 leading-relaxed">
                {member.bio}
              </p>

              <div className="mb-6">
                <h3 className="text-[#1a1a1a] font-semibold mb-3 text-center">
                  Habilidades Técnicas
                </h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {member.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-[#1a1a1a] px-3 py-1 rounded-full text-sm font-medium border border-gray-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-[#1a1a1a] font-semibold mb-3 text-center">
                  Principais Contribuições
                </h3>
                <ul className="space-y-2">
                  {member.contributions.map((contribution, index) => (
                    <li key={index} className="flex items-center text-[#1a1a1a]/80 text-sm">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full mr-3"></div>
                      {contribution}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex justify-center space-x-4 pt-4 border-t border-gray-200/50">
                <a
                  href={member.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-gray-200 text-[#1a1a1a] rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  title="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-gray-100 hover:bg-blue-100 text-[#1a1a1a] rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                  title="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default IntegrantesPage;