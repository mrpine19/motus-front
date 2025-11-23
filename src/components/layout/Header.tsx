import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

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

                <div className="flex items-center space-x-6">
                    <nav className="hidden items-center space-x-6 md:flex">
                        {NAV_ITEMS.map((item) => {
                            const showLink = item.visibleTo.includes(userRole) || (item.name === 'Login' && !isLoggedIn);
                            if (!showLink) return null;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className="text-sm font-medium text-[#1a1a1a] hover:text-cyan-600 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                        
                        {isLoggedIn ? (
                            <Link
                                to="/login"
                                className="inline-flex items-center text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                            >
                                Área interna
                            </Link>
                        ) : (
                            <Link
                                to="/login"
                                className="inline-flex items-center text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105"
                            >
                                Entrar
                            </Link>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;