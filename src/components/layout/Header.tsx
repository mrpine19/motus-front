import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon } from 'lucide-react';

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
    const isDarkMode = true; 
    
    const NAV_ITEMS = [
        { name: 'Home', path: '/', visibleTo: ['GUEST', 'ALUNO', 'VOLUNTARIO', 'PATROCINADOR'] },
        { name: 'Integrantes', path: '/integrantes', visibleTo: ['GUEST', 'ALUNO', 'VOLUNTARIO', 'PATROCINADOR'] },
        { name: 'Perguntas frequentes', path: '/perguntas', visibleTo: ['GUEST', 'ALUNO', 'VOLUNTARIO', 'PATROCINADOR'] },
        { name: 'Contato', path: '/contato', visibleTo: ['GUEST', 'ALUNO', 'VOLUNTARIO', 'PATROCINADOR'] },
        { name: 'Mentoria', path: '/dashboard/mentor', visibleTo: ['VOLUNTARIO'] },
        { name: 'ESG Executivo', path: '/dashboard/esg', visibleTo: ['PATROCINADOR'] },
    ];

    return (
        <header className="sticky top-0 z-50 bg-blue-400 shadow-xl border-b border-blue-300/50">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <h1 
                    onClick={() => navigate('/')} 
                    className="text-2xl font-black text-gray-800 cursor-pointer hover:text-gray-900 transition-colors"
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
                                    className="text-sm font-medium text-gray-800 hover:text-gray-900 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                        
                        {isLoggedIn ? (
                            <Link
                                to="/login"
                                className="inline-flex items-center text-sm font-medium bg-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-500 transition-colors"
                            >
                                Login
                            </Link>
                        ) : (
                             <Link
                                to="/login"
                                className="inline-flex items-center text-sm font-medium bg-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-500 transition-colors"
                            >
                                Login
                            </Link>
                        )}
                    </nav>

                    <button
                        type="button"
                        className="p-2 rounded-full hover:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-gray-800 focus:ring-offset-2 focus:ring-offset-blue-400"
                        aria-label="Alternar tema"
                    >
                        {isDarkMode ? <Sun size={20} className="text-gray-800" /> : <Moon size={20} className="text-gray-800" />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;