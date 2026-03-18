import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Table } from './Table'

export function Scene() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a0f08' }}>
      <Canvas
        camera={{ position: [0, 8, 10], fov: 50 }}
        shadows
      >
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.2}
          castShadow
        />
        <pointLight position={[0, 6, 0]} intensity={0.8} color="#fff5e0" />

        <Table />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={4}
          maxDistance={20}
          maxPolarAngle={Math.PI / 2.2}
        />

        <Environment preset="apartment" />
      </Canvas>
    </div>
  )
}