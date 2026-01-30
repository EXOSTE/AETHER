import { create } from 'zustand';

interface TimerState {
    timeLeft: number;
    duration: number;
    isActive: boolean;
    mode: 'focus' | 'break';
    startTimer: () => void;
    pauseTimer: () => void;
    resetTimer: () => void;
    setMode: (mode: 'focus' | 'break') => void;
    tick: () => void;
}

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

export const useTimerStore = create<TimerState>((set, get) => ({
    timeLeft: FOCUS_TIME,
    duration: FOCUS_TIME,
    isActive: false,
    mode: 'focus',

    startTimer: () => set({ isActive: true }),
    pauseTimer: () => set({ isActive: false }),
    resetTimer: () => set((state) => ({
        isActive: false,
        timeLeft: state.mode === 'focus' ? FOCUS_TIME : BREAK_TIME,
        duration: state.mode === 'focus' ? FOCUS_TIME : BREAK_TIME
    })),
    setMode: (mode) => set({
        mode,
        isActive: false,
        timeLeft: mode === 'focus' ? FOCUS_TIME : BREAK_TIME,
        duration: mode === 'focus' ? FOCUS_TIME : BREAK_TIME
    }),
    tick: () => set((state) => {
        if (state.timeLeft <= 0) {
            return { isActive: false, timeLeft: 0 };
        }
        return { timeLeft: state.timeLeft - 1 };
    }),
}));
