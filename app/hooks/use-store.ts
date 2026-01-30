import { create } from 'zustand'

interface AetherState {
    currentSection: number;
    scrollProgress: number;
    setSection: (index: number) => void;
    setScrollProgress: (progress: number) => void;
}

export const useAetherStore = create<AetherState>((set) => ({
    currentSection: 0,
    scrollProgress: 0,
    setSection: (index) => set({ currentSection: index }),
    setScrollProgress: (progress) => set({ scrollProgress: progress }),
}))
