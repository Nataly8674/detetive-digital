import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function WeaponBase({ position, color, children }) {
  const ref = useRef()
  return (
    <group ref={ref} position={position}>
      {/* Base pequena */}
      <mesh castShadow position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.18, 0.2, 0.04, 12]} />
        <meshStandardMaterial color="#8b6914" roughness={0.6} metalness={0.3} />
      </mesh>
      {children}
    </group>
  )
}

function Knife({ position }) {
  return (
    <WeaponBase position={position} color="#silver">
      <mesh castShadow position={[0, 0.12, 0]} rotation={[0, 0, Math.PI / 6]}>
        <boxGeometry args={[0.06, 0.22, 0.02]} />
        <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh castShadow position={[0.04, 0.04, 0]}>
        <boxGeometry args={[0.08, 0.06, 0.02]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
    </WeaponBase>
  )
}

function Shotgun({ position }) {
  return (
    <WeaponBase position={position}>
      <mesh castShadow position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.28, 8]} />
        <meshStandardMaterial color="#444444" roughness={0.3} metalness={0.7} />
      </mesh>
      <mesh castShadow position={[0, 0.06, 0]}>
        <boxGeometry args={[0.1, 0.08, 0.06]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
    </WeaponBase>
  )
}

function Poison({ position }) {
  return (
    <WeaponBase position={position}>
      <mesh castShadow position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.18, 12]} />
        <meshStandardMaterial color="#7CFC00" roughness={0.3} metalness={0.1} transparent opacity={0.85} />
      </mesh>
      <mesh castShadow position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.03, 0.06, 0.06, 8]} />
        <meshStandardMaterial color="#555555" roughness={0.4} />
      </mesh>
    </WeaponBase>
  )
}

function Shovel({ position }) {
  return (
    <WeaponBase position={position}>
      <mesh castShadow position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.015, 0.015, 0.26, 8]} />
        <meshStandardMaterial color="#8B4513" roughness={0.9} />
      </mesh>
      <mesh castShadow position={[0, 0.06, 0]}>
        <boxGeometry args={[0.1, 0.08, 0.02]} />
        <meshStandardMaterial color="#888888" roughness={0.4} metalness={0.5} />
      </mesh>
    </WeaponBase>
  )
}

function Scissors({ position }) {
  return (
    <WeaponBase position={position}>
      <mesh castShadow position={[-0.03, 0.14, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.03, 0.22, 0.02]} />
        <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh castShadow position={[0.03, 0.14, 0]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[0.03, 0.22, 0.02]} />
        <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.8} />
      </mesh>
    </WeaponBase>
  )
}

function Crowbar({ position }) {
  return (
    <WeaponBase position={position}>
      <mesh castShadow position={[0, 0.14, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.26, 8]} />
        <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.8} />
      </mesh>
      <mesh castShadow position={[0.04, 0.26, 0]} rotation={[0, 0, Math.PI / 3]}>
        <boxGeometry args={[0.1, 0.03, 0.025]} />
        <meshStandardMaterial color="#333333" roughness={0.3} metalness={0.8} />
      </mesh>
    </WeaponBase>
  )
}

function Knuckles({ position }) {
  return (
    <WeaponBase position={position}>
      {[[-0.06, 0, 0], [0, 0, 0], [0.06, 0, 0]].map(([x, y, z], i) => (
        <mesh key={i} castShadow position={[x, 0.1, z]}>
          <torusGeometry args={[0.04, 0.015, 8, 12]} />
          <meshStandardMaterial color="#888888" roughness={0.2} metalness={0.9} />
        </mesh>
      ))}
      <mesh castShadow position={[0, 0.06, 0]}>
        <boxGeometry args={[0.2, 0.04, 0.06]} />
        <meshStandardMaterial color="#888888" roughness={0.2} metalness={0.9} />
      </mesh>
    </WeaponBase>
  )
}

function Chemical({ position }) {
  return (
    <WeaponBase position={position}>
      <mesh castShadow position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.09, 12, 12]} />
        <meshStandardMaterial color="#FF4500" roughness={0.2} metalness={0.1} transparent opacity={0.8} />
      </mesh>
      <mesh castShadow position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.02, 0.04, 0.06, 8]} />
        <meshStandardMaterial color="#555555" roughness={0.4} />
      </mesh>
    </WeaponBase>
  )
}

export function Weapons() {
  const components = [Knife, Shotgun, Chemical, Shovel, Scissors, Crowbar, Knuckles, Poison]

  return (
    <group position={[-6.5, 0.21, -2.0]}>
      {components.map((WeaponComponent, i) => {
        const col = i % 2
        const row = Math.floor(i / 2)
        return (
          <WeaponComponent
            key={i}
            position={[-0.3 + col * 0.6, 0, -1.2 + row * 0.7]}
          />
        )
      })}
    </group>
  )
}