import { format } from 'date-fns';
import { Pencil, Trash2, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskCard = ({ task, onEdit, onDelete }) => {
    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'high': return 'bg-rose-50 text-rose-600 border-rose-200/60 shadow-sm shadow-rose-100';
            case 'medium': return 'bg-amber-50 text-amber-600 border-amber-200/60 shadow-sm shadow-amber-100';
            case 'low': return 'bg-sky-50 text-sky-600 border-sky-200/60 shadow-sm shadow-sky-100';
            default: return 'bg-slate-50 text-slate-600 border-slate-200/60';
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
            case 'in-progress': return <Clock className="w-4 h-4 text-indigo-500" />;
            default: return <Clock className="w-4 h-4 text-slate-400" />;
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-5 rounded-2xl group relative overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-violet-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            
            <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-1 pr-16">{task.title}</h3>
                <div className="absolute top-4 right-4 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 bg-white/80 backdrop-blur-sm p-1 rounded-lg border border-slate-100">
                    <button onClick={() => onEdit(task)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors">
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => onDelete(task._id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <p className="text-slate-500 text-sm mb-5 line-clamp-2 min-h-[40px] leading-relaxed">{task.description}</p>

            <div className="flex flex-wrap gap-2.5 mb-5">
                <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full border uppercase tracking-wider ${getPriorityColor(task.priority)}`}>
                    {task.priority}
                </span>
                <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 capitalize shadow-sm">
                    {getStatusIcon(task.status)}
                    {task.status.replace('-', ' ')}
                </span>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100/80">
                <div className="flex justify-between text-sm items-center">
                    <span className="text-slate-500 font-medium flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                        Progress
                    </span>
                    <span className="text-slate-900 font-bold bg-slate-100 px-2 py-0.5 rounded-md">{task.progress}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
                    <div 
                        className={`h-full rounded-full transition-all duration-1000 ease-out relative ${task.progress === 100 ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-violet-500'}`}
                        style={{ width: `${task.progress}%` }}
                    >
                        <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
                    </div>
                </div>
                
                {task.deadline && (
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500 mt-3 bg-slate-50 w-fit px-3 py-1.5 rounded-lg border border-slate-100">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Due {format(new Date(task.deadline), 'MMM dd, yyyy')}</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default TaskCard;
