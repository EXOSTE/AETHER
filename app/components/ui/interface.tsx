"use client";

import { useAetherStore } from "@/app/hooks/use-store";
import { motion } from "framer-motion";

export function Interface() {
    const currentSection = useAetherStore((state) => state.currentSection);

    const sections = ["01 . ORIGIN", "02 . MANIFESTO", "03 . ARCHITECTURE", "04 . FUTURE"];

    return (
        <div className="fixed inset-0 pointer-events-none z-50 p-6 md:p-12 flex flex-col justify-between mix-blend-difference text-white">
            {/* Top Bar */}
            <div className="flex justify-between items-start">
                <div className="flex flex-col">
                    <span className="font-display tracking-widest text-lg">AETHER</span>
                    <span className="text-[10px] uppercase tracking-[0.2em] opacity-50">v1.0.0 [BETA]</span>
                </div>
                <div className="text-right">
                    <span className="font-mono text-xs opacity-50 block">SYSTEM STATUS</span>
                    <span className="font-mono text-xs text-green-400 block">ONLINE</span>
                </div>
            </div>

            {/* Side Navigation */}
            <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden md:flex flex-col gap-4">
                {sections.map((label, idx) => (
                    <div key={idx} className="flex items-center gap-4 justify-end">
                        <span className={`text-[10px] tracking-widest transition-opacity duration-300 ${currentSection === idx ? 'opacity-100' : 'opacity-0'}`}>
                            {label}
                        </span>
                        <div
                            className={`w-1 h-1 rounded-full transition-all duration-500 ${currentSection === idx ? 'bg-white scale-150' : 'bg-white/20'}`}
                        />
                    </div>
                ))}
            </div>

            {/* Bottom Bar */}
            <div className="flex justify-between items-end">
                <div className="font-mono text-[10px] opacity-30 max-w-[200px]">
                    EST. 2026<br />
                    DESIGNED FOR THE NEXT WEB
                </div>
                <div className="font-mono text-xs">
                    <span className="opacity-50">SCROLL TO EXPLORE</span>
                </div>
            </div>
        </div>
    );
}
