import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CheckCircle2, Clock, AlertCircle, Plus, LayoutDashboard } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [stats, setStats] = useState({ completed: 0, pending: 0, inProgress: 0, total: 0 });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res = await api.get('/tasks');
                setTasks(res.data);
                
                const completed = res.data.filter(t => t.status === 'completed').length;
                const pending = res.data.filter(t => t.status === 'pending').length;
                const inProgress = res.data.filter(t => t.status === 'in-progress').length;
                
                setStats({
                    completed,
                    pending,
                    inProgress,
                    total: res.data.length
                });
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, []);

    const COLORS = ['#10B981', '#F59E0B', '#8B5CF6'];
    const data = [
        { name: 'Completed', value: stats.completed },
        { name: 'Pending', value: stats.pending },
        { name: 'In Progress', value: stats.inProgress },
    ];

    const StatCard = ({ title, value, icon: Icon, colorClass, delay }) => (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay }}
            className="glass-card p-6 rounded-3xl flex items-center gap-5 relative overflow-hidden group"
        >
            <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 group-hover:scale-150 transition-transform duration-700 ${colorClass.bg}`}></div>
            <div className={`${colorClass.bg} p-4 rounded-2xl shadow-inner`}>
                <Icon className={`h-8 w-8 ${colorClass.text}`} />
            </div>
            <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">{title}</p>
                <p className="text-4xl font-black text-slate-800">{value}</p>
            </div>
        </motion.div>
    );

    return (
        <div className="space-y-8 pb-10">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-8 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="bg-indigo-100 p-2 rounded-lg">
                            <LayoutDashboard className="text-indigo-600 w-6 h-6" />
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
                    </div>
                    <p className="text-slate-500 text-lg ml-11">Track your progress and stay on top of your goals.</p>
                </div>
                <Link
                    to="/tasks"
                    className="bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 active:scale-95 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Manage Tasks
                </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Tasks" value={stats.total} icon={CheckCircle2} colorClass={{bg: 'bg-blue-100', text: 'text-blue-600'}} delay={0.1} />
                <StatCard title="Completed" value={stats.completed} icon={CheckCircle2} colorClass={{bg: 'bg-emerald-100', text: 'text-emerald-600'}} delay={0.2} />
                <StatCard title="Pending" value={stats.pending} icon={Clock} colorClass={{bg: 'bg-amber-100', text: 'text-amber-600'}} delay={0.3} />
                <StatCard title="In Progress" value={stats.inProgress} icon={AlertCircle} colorClass={{bg: 'bg-violet-100', text: 'text-violet-600'}} delay={0.4} />
            </div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="glass-card p-8 rounded-3xl"
            >
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold text-slate-800">Task Status Distribution</h2>
                    <div className="px-4 py-1.5 bg-slate-100 rounded-lg text-sm font-bold text-slate-600">Total: {stats.total}</div>
                </div>
                <div className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                innerRadius={100}
                                outerRadius={140}
                                paddingAngle={8}
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} className="hover:opacity-80 transition-opacity outline-none" />
                                ))}
                            </Pie>
                            <Tooltip 
                                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)', padding: '12px 20px', fontWeight: 'bold' }}
                                itemStyle={{ color: '#1E293B' }}
                            />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontWeight: '600', color: '#64748B' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
};

export default Dashboard;
