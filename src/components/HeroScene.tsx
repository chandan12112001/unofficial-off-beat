import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Particle system that forms the OFF/BEAT text
function ParticleField({ scrollProgress }: { scrollProgress: number }) {
  const meshRef = useRef<THREE.Points>(null);
  const count = 3000;

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15;
      speeds[i] = 0.3 + Math.random() * 0.7;
    }
    return { positions, speeds };
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.rotation.y = time * 0.03;
    meshRef.current.rotation.x = time * 0.01;

    // Scroll-based scatter
    const posArray = (meshRef.current.geometry.attributes.position as THREE.BufferAttribute).array as Float32Array;
    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      posArray[idx + 1] += Math.sin(time * speeds[i] + i) * 0.002;
    }
    (meshRef.current.geometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#6378ff"
        transparent
        opacity={0.4 - scrollProgress * 0.3}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// Ambient glowing orbs
function GlowOrbs() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.08;
    group.current.rotation.z = t * 0.04;
  });

  const orbData = useMemo(() => [
    { pos: [3, 2, -4] as [number,number,number], scale: 1.8, color: '#6378ff', speed: 1 },
    { pos: [-3.5, -1.5, -6] as [number,number,number], scale: 2.4, color: '#a78bfa', speed: 0.7 },
    { pos: [0, -3, -8] as [number,number,number], scale: 3, color: '#3b52cc', speed: 1.3 },
    { pos: [5, 0, -10] as [number,number,number], scale: 2, color: '#7c3aed', speed: 0.9 },
  ], []);

  return (
    <group ref={group}>
      {orbData.map((orb, i) => (
        <Float key={i} speed={orb.speed} rotationIntensity={0.2} floatIntensity={0.5}>
          <mesh position={orb.pos}>
            <sphereGeometry args={[orb.scale, 16, 16]} />
            <MeshDistortMaterial
              color={orb.color}
              transparent
              opacity={0.06}
              distort={0.4}
              speed={2}
              roughness={0}
              metalness={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Main logo plane with shader material
function LogoPlane({ mouseX, mouseY, scrollProgress }: { mouseX: number; mouseY: number; scrollProgress: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const shader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uColor1: { value: new THREE.Color('#6378ff') },
      uColor2: { value: new THREE.Color('#a78bfa') },
    },
    vertexShader: `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uScroll;
      varying vec2 vUv;
      varying float vNoise;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
      }

      void main() {
        vUv = uv;
        vec3 pos = position;
        float n = noise(uv * 4.0 + uTime * 0.3);
        vNoise = n;
        pos.z += n * 0.3 * (1.0 - uScroll);
        pos.x += uMouse.x * 0.5;
        pos.y += uMouse.y * 0.5;
        pos.z += uScroll * 5.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uScroll;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      varying vec2 vUv;
      varying float vNoise;

      void main() {
        vec2 uv = vUv;
        float dist = distance(uv, vec2(0.5));
        float glow = 1.0 - smoothstep(0.0, 0.5, dist);
        vec3 col = mix(uColor1, uColor2, vNoise);
        float alpha = glow * 0.3 * (1.0 - uScroll * 0.8);
        gl_FragColor = vec4(col, alpha);
      }
    `,
  }), []);

  useFrame((state) => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    materialRef.current.uniforms.uMouse.value.set(mouseX * 0.3, mouseY * 0.3);
    materialRef.current.uniforms.uScroll.value += (scrollProgress - materialRef.current.uniforms.uScroll.value) * 0.05;

    if (meshRef.current) {
      meshRef.current.rotation.x += (-mouseY * 0.3 - meshRef.current.rotation.x) * 0.05;
      meshRef.current.rotation.y += (mouseX * 0.3 - meshRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[10, 6, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        args={[shader]}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Camera parallax
function CameraRig({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const { camera } = useThree();

  useFrame(() => {
    camera.position.x += (mouseX * 1.5 - camera.position.x) * 0.04;
    camera.position.y += (-mouseY * 1.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Ring geometry
function CinematicRings() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.x = state.clock.elapsedTime * 0.1;
    group.current.rotation.z = state.clock.elapsedTime * 0.05;
  });

  return (
    <group ref={group}>
      {[4, 6, 8].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.3, 0, i * 0.5]}>
          <torusGeometry args={[r, 0.01, 4, 120]} />
          <meshBasicMaterial
            color={i === 0 ? '#6378ff' : '#a78bfa'}
            transparent
            opacity={0.08 - i * 0.02}
          />
        </mesh>
      ))}
    </group>
  );
}

interface HeroSceneProps {
  mouseX: number;
  mouseY: number;
  scrollProgress: number;
}

export default function HeroScene({ mouseX, mouseY, scrollProgress }: HeroSceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 55 }}
      style={{ background: 'transparent' }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      dpr={[1, 1.5]}
    >
      <fog attach="fog" args={['#080808', 15, 40]} />
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#6378ff" />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#a78bfa" />

      <CameraRig mouseX={mouseX} mouseY={mouseY} />
      <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
      <GlowOrbs />
      <ParticleField scrollProgress={scrollProgress} />
      <LogoPlane mouseX={mouseX} mouseY={mouseY} scrollProgress={scrollProgress} />
      <CinematicRings />
    </Canvas>
  );
}
