"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAetherStore } from "@/app/hooks/use-store";

const vertexShader = `
uniform float uTime;
varying vec2 vUv;
varying float vDisplacement;

// Classic Perlin 3D Noise 
// (Simplified for performance, usually imported from a library in glsl)
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;
  const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy) );
  vec3 x0 = v - i + dot(i, C.xxx) ;
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min( g.xyz, l.zxy );
  vec3 i2 = max( g.xyz, l.zxy );
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute( permute( permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));
  float n_ = 0.142857142857;
  vec3  ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_ );
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4( x.xy, y.xy );
  vec4 b1 = vec4( x.zw, y.zw );
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww ;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot( m*m, vec4( dot(p0,x0), dot(p1,x1),
                                dot(p2,x2), dot(p3,x3) ) );
}

void main() {
  vUv = uv;
  
  // Dynamic noise displacement
  vec3 pos = position;
  float noiseFreq = 1.5;
  float noiseAmp = 0.25; 
  vec3 noisePos = vec3(pos.x * noiseFreq + uTime * 0.5, pos.y * noiseFreq + uTime * 0.3, pos.z * noiseFreq);
  
  float n = snoise(noisePos);
  vDisplacement = n;
  
  vec3 newPos = pos + normal * n * noiseAmp;
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPos, 1.0);
}
`;

const fragmentShader = `
uniform float uTime;
varying vec2 vUv;
varying float vDisplacement;

void main() {
  // Deep space colors
  vec3 colorA = vec3(0.02, 0.0, 0.08); // Deep black-blue
  vec3 colorB = vec3(0.38, 0.0, 0.92); // Electric Indigo
  vec3 colorC = vec3(0.0, 0.89, 1.0);  // Cyan highlights

  // Mix based on displacement
  float mixStrength = smoothstep(-0.2, 0.5, vDisplacement);
  vec3 finalColor = mix(colorA, colorB, mixStrength);
  finalColor = mix(finalColor, colorC, smoothstep(0.4, 1.0, vDisplacement) * 0.5);

  // Simple fresnel-like glow
  float glow = 0.05 / (0.01 + abs(vDisplacement - 0.5)); // Adds 'hot' spots
  
  gl_FragColor = vec4(finalColor + glow * 0.1, 1.0);
}
`;

export default function AetherCore() {
    const mesh = useRef<THREE.Mesh>(null);

    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
        }),
        []
    );

    useFrame((state) => {
        const { clock } = state;
        if (mesh.current) {
            (mesh.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
            mesh.current.rotation.y = clock.getElapsedTime() * 0.1;
            mesh.current.rotation.x = clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <mesh ref={mesh} scale={2}>
            <icosahedronGeometry args={[1, 64]} />
            <shaderMaterial
                fragmentShader={fragmentShader}
                vertexShader={vertexShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}
