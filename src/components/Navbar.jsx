import { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { CheckCircle, LogOut, LayoutDashboard, ListTodo } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="glass sticky top-0 z-40 border-b border-slate-200/50">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center gap-2.5 group">
                            <div className="bg-gradient-to-tr from-indigo-600 to-violet-500 text-white p-2 rounded-xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
                                <CheckCircle className="h-6 w-6" />
                            </div>
                            <span className="font-extrabold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 tracking-tight font-display">
                                Time Tracker
                            </span>
                        </Link>
                        
                        {user && (
                            <div className="hidden md:flex ml-12 space-x-2">
                                <Link to="/" className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${isActive('/') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                                    <LayoutDashboard className="h-4 w-4" />
                                    Dashboard
                                </Link>
                                <Link to="/tasks" className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${isActive('/tasks') ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}>
                                    <ListTodo className="h-4 w-4" />
                                    Tasks Board
                                </Link>
                            </div>
                        )}
                    </div>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            <div className="flex items-center gap-6">
                                <div className="hidden md:flex flex-col items-end">
                                    <span className="text-sm font-bold text-slate-900">{user.name}</span>
                                    <span className="text-xs text-slate-500 font-medium">{user.email}</span>
                                </div>
                                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-indigo-100 to-violet-100 border border-indigo-50 flex items-center justify-center shadow-inner">
                                    <span className="font-bold text-indigo-700 text-lg">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-300 group"
                                    title="Logout"
                                >
                                    <LogOut className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                </button>
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link to="/login" className="px-5 py-2.5 text-slate-600 hover:text-indigo-600 font-semibold transition-colors">
                                    Log In
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-slate-900 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-indigo-500/20 active:scale-95"
                                >
                                    Get Started
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
