import { useGameStore } from './store/gameStore'
import { Setup } from './components/Setup/Setup'

function App() {
  const gameStarted = useGameStore(s => s.gameStarted)

  return (
    <div>
      {!gameStarted && <Setup />}
      {gameStarted && <p style={{ color: 'white' }}>Jogo iniciado!</p>}
    </div>
  )
}

export default App