import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const useAuth = () => {
    return { 
        isLoggedIn: true, 
        userRole: 'ALUNO' as 'ALUNO' | 'VOLUNTARIO' | 'PATROCINADOR' | 'GUEST',
        logout: () => { 
            console.log("Simulando Logout..."); 
        },
    };
};

const Header: React.FC = () => {
    const navigate = useNavigate();
    const { isLoggedIn, userRole } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const NAV_ITEMS = [
        { name: 'Sobre', path: '/', visibleTo: ['GUEST', 'ALUNO', 'VOLUNTARIO', 'PATROCINADOR'] },
        { name: 'Integrantes', path: '/integrantes', visibleTo: ['GUEST', 'ALUNO', 'VOLUNTARIO', 'PATROCINADOR'] },
        { name: 'Perguntas frequentes', path: '/perguntas', visibleTo: ['GUEST', 'ALUNO', 'VOLUNTARIO', 'PATROCINADOR'] },
        { name: 'Contato', path: '/contato', visibleTo: ['GUEST', 'ALUNO', 'VOLUNTARIO', 'PATROCINADOR'] },
        { name: 'Mentoria', path: '/dashboard/mentor', visibleTo: ['VOLUNTARIO'] },
        { name: 'ESG Executivo', path: '/dashboard/esg', visibleTo: ['PATROCINADOR'] },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-xl border-b border-white/20">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <h1 
                    onClick={() => navigate('/')} 
                    className="text-2xl font-black text-[#1a1a1a] cursor-pointer hover:text-cyan-600 transition-colors"
                >
                    Motus.IA
                </h1>

                <div className="flex items-center">
                    <nav className={`${isMenuOpen ? 'flex' : 'hidden'} absolute md:static top-16 left-0 w-full md:w-auto flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6 bg-white/95 md:bg-transparent shadow-lg md:shadow-none p-6 md:p-0 md:flex`}>
                        {NAV_ITEMS.map((item) => {
                            const showLink = item.visibleTo.includes(userRole) || (item.name === 'Login' && !isLoggedIn);
                            if (!showLink) return null;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="text-lg md:text-sm font-medium text-[#1a1a1a] hover:text-cyan-600 transition-colors w-full text-center md:w-auto"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                        
                        {isLoggedIn ? (
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 w-full md:w-auto"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Área interna
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="inline-flex items-center justify-center text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 w-full md:w-auto"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Entrar
                            </Link>
                        )}
                    </nav>
                     <button
                        className="ml-4 md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;