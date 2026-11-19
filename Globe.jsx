'use client';
import { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const R = 2;
const ll = (lat, lon, r = R) => {
  const phi = ((90 - lat) * Math.PI) / 180, th = ((lon + 180) * Math.PI) / 180;
  return new THREE.Vector3(-r * Math.sin(phi) * Math.cos(th), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(th));
};
// Delhi, Dubai, London, Singapore, New York, Sydney
const HUBS = [[28.6, 77.2], [25.2, 55.3], [51.5, -0.1], [1.35, 103.8], [40.7, -74], [-33.9, 151.2]];

function arc(a, b) {
  const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(R * 1.45);
  return new THREE.QuadraticBezierCurve3(a, mid, b);
}

function Scene() {
  const globe = useRef(), plane = useRef(), stars = useRef();
  const curves = useMemo(() => HUBS.slice(1).map((h, i) => arc(ll(...HUBS[0]), ll(...h))), []);
  const lines = useMemo(() => curves.map((c) => new THREE.Line(new THREE.BufferGeometry().setFromPoints(c.getPoints(60)), new THREE.LineBasicMaterial({ color: '#F59E0B', transparent: true, opacity: 0.7 }))), [curves]);
  const grid = useMemo(() => {
    const pts = [];
    const ring = (f) => { for (let i = 0; i < 64; i++) pts.push(f(i / 64 * Math.PI * 2), f((i + 1) / 64 * Math.PI * 2)); };
    for (let lat = -60; lat <= 60; lat += 30) ring((a) => ll(lat, (a * 180) / Math.PI - 180, R * 1.003));
    for (let lon = 0; lon < 360; lon += 30) ring((a) => ll(90 - (a * 180) / Math.PI / 2, lon, R * 1.003));
    return new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(pts), new THREE.LineBasicMaterial({ color: '#1D4ED8', transparent: true, opacity: 0.35 }));
  }, []);
  const points = useMemo(() => {
    const p = new Float32Array(900);
    for (let i = 0; i < 300; i++) { const v = new THREE.Vector3().randomDirection().multiplyScalar(5 + Math.random() * 4); p.set([v.x, v.y, v.z], i * 3); }
    return p;
  }, []);

  useFrame((state, dt) => {
    globe.current.rotation.y += dt * 0.08;
    stars.current.rotation.y -= dt * 0.01;
    const t = (state.clock.elapsedTime * 0.12) % 1;
    const c = curves[Math.floor(state.clock.elapsedTime * 0.12) % curves.length];
    const pos = c.getPoint(t); const ahead = c.getPoint(Math.min(1, t + 0.01));
    const world = globe.current.localToWorld(pos.clone());
    plane.current.position.copy(world);
    plane.current.lookAt(globe.current.localToWorld(ahead.clone()));
    // gentle mouse parallax
    state.camera.position.x += (state.pointer.x * 0.6 - state.camera.position.x) * 0.04;
    state.camera.position.y += (state.pointer.y * 0.4 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[6, 4, 6]} intensity={60} color="#60a5fa" />
      <group ref={globe}>
        <mesh><sphereGeometry args={[R, 48, 48]} /><meshStandardMaterial color="#0B1F3A" roughness={0.8} /></mesh>
        <primitive object={grid} />
        <mesh><sphereGeometry args={[R * 1.12, 32, 32]} /><meshBasicMaterial color="#1D4ED8" transparent opacity={0.08} side={THREE.BackSide} /></mesh>
        {HUBS.map((h, i) => <mesh key={i} position={ll(...h)}><sphereGeometry args={[0.045, 12, 12]} /><meshBasicMaterial color="#F59E0B" /></mesh>)}
        {lines.map((l, i) => <primitive key={i} object={l} />)}
      </group>
      <group ref={plane}>
        <mesh rotation={[Math.PI / 2, 0, 0]}><coneGeometry args={[0.06, 0.28, 8]} /><meshBasicMaterial color="#ffffff" /></mesh>
        <mesh><boxGeometry args={[0.32, 0.015, 0.07]} /><meshBasicMaterial color="#ffffff" /></mesh>
      </group>
      <points ref={stars}>
        <bufferGeometry><bufferAttribute attach="attributes-position" array={points} count={300} itemSize={3} /></bufferGeometry>
        <pointsMaterial size={0.035} color="#ffffff" transparent opacity={0.7} />
      </points>
    </>
  );
}

export default function Globe() {
  return (
    <Canvas camera={{ position: [0, 0, 6.2], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} aria-hidden="true">
      <Scene />
    </Canvas>
  );
}
