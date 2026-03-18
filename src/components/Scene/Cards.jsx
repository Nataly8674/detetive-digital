import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import { Text } from '@react-three/drei'

function Card({ position, rotation, color, label, faceUp, onClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <group
      position={position}
      rotation={rotation}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Corpo da carta */}
      <mesh castShadow>
        <boxGeometry args={[0.7, 0.008, 1.0]} />
        <meshStandardMaterial
            color={faceUp ? color : '#1a3a6e'}
            roughness={0.4}
            metalness={0.0}
            emissive={faceUp ? color : '#0a1a3e'}
            emissiveIntensity={0.3}
        />
      </mesh>

      {/* Borda da carta */}
      <mesh position={[0, 0.005, 0]}>
        <boxGeometry args={[0.72, 0.005, 1.02]} />
        <meshStandardMaterial color="#000000" roughness={0.5} />
      </mesh>

      {/* Texto da carta se virada para cima */}
      {faceUp && (
        <Text
          position={[0, 0.012, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.08}
          color="#2a1400"
          anchorX="center"
          anchorY="middle"
          maxWidth={0.6}
        >
          {label}
        </Text>
      )}

      {/* Padrão no verso */}
      {!faceUp && (
        <Text
          position={[0, 0.012, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={0.15}
          color="rgba(255,255,255,0.3)"
          anchorX="center"
          anchorY="middle"
        >
          ?
        </Text>
      )}
    </group>
  )
}

function CardStack({ position, cards, label }) {
  return (
    <group position={position}>
      {/* Base da zona */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.8, 0.02, 1.4]} />
        <meshStandardMaterial color="#1a4a1a" roughness={0.9} opacity={0.6} transparent />
      </mesh>
      <Text
        position={[0, 0.02, 0.8]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.12}
        color="#ffd700"
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
      {/* Cartas empilhadas */}
      {cards.slice(0, 5).map((card, i) => (
        <Card
          key={card.id}
          position={[0, 0.02 + i * 0.012, 0]}
          rotation={[0, 0, 0]}
          color={
            card.type === 'suspect' ? '#fadbd8' :
            card.type === 'weapon'  ? '#fdebd0' : '#d5f5e3'
          }
          label={card.name}
          faceUp={false}
        />
      ))}
    </group>
  )
}

export function PlayerCards({ playerIndex, position, rotation }) {
  const players = useGameStore(s => s.players)
  const player = players[playerIndex]
  const [revealed, setRevealed] = useState({})

  if (!player) return null

  const toggleCard = (cardId) => {
    setRevealed(prev => ({ ...prev, [cardId]: !prev[cardId] }))
  }

  return (
    <group position={position} rotation={rotation}>
      {/* Label do jogador */}
      <Text
      position={[0, 0.02, -1.2]}
      rotation={[-Math.PI / 2, 0, 0]}
      fontSize={0.14}
      color="#ffd700"
      anchorX="center"
      anchorY="middle"
      >
      {player.name}
      </Text>

      {/* Cartas do jogador */}
      {player.cards.map((card, i) => {
      const col = i % 5
      const row = Math.floor(i / 5)
      return (
        <Card
        key={card.id}
        position={[-1.6 + col * 0.82, 0.02 + i * 0.001, -0.6 + row * 1.1]}
        rotation={[0, 0, 0]}
        color={
            card.type === 'suspect' ? '#fadbd8' :
            card.type === 'weapon'  ? '#fdebd0' : '#d5f5e3'
        }
        label={card.name}
        faceUp={!!revealed[card.id]}
        onClick={() => toggleCard(card.id)}
        />
      )
     })}
    </group>
  )
}

export function EnvelopeCard({ position }) {
  const envelope = useGameStore(s => s.envelope)
  const [open, setOpen] = useState(false)

  return (
    <group position={position}>
      {/* Base do envelope */}
      <mesh
        castShadow
        onClick={() => setOpen(o => !o)}
      >
        <boxGeometry args={[1.4, 0.06, 1.0]} />
        <meshStandardMaterial color="#8b2020" roughness={0.6} />
      </mesh>
      <Text
        position={[0, 0.04, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.12}
        color="#ffd700"
        anchorX="center"
        anchorY="middle"
      >
        {open ? '🔍 ABERTO' : '✉ ENVELOPE'}
      </Text>

      {/* Cartas do envelope quando aberto */}
      {open && envelope.suspect && (
        <>
          <Card position={[-0.4, 0.1, 0]} rotation={[0, 0, 0]} color="#fadbd8" label={envelope.suspect.name} faceUp={true} />
          <Card position={[0,   0.1, 0]} rotation={[0, 0, 0]} color="#fdebd0" label={envelope.weapon.name}  faceUp={true} />
          <Card position={[0.4, 0.1, 0]} rotation={[0, 0, 0]} color="#d5f5e3" label={envelope.room.name}   faceUp={true} />
        </>
      )}
    </group>
  )
}