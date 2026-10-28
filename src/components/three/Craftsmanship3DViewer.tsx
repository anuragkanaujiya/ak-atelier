'use client';

import React, { Suspense, useState, useRef } from 'react';
import dynamic from 'next/dynamic';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';
import { Sparkles, X } from 'lucide-react';

interface Hotspot {
  id: string;
  position: [number, number, number];
  title: string;
  subtitle: string;
  description: string;
}

const HOTSPOTS: Hotspot[] = [
  {
    id: 'cashmere-warp',
    position: [0.6, 0.4, 0.25],
    title: 'Grade-A Mongolian Cashmere Warp',
    subtitle: 'Atelier Spinning Mill',
    description: 'Ultralight 14-micron virgin cashmere fibers, spun into high-twist yarns offering incomparable warmth and featherweight softness.',
  },
  {
    id: 'hand-rolled-edges',
    position: [-0.5, -0.3, 0.3],
    title: 'Hand-Rolled Silk Edges',
    subtitle: 'Florentine Craft Guild',
    description: 'Meticulously rolled and whip-stitched by hand with silk thread, yielding a discreet, supple border found exclusively in grand luxury couture.',
  },
  {
    id: 'satin-weave',
    position: [0.1, -0.7, 0.2],
    title: 'High-Density Silk Satin Weave',
    subtitle: 'Lyonnaise Jacquard Loom',
    description: 'Woven on historical looms with over 400 threads per inch, producing an architectural drape with quiet liquid luster.',
  },
];

