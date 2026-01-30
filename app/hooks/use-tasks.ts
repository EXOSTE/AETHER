import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Task {
    id: string;
    content: string;
    status: 'todo' | 'in-progress' | 'done';
    createdAt: number;
}

interface TaskState {
    tasks: Task[];
    addTask: (content: string) => void;
    updateTaskStatus: (id: string, status: Task['status']) => void;
    deleteTask: (id: string) => void;
}

export const useTaskStore = create<TaskState>()(
    persist(
        (set) => ({
            tasks: [
                { id: '1', content: 'Initialize Aether Protocol', status: 'done', createdAt: Date.now() },
                { id: '2', content: 'Define Vision', status: 'done', createdAt: Date.now() },
                { id: '3', content: 'Achieve Singularity', status: 'todo', createdAt: Date.now() },
            ],
            addTask: (content) =>
                set((state) => ({
                    tasks: [
                        { id: crypto.randomUUID(), content, status: 'todo', createdAt: Date.now() },
                        ...state.tasks,
                    ],
                })),
            updateTaskStatus: (id, status) =>
                set((state) => ({
                    tasks: state.tasks.map((t) => (t.id === id ? { ...t, status } : t)),
                })),
            deleteTask: (id) =>
                set((state) => ({
                    tasks: state.tasks.filter((t) => t.id !== id),
                })),
        }),
        {
            name: 'aether-tasks',
        }
    )
);
