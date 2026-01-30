"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";

export default function Scene({ children, className, ...props }: any) {
    return (
        <div className={className}>
            <Canvas {...props} dpr={[1, 2]}>
                {children}
                <Preload all />
            </Canvas>
        </div>
    );
}
