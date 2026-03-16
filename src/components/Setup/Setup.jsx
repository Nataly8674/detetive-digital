import { useState } from 'react'
import { useGameStore } from '../../store/gameStore'
import './Setup.css'

export function Setup() {
  const [playerNames, setPlayerNames] = useState(['', '', '', ''])
  const setupGame = useGameStore(s => s.setupGame)

  const updateName = (index, value) => {
    const updated = [...playerNames]
    updated[index] = value
    setPlayerNames(updated)
  }

  const handleStart = () => {
    const filled = playerNames.filter(n => n.trim() !== '')
    if (filled.length < 2) {
      alert('É necessário pelo menos 2 jogadores.')
      return
    }
    setupGame(filled)
  }

  return (
    <div className="setup">
      <div className="setup-box">
        <h1 className="setup-title">🔍 Detetive Digital</h1>
        <p className="setup-subtitle">Quem vai investigar o crime?</p>

        <div className="setup-players">
          {playerNames.map((name, i) => (
            <div key={i} className="setup-player-row">
              <span className="setup-player-label">Jogador {i + 1}</span>
              <input
                className="setup-input"
                type="text"
                placeholder={i < 2 ? "Nome obrigatório" : "Opcional"}
                value={name}
                onChange={e => updateName(i, e.target.value)}
                maxLength={20}
              />
            </div>
          ))}
        </div>

        <button className="setup-btn" onClick={handleStart}>
          Iniciar Investigação
        </button>
      </div>
    </div>
  )
}