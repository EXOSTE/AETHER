"use client";

import { useEffect } from 'react';
import { useTimerStore } from '@/app/hooks/use-timer';
import { motion } from 'framer-motion';
import { Play, Pause, RefreshCw } from 'lucide-react';

export function FocusModule() {
    const { timeLeft, duration, isActive, mode, startTimer, pauseTimer, resetTimer, setMode, tick } = useTimerStore();

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && timeLeft > 0) {
            interval = setInterval(tick, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, tick]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = (timeLeft / duration) * 100;

    return (
        <div className="w-full max-w-md mx-auto aspect-square rounded-full backdrop-blur-xl bg-white/5 border border-white/10 flex flex-col items-center justify-center relative group">

            {/* Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-4">
                <circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    className="stroke-white/10 fill-none"
                    strokeWidth="2"
                />
                <motion.circle
                    cx="50%"
                    cy="50%"
                    r="45%"
                    className={`fill-none ${mode === 'focus' ? 'stroke-indigo-500' : 'stroke-cyan-400'}`}
                    strokeWidth="4"
                    strokeLinecap="round"
                    initial={{ pathLength: 1 }}
                    animate={{ pathLength: progress / 100 }}
                    transition={{ duration: 1, ease: "linear" }}
                />
            </svg>

            <div className="z-10 flex flex-col items-center gap-6">
                <div className="flex gap-4 mb-2">
                    <button
                        onClick={() => setMode('focus')}
                        className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full transition-all ${mode === 'focus' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
                    >
                        Focus
                    </button>
                    <button
                        onClick={() => setMode('break')}
                        className={`text-xs uppercase tracking-widest px-3 py-1 rounded-full transition-all ${mode === 'break' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
                    >
                        Break
                    </button>
                </div>

                <div className="font-display text-8xl md:text-9xl text-white tracking-tighter">
                    {formatTime(timeLeft)}
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={isActive ? pauseTimer : startTimer}
                        className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform"
                    >
                        {isActive ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
                    </button>
                    <button
                        onClick={resetTimer}
                        className="w-16 h-16 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                        <RefreshCw size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}