const TextileMedallion: React.FC<{
  activeHotspot: Hotspot | null;
  onSelectHotspot: (h: Hotspot) => void;
}> = ({ activeHotspot, onSelectHotspot }) => {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    if (!activeHotspot) {
      meshRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Central Brocade Medallion Plaque */}
      <mesh castShadow receiveShadow rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.6, 1.6, 0.12, 64]} />
        <meshStandardMaterial
          color="#40384F" // Primary Plum-Charcoal
          roughness={0.55}
          metalness={0.3}
        />
      </mesh>

      {/* Outer Filigree Ring */}
      <mesh position={[0, 0, 0.08]}>
        <torusGeometry args={[1.56, 0.06, 16, 64]} />
        <meshStandardMaterial
          color="#B5A9D1"
          metalness={0.92}
          roughness={0.15}
        />
      </mesh>

      {/* Secondary Inner Ring */}
      <mesh position={[0, 0, 0.09]}>
        <torusGeometry args={[1.1, 0.04, 16, 48]} />
        <meshStandardMaterial
          color="#9A8EBA"
          metalness={0.88}
          roughness={0.2}
        />
      </mesh>

      {/* Raised Embroidered Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = Math.cos(rad) * 0.65;
        const y = Math.sin(rad) * 0.65;
        return (
          <mesh
            key={i}
            position={[x, y, 0.1]}
            rotation={[0, 0, rad]}
          >
            <coneGeometry args={[0.18, 0.45, 16]} />
            <meshStandardMaterial
              color="#CFC7E3"
              metalness={0.85}
              roughness={0.25}
            />
          </mesh>
        );
      })}

      {/* Center Royal Crest Gem */}
      <mesh position={[0, 0, 0.14]}>
        <octahedronGeometry args={[0.22]} />
        <meshStandardMaterial
          color="#587A8E" // Glacier Sapphire
          metalness={0.3}
          roughness={0.15}
        />
      </mesh>

      {/* Surrounding Seed Pearls */}
      {[...Array(16)].map((_, i) => {
        const rad = (i * Math.PI * 2) / 16;
        const x = Math.cos(rad) * 0.35;
        const y = Math.sin(rad) * 0.35;
        return (
          <mesh key={i} position={[x, y, 0.12]}>
            <sphereGeometry args={[0.035, 12, 12]} />
            <meshStandardMaterial
              color="#FAF8FC"
              metalness={0.1}
              roughness={0.2}
            />
          </mesh>
        );
      })}

      {/* Interactive 3D Hotspot Pins */}
      {HOTSPOTS.map((hotspot) => {
        const isSelected = activeHotspot?.id === hotspot.id;
        return (
          <group
            key={hotspot.id}
            position={hotspot.position}
            onClick={(e) => {
              e.stopPropagation();
              onSelectHotspot(hotspot);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              if (typeof document !== 'undefined') document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              if (typeof document !== 'undefined') document.body.style.cursor = 'auto';
            }}
          >
            {/* Glowing outer halo */}
            <mesh>
              <sphereGeometry args={[isSelected ? 0.12 : 0.085, 16, 16]} />
              <meshBasicMaterial
                color={isSelected ? '#E4DFF0' : '#B5A9D1'}
                transparent
                opacity={isSelected ? 0.65 : 0.3}
              />
            </mesh>

            {/* Central bright marker pin */}
            <mesh scale={isSelected ? 1.25 : 1.0}>
              <sphereGeometry args={[0.065, 16, 16]} />
              <meshStandardMaterial
                color={isSelected ? '#FFFFFF' : '#CFC7E3'}
                emissive={isSelected ? '#E4DFF0' : '#B5A9D1'}
                emissiveIntensity={isSelected ? 1.4 : 0.8}
                metalness={0.4}
                roughness={0.2}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

const CraftsmanshipSceneContent: React.FC = () => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(HOTSPOTS[0]);

  return (
    <div className="relative w-full h-[520px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#242129] via-[#34313B] to-[#242129] border border-primary-400/25 shadow-2xl">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} color="#40384F" />
        <spotLight
          position={[3, 4, 4]}
          intensity={2.6}
          color="#FAF8FC"
          angle={0.5}
          penumbra={0.8}
        />
        <pointLight position={[-3, -2, 2]} intensity={1.5} color="#B5A9D1" />
        <directionalLight position={[0, 0, 4]} intensity={0.9} color="#FFFFFF" />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.1}>
            <TextileMedallion
              activeHotspot={activeHotspot}
              onSelectHotspot={setActiveHotspot}
            />
          </Float>
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={2.5}
            maxDistance={5.0}
            dampingFactor={0.05}
          />
        </Suspense>
      </Canvas>

      {/* Top Banner Control */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
        <div className="flex items-center gap-2 bg-neutral-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-primary-400/30 text-xs text-primary-200">
          <Sparkles className="w-3.5 h-3.5 text-primary-300" />
          <span>Interactive 3D Textile Specimen</span>
        </div>
        <span className="text-xs text-neutral-400 hidden sm:block">
          Click markers or tabs to inspect
        </span>
      </div>

      {/* Hotspot Selection Pills */}
      <div className="absolute top-14 left-4 right-4 flex flex-wrap gap-2 z-10 pointer-events-auto">
        {HOTSPOTS.map((hotspot) => {
          const isSelected = activeHotspot?.id === hotspot.id;
          return (
            <button
              key={hotspot.id}
              onClick={() => setActiveHotspot(hotspot)}
              className={`px-3 py-1 rounded-full text-[11px] font-nav uppercase tracking-wider transition-all duration-200 border cursor-pointer ${
                isSelected
                  ? 'bg-primary-600 text-white border-primary-600 font-semibold shadow-md scale-105'
                  : 'bg-neutral-900/85 text-surface-200 border-neutral-700 hover:border-primary-400 backdrop-blur-sm'
              }`}
            >
              {hotspot.title}
            </button>
          );
        })}
      </div>

      {/* Active Hotspot Detail Overlay Card */}
      {activeHotspot && (
        <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md bg-neutral-900/95 backdrop-blur-md p-5 rounded-xl border border-primary-400/40 shadow-2xl text-left z-20 transition-all animate-fadeIn">
          <div className="flex items-start justify-between gap-3 mb-1">
            <div>
              <span className="text-[10px] tracking-widest uppercase font-nav text-primary-300">
                {activeHotspot.subtitle}
              </span>
              <h4 className="text-lg font-serif text-white font-medium">
                {activeHotspot.title}
              </h4>
            </div>
            <button
              onClick={() => setActiveHotspot(null)}
              className="text-neutral-400 hover:text-white p-1"
              aria-label="Close detail"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-neutral-300 leading-relaxed font-sans mt-2">
            {activeHotspot.description}
          </p>
        </div>
      )}
    </div>
  );
};

export const Craftsmanship3DViewer = dynamic(
  () => Promise.resolve(CraftsmanshipSceneContent),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] rounded-2xl bg-neutral-900 flex items-center justify-center border border-primary-400/20">
        <div className="w-10 h-10 border-2 border-primary-400 border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);
