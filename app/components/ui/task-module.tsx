"use client";

import { useState } from 'react';
import { useTaskStore, Task } from '@/app/hooks/use-tasks';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Circle, Plus, Trash2, X } from 'lucide-react';

export function TaskModule() {
    const { tasks, addTask, updateTaskStatus, deleteTask } = useTaskStore();
    const [newTask, setNewTask] = useState('');

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTask.trim()) return;
        addTask(newTask);
        setNewTask('');
    };

    const activeTasks = tasks.filter(t => t.status !== 'done');
    const completedTasks = tasks.filter(t => t.status === 'done');

    return (
        <div className="w-full max-w-2xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-display tracking-wide text-white">NEURAL NET</h3>
                <span className="text-xs font-mono text-white/50 uppercase tracking-widest">
                    {activeTasks.length} Active / {completedTasks.length} Done
                </span>
            </div>

            <form onSubmit={handleAdd} className="relative mb-8 group">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="New Directive..."
                    className="w-full bg-transparent border-b border-white/20 py-4 text-lg text-white placeholder-white/20 focus:outline-none focus:border-indigo-500 transition-colors font-light"
                />
                <button
                    type="submit"
                    className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-focus-within:opacity-100 transition-opacity text-indigo-400 hover:text-indigo-300"
                >
                    <Plus size={24} />
                </button>
            </form>

            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                <AnimatePresence mode="popLayout">
                    {tasks.map((task) => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggle={() => updateTaskStatus(task.id, task.status === 'done' ? 'todo' : 'done')}
                            onDelete={() => deleteTask(task.id)}
                        />
                    ))}
                </AnimatePresence>

                {tasks.length === 0 && (
                    <div className="text-center py-12 text-white/20 font-mono text-xs">
                        SYSTEM IDLE. AWAITING INPUT.
                    </div>
                )}
            </div>
        </div>
    );
}

function TaskItem({ task, onToggle, onDelete }: { task: Task; onToggle: () => void; onDelete: () => void }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`group flex items-center gap-4 p-4 rounded-xl transition-colors ${task.status === 'done' ? 'bg-white/5 opacity-50' : 'bg-white/10 hover:bg-white/15'
                }`}
        >
            <button
                onClick={onToggle}
                className={`shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-all ${task.status === 'done'
                        ? 'border-indigo-500 bg-indigo-500 text-white'
                        : 'border-white/30 text-transparent hover:border-white/60'
                    }`}
            >
                <Check size={14} />
            </button>

            <span className={`flex-grow font-sans text-sm md:text-base transition-all ${task.status === 'done' ? 'line-through text-white/30' : 'text-white/90'
                }`}>
                {task.content}
            </span>

            <button
                onClick={onDelete}
                className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-300 transition-opacity p-2"
            >
                <Trash2 size={16} />
            </button>
        </motion.div>
    );
}
