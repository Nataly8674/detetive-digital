import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { Table } from './Table'
import { PlayerCards, EnvelopeCard } from './Cards'
import { useGameStore } from '../../store/gameStore'

export function Scene() {
  const players = useGameStore(s => s.players)

const playerPositions = [
  { position: [0, 0.2, -6.0], rotation: [0, 0, 0] },
  { position: [0, 0.2,  6.0], rotation: [0, Math.PI, 0] },
]

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#1a0f08' }}>
      <Canvas camera={{ position: [0, 8, 10], fov: 50 }} shadows>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={1.2} castShadow />
        <pointLight position={[0, 6, 0]} intensity={0.8} color="#fff5e0" />

        <Table />

        {/* Cartas dos jogadores nas bordas da mesa */}
        {players.map((_, i) => (
          i < playerPositions.length && (
            <PlayerCards
              key={i}
              playerIndex={i}
              position={playerPositions[i].position}
              rotation={playerPositions[i].rotation}
            />
          )
        ))}

        {/* Envelope no canto da mesa */}
        <EnvelopeCard position={[5.3, 0.2, -1.5]} />

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