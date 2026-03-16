import { useState, useRef } from 'react'
import { rooms } from '../../data/rooms'
import './Board.css'

const ROOM_LAYOUT = [
  { id: 1,  col: 1, row: 1 },
  { id: 2,  col: 2, row: 1 },
  { id: 3,  col: 3, row: 1 },
  { id: 4,  col: 1, row: 2 },
  { id: 11, col: 2, row: 2 },
  { id: 5,  col: 3, row: 2 },
  { id: 6,  col: 1, row: 3 },
  { id: 7,  col: 2, row: 3 },
  { id: 8,  col: 3, row: 3 },
  { id: 9,  col: 1, row: 4 },
  { id: 10, col: 2, row: 4 },
]

export function Board() {
  const [camera, setCamera] = useState({ x: 0, y: 0, zoom: 1 })
  const [selectedRoom, setSelectedRoom] = useState(null)
  const isPanning = useRef(false)
  const lastMouse = useRef({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const handleMouseDown = (e) => {
    if (e.target.closest('.room')) return
    isPanning.current = true
    lastMouse.current = { x: e.clientX, y: e.clientY }
    containerRef.current.style.cursor = 'grabbing'
  }

  const handleMouseMove = (e) => {
    if (!isPanning.current) return
    const dx = e.clientX - lastMouse.current.x
    const dy = e.clientY - lastMouse.current.y
    lastMouse.current = { x: e.clientX, y: e.clientY }
    setCamera(c => ({ ...c, x: c.x + dx, y: c.y + dy }))
  }

  const handleMouseUp = () => {
    isPanning.current = false
    if (containerRef.current) containerRef.current.style.cursor = 'grab'
  }

  const handleWheel = (e) => {
    e.preventDefault()
    const delta = e.deltaY > 0 ? -0.1 : 0.1
    setCamera(c => ({ ...c, zoom: Math.min(2, Math.max(0.4, c.zoom + delta)) }))
  }

  const roomsById = Object.fromEntries(rooms.map(r => [r.id, r]))

  return (
    <div
      className="board-container"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
    >
      <div
        className="board-world"
        style={{ transform: `translate(${camera.x}px, ${camera.y}px) scale(${camera.zoom})` }}
      >
        <div className="board-table">
          <div className="board-grid">
            {ROOM_LAYOUT.map(({ id, col, row }) => {
              const room = roomsById[id]
              if (!room) return null
              return (
                <div
                  key={id}
                  className={`room ${room.isNeutral ? 'room-neutral' : ''} ${selectedRoom === id ? 'room-selected' : ''}`}
                  style={{ gridColumn: col, gridRow: row }}
                  onClick={() => setSelectedRoom(selectedRoom === id ? null : id)}
                >
                  <span className="room-name">{room.name}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div className="board-controls">
        <button onClick={() => setCamera(c => ({ ...c, zoom: Math.min(2, c.zoom + 0.1) }))}>+</button>
        <button onClick={() => setCamera({ x: 0, y: 0, zoom: 1 })}>⌂</button>
        <button onClick={() => setCamera(c => ({ ...c, zoom: Math.max(0.4, c.zoom - 0.1) }))}>−</button>
      </div>

      {selectedRoom && (
        <div className="board-tooltip">
          {roomsById[selectedRoom]?.name}
        </div>
      )}
    </div>
  )
}