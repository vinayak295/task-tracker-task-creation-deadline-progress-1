import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(name, email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to register');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-md glass-card p-10 rounded-3xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-violet-500"></div>
                
                <div className="flex flex-col items-center mb-10">
                    <div className="bg-gradient-to-tr from-indigo-600 to-violet-500 text-white p-3 rounded-2xl shadow-lg shadow-indigo-500/20 mb-5">
                        <UserPlus className="h-8 w-8" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 text-center tracking-tight font-display">Create Account</h2>
                    <p className="text-slate-500 mt-2 text-center font-medium">Join us to start managing your tasks</p>
                </div>

                {error && <div className="bg-rose-50 text-rose-600 p-4 rounded-xl mb-6 text-sm text-center font-bold border border-rose-100">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                        <input
                            type="text"
                            required
                            className="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-white font-medium text-slate-700"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-white font-medium text-slate-700"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full px-5 py-3.5 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-white font-medium text-slate-700"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white font-bold py-4 px-4 rounded-xl hover:bg-indigo-600 focus:ring-4 focus:ring-indigo-500/20 transition-all shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 mt-8 active:scale-95 duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                
                <p className="mt-8 text-center text-sm font-medium text-slate-500">
                    Already have an account?{' '}
                    <Link to="/login" className="text-indigo-600 font-bold hover:text-indigo-500 transition-colors">
                        Log in
                    </Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Register;
