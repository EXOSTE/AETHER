"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Section } from "@/app/components/ui/section";
import { Interface } from "@/app/components/ui/interface";
import { TaskModule } from "@/app/components/ui/task-module";
import { FocusModule } from "@/app/components/ui/focus-module";
import { OmniscienceModule } from "@/app/components/ui/omniscience-module";

const Scene = dynamic(() => import("@/app/components/canvas/scene"), { ssr: false });
const AetherCore = dynamic(() => import("@/app/components/canvas/aether-core"), { ssr: false });

export default function Home() {
  // We redefine the home to be a functional scrolling OS
  return (
    <main className="relative bg-black text-white selection:bg-indigo-500/30 font-sans">

      {/* 3D Background Layer - Persistent */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Scene className="w-full h-full">
          <Suspense fallback={null}>
            <AetherCore />
            <ambientLight intensity={0.5} />
          </Suspense>
        </Scene>
      </div>

      {/* UI Interface Overlay - Persistent */}
      <Interface />

      {/* Scrollable Content Layers */}
      <div className="relative z-10">

        {/* VIEW 01: ORIGIN (Ident) */}
        <Section index={0} className="h-screen snap-center">
          <div className="flex flex-col items-center gap-6 mix-blend-difference text-center">
            <h1 className="font-display text-8xl md:text-9xl tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 animate-in fade-in zoom-in duration-1000">
              AETHER
            </h1>

            {/* Creator Badge */}
            <a
              href="https://lvyweb.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer animate-in fade-in slide-in-from-top-4 duration-1000 delay-200"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-indigo-300/70 group-hover:text-indigo-300 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all">
                Architected by LVY
              </span>
            </a>

            <p className="font-sans text-xs md:text-sm tracking-[0.8em] text-white/60 uppercase animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
              Operating System v1.0
            </p>
            <div className="mt-12 animate-bounce opacity-50">
              <span className="text-[10px] tracking-widest uppercase">Scroll to Unlock</span>
            </div>
          </div>
        </Section>

        {/* VIEW 02: NEURAL NET (Tasks) */}
        <Section index={1} className="min-h-screen snap-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mix-blend-difference w-full max-w-6xl">
            <div className="order-2 md:order-1 w-full">
              <TaskModule />
            </div>
            <div className="order-1 md:order-2 text-right">
              <h2 className="text-4xl md:text-6xl font-display mb-6 leading-tight">
                Neural <br />
                <span className="italic text-indigo-400">Net.</span>
              </h2>
              <p className="text-lg font-light text-white/80 max-w-md ml-auto">
                Your external cortex. Offload cognitive load.
                Prioritize signals. Execute.
              </p>
            </div>
          </div>
        </Section>

        {/* VIEW 03: TEMPORAL ENGINE (Focus) */}
        <Section index={2} className="min-h-screen snap-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mix-blend-difference w-full max-w-6xl">
            <div className="text-left">
              <h2 className="text-4xl md:text-6xl font-display mb-6 leading-tight">
                Temporal <br />
                <span className="italic text-cyan-400">Engine.</span>
              </h2>
              <p className="text-lg font-light text-white/80 max-w-md">
                Synchronization with the present moment.
                Flow state on demand.
              </p>
            </div>
            <div className="flex justify-center w-full">
              <FocusModule />
            </div>
          </div>
        </Section>

        {/* VIEW 04: OMNISCIENCE (Dashboard) */}
        <Section index={3} className="min-h-screen pb-24 snap-center">
          <div className="flex flex-col items-center w-full max-w-6xl mix-blend-difference">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-display mb-4">
                Global Awareness
              </h2>
              <p className="font-mono text-xs text-white/50 tracking-widest uppercase">
                Live Data Streaming from The Grid
              </p>
            </div>

            <OmniscienceModule />
          </div>
        </Section>

        {/* Footer */}
        <footer className="w-full py-12 flex justify-center border-t border-white/10 relative z-10 bg-black/50 backdrop-blur-md">
          <a
            href="https://lvyweb.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 hover:bg-indigo-500/10 hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-indigo-300/70 group-hover:text-indigo-300 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] transition-all">
              Architected by LVY
            </span>
          </a>
        </footer>

      </div>
    </main>
  );
}
