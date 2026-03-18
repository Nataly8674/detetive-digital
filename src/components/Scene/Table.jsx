export function Table() {
  return (
    <group>
      {/* Pernas da mesa */}
      {[[-6, -1.5, -4], [6, -1.5, -4], [-6, -1.5, 4], [6, -1.5, 4]].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} castShadow>
          <boxGeometry args={[0.4, 3, 0.4]} />
          <meshStandardMaterial color="#4a2e10" roughness={0.9} />
        </mesh>
      ))}

      {/* Tampo da mesa */}
      <mesh receiveShadow castShadow position={[0, 0, 0]}>
        <boxGeometry args={[14, 0.3, 10]} />
        <meshStandardMaterial color="#5c3a1e" roughness={0.8} />
      </mesh>

      {/* Feltro verde */}
      <mesh receiveShadow position={[0, 0.17, 0]}>
        <boxGeometry args={[13, 0.02, 9]} />
        <meshStandardMaterial color="#2d5a1b" roughness={0.9} />
      </mesh>

      {/* Tabuleiro */}
      <Board />
    </group>
  )
}

function Board() {
  const rooms = [
    { id: 1,  col: 0, row: 0 },  // Restaurante
    { id: 2,  col: 1, row: 0 },  // Prefeitura
    { id: 3,  col: 2, row: 0 },  // Banco
    { id: 4,  col: 0, row: 1 },  // Hospital
    { id: 11, col: 1, row: 1, neutral: true, large: true },  // Praça Central
    { id: 5,  col: 2, row: 1 },  // Mansão
    { id: 6,  col: 0, row: 2 },  // Floricultura
                                  // col:1 row:2 = vazio
    { id: 7,  col: 2, row: 2 },  // Hotel
    { id: 8,  col: 0, row: 3 },  // Cemitério
    { id: 9,  col: 1, row: 3 },  // Estação de Trem
    { id: 10, col: 2, row: 3 },  // Boate
  ]

  const cellW = 2.6
  const cellH = 1.8
  const startX = -2.6
  const startZ = -2.7

  return (
    <group position={[0, 0.20, 0]}>
      {/* Base do tabuleiro */}
      <mesh receiveShadow>
        <boxGeometry args={[8.4, 0.06, 7.4]} />
        <meshStandardMaterial color="#8a8a8a" roughness={0.8} />
      </mesh>

      {/* Cômodos */}
      {rooms.map(room => {
        const x = startX + room.col * cellW
        const z = startZ + room.row * cellH
        const w = room.large ? 2.4 : 2.4
        const h = room.large ? 1.6 : 1.6
        return (
          <group key={room.id} position={[x, 0.06, z]}>
            <mesh receiveShadow>
              <boxGeometry args={[w, 0.05, h]} />
              <meshStandardMaterial
                color={room.neutral ? '#5a7a3a' : '#e8d4a0'}
                roughness={0.7}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}