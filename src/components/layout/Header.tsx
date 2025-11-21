import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogOut, Sun, Moon } from 'lucide-react';

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
    const { isLoggedIn, userRole, logout } = useAuth();
    const isDarkMode = true; 
    
    const NAV_ITEMS = [
        { name: 'Home', path: '/', visibleTo: ['GUEST', 'ALUNO', 'VOLUNTARIO', 'PATROCINADOR'] },
        { name: 'Integrantes', path: '/integrantes', visibleTo: ['GUEST', 'ALUNO', 'VOLUNTARIO', 'PATROCINADOR'] },
        { name: 'Contato', path: '/contato', visibleTo: ['GUEST', 'ALUNO', 'VOLUNTARIO', 'PATROCINADOR'] },
        { name: 'Mentoria', path: '/dashboard/mentor', visibleTo: ['VOLUNTARIO'] },
        { name: 'ESG Executivo', path: '/dashboard/esg', visibleTo: ['PATROCINADOR'] },
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-50 bg-gray-800 shadow-xl border-b border-indigo-900/50">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                <h1 
                    onClick={() => navigate('/')} 
                    className="text-2xl font-black text-indigo-600 cursor-pointer hover:text-indigo-500 transition-colors"
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
                                    className="text-sm font-medium hover:text-cyan-400 transition-colors"
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                        
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center text-sm font-medium text-red-400 hover:text-red-500 transition-colors"
                            >
                                <LogOut size={16} className="mr-1" /> Sair ({userRole})
                            </button>
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
                        className="p-2 rounded-full hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-800"
                        aria-label="Alternar tema"
                    >
                        {isDarkMode ? <Sun size={20} className="text-cyan-400" /> : <Moon size={20} className="text-cyan-400" />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;