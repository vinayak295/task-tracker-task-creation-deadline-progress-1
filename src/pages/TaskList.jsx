import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import api from '../api/axios';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import { Plus, Search, Filter, GripHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const fetchTasks = async () => {
        try {
            const res = await api.get(`/tasks?search=${search}&priority=${priorityFilter}`);
            setTasks(res.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [search, priorityFilter]);

    const handleCreateOrUpdate = async (taskData) => {
        try {
            if (editingTask) {
                await api.put(`/tasks/${editingTask._id}`, taskData);
            } else {
                await api.post('/tasks', taskData);
            }
            setIsFormOpen(false);
            setEditingTask(null);
            fetchTasks();
        } catch (error) {
            console.error("Error saving task:", error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await api.delete(`/tasks/${id}`);
                fetchTasks();
            } catch (error) {
                console.error("Error deleting task:", error);
            }
        }
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;

        if (source.droppableId !== destination.droppableId) {
            const task = tasks.find(t => t._id === draggableId);
            const newStatus = destination.droppableId;
            
            // Optimistic update
            const newTasks = tasks.map(t => {
                if (t._id === draggableId) {
                    return { ...t, status: newStatus, progress: newStatus === 'completed' ? 100 : t.progress };
                }
                return t;
            });
            setTasks(newTasks);

            try {
                await api.put(`/tasks/${draggableId}`, { 
                    ...task, 
                    status: newStatus,
                    progress: newStatus === 'completed' ? 100 : task.progress
                });
            } catch (error) {
                console.error("Error updating task status:", error);
                fetchTasks(); // Revert on failure
            }
        }
    };

    const columns = {
        'pending': { title: 'Pending', color: 'border-amber-200 bg-amber-50/50', headerColor: 'text-amber-700 bg-amber-100/50' },
        'in-progress': { title: 'In Progress', color: 'border-indigo-200 bg-indigo-50/50', headerColor: 'text-indigo-700 bg-indigo-100/50' },
        'completed': { title: 'Completed', color: 'border-emerald-200 bg-emerald-50/50', headerColor: 'text-emerald-700 bg-emerald-100/50' }
    };

    return (
        <div className="space-y-8 pb-10">
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass p-8 rounded-3xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
            >
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Tasks Board</h1>
                    <p className="text-slate-500 mt-2 text-lg">Manage your tasks and track progress seamlessly</p>
                </div>
                <button
                    onClick={() => { setEditingTask(null); setIsFormOpen(true); }}
                    className="bg-slate-900 hover:bg-indigo-600 text-white px-6 py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 active:scale-95 flex items-center gap-2"
                >
                    <Plus className="w-5 h-5" />
                    Add New Task
                </button>
            </motion.div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="glass-card p-5 rounded-2xl flex flex-col md:flex-row gap-5"
            >
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search tasks by title..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all bg-white font-medium text-slate-700 placeholder:text-slate-400"
                    />
                </div>
                <div className="relative min-w-[240px]">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 z-10" />
                    <select
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border-2 border-slate-100 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none transition-all bg-white font-medium text-slate-700 appearance-none cursor-pointer"
                    >
                        <option value="">All Priorities</option>
                        <option value="high">High Priority</option>
                        <option value="medium">Medium Priority</option>
                        <option value="low">Low Priority</option>
                    </select>
                </div>
            </motion.div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    {Object.entries(columns).map(([statusId, config], index) => (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (index * 0.1) }}
                            key={statusId} 
                            className={`p-5 rounded-3xl border-2 ${config.color} min-h-[500px] flex flex-col backdrop-blur-xl shadow-sm`}
                        >
                            <div className={`flex items-center justify-between mb-6 px-4 py-3 rounded-2xl ${config.headerColor}`}>
                                <h2 className="font-bold text-lg">{config.title}</h2>
                                <span className="bg-white/80 px-3 py-1 rounded-full text-sm font-black shadow-sm">
                                    {tasks.filter(t => t.status === statusId).length}
                                </span>
                            </div>
                            
                            <Droppable droppableId={statusId}>
                                {(provided, snapshot) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        className={`flex-grow space-y-4 rounded-2xl transition-colors duration-300 ${snapshot.isDraggingOver ? 'bg-white/50 ring-4 ring-white/50' : ''}`}
                                    >
                                        {tasks
                                            .filter(task => task.status === statusId)
                                            .map((task, index) => (
                                                <Draggable key={task._id} draggableId={task._id} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            className="relative group/drag"
                                                            style={{
                                                                ...provided.draggableProps.style,
                                                                transform: snapshot.isDragging ? provided.draggableProps.style.transform : 'translate(0px, 0px)',
                                                            }}
                                                        >
                                                            <div 
                                                                {...provided.dragHandleProps} 
                                                                className="absolute top-4 left-1/2 -translate-x-1/2 z-10 opacity-0 group-hover/drag:opacity-100 transition-opacity cursor-grab active:cursor-grabbing bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200 shadow-sm"
                                                            >
                                                                <GripHorizontal className="w-4 h-4 text-slate-400" />
                                                            </div>
                                                            <div className={snapshot.isDragging ? 'shadow-2xl ring-4 ring-indigo-500/20 rounded-2xl rotate-2 transition-transform' : ''}>
                                                                <TaskCard
                                                                    task={task}
                                                                    onEdit={(task) => { setEditingTask(task); setIsFormOpen(true); }}
                                                                    onDelete={handleDelete}
                                                                />
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </motion.div>
                    ))}
                </div>
            </DragDropContext>

            {isFormOpen && (
                <TaskForm
                    onSubmit={handleCreateOrUpdate}
                    onClose={() => { setIsFormOpen(false); setEditingTask(null); }}
                    initialData={editingTask}
                />
            )}
        </div>
    );
};

export default TaskList;
