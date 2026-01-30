"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { useAetherStore } from "@/app/hooks/use-store";

interface SectionProps {
    children: React.ReactNode;
    index: number;
    className?: string;
}

export function Section({ children, index, className = "" }: SectionProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-50% 0px -50% 0px" });
    const setSection = useAetherStore((state) => state.setSection);

    useEffect(() => {
        if (isInView) {
            setSection(index);
        }
    }, [isInView, index, setSection]);

    return (
        <section
            ref={ref}
            className={`min-h-screen flex flex-col items-center justify-center p-6 md:p-24 relative z-10 ${className}`}
        >
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full max-w-7xl"
            >
                {children}
            </motion.div>
        </section>
    );
}
