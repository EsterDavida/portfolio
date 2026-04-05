import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles() {
  const mesh = useRef()
  const count = 120

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return arr
  }, [])

  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.03
      mesh.current.rotation.x = clock.getElapsedTime() * 0.01
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#c9a84c" transparent opacity={0.6} sizeAttenuation />
    </points>
  )
}

function FloatingRing() {
  const mesh = useRef()
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.x = clock.getElapsedTime() * 0.2
      mesh.current.rotation.z = clock.getElapsedTime() * 0.1
    }
  })
  return (
    <mesh ref={mesh} position={[0, 0, -2]}>
      <torusGeometry args={[2, 0.02, 16, 100]} />
      <meshBasicMaterial color="#c9a84c" transparent opacity={0.15} />
    </mesh>
  )
}

function FloatingRing2() {
  const mesh = useRef()
  useFrame(({ clock }) => {
    if (mesh.current) {
      mesh.current.rotation.y = clock.getElapsedTime() * 0.15
      mesh.current.rotation.x = clock.getElapsedTime() * 0.25
    }
  })
  return (
    <mesh ref={mesh} position={[0, 0, -3]}>
      <torusGeometry args={[1.5, 0.015, 16, 100]} />
      <meshBasicMaterial color="#c9a84c" transparent opacity={0.1} />
    </mesh>
  )
}

export default function Scene3D({ height = '100vh' }) {
  return (
    <div style={{ position: 'absolute', inset: 0, height, pointerEvents: 'none', zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <Particles />
        <FloatingRing />
        <FloatingRing2 />
      </Canvas>
    </div>
  )
}
