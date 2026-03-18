function Pawn({ position, color, name }) {
  return (
    <group position={position}>
      {/* Base do peão */}
      <mesh castShadow position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.12, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Corpo do peão */}
      <mesh castShadow position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.15, 0.22, 0.22, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
      </mesh>
      {/* Cabeça do peão */}
      <mesh castShadow position={[0, 0.42, 0]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.2} />
      </mesh>
    </group>
  )
}

export function Table() {
  return (
    <group>
     {/* Pernas da mesa */}
     {[[-9.3, -1.5, -6], [9, -1.5, -6], [-9, -1.5, 6], [9, -1.5, 6]].map(([x, y, z], i) => (
     <mesh key={i} position={[x, y, z]} castShadow>
         <boxGeometry args={[0.4, 3, 0.4]} />
         <meshStandardMaterial color="#4a2e10" roughness={0.9} />
     </mesh>
     ))}

     {/* Tampo da mesa */}
     <mesh receiveShadow castShadow position={[0, 0, 0]}>
     <boxGeometry args={[20, 0.3, 16]} />
     <meshStandardMaterial color="#5c3a1e" roughness={0.8} />
     </mesh>

     {/* Feltro verde */}
     <mesh receiveShadow position={[0, 0.17, 0]}>
     <boxGeometry args={[19, 0.02, 15]} />
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

    const pawns = [
    { id: 1, name: "Sargento Bigode",       color: "#D4AC0D", roomId: 2  },
    { id: 2, name: "Chef Tony Gourmet",      color: "#784212", roomId: 1  },
    { id: 3, name: "Médica Dona Violeta",    color: "#C39BD3", roomId: 4  },
    { id: 4, name: "Coveiro Sérgio",         color: "#2C2C2C", roomId: 8  },
    { id: 5, name: "Advogado Sr. Marinho",   color: "#1E8449", roomId: 11 },
    { id: 6, name: "Mordomo James",          color: "#1A5276", roomId: 5  },
    { id: 7, name: "Dançarina Srtá. Rosa",   color: "#C0392B", roomId: 10 },
    { id: 8, name: "Florista Dona Branca",   color: "#E8E8E8", roomId: 6  },
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
        return (
          <group key={room.id} position={[x, 0.06, z]}>
            <mesh receiveShadow>
              <boxGeometry args={[2.4, 0.05, 1.6]} />
              <meshStandardMaterial
                color={room.neutral ? '#5a7a3a' : '#e8d4a0'}
                roughness={0.7}
              />
            </mesh>
          </group>
        )
      })}

      {/* Peões */}
      {pawns.map(pawn => {
        const room = rooms.find(r => r.id === pawn.roomId)
        if (!room) return null
        const x = startX + room.col * cellW
        const z = startZ + room.row * cellH
        return (
          <Pawn
            key={pawn.id}
            position={[x, 0.08, z]}
            color={pawn.color}
            name={pawn.name}
          />
        )
      })}
    </group>
  )
}