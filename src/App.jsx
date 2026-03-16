import { useGameStore } from './store/gameStore'
import { Setup } from './components/Setup/Setup'
import { Board } from './components/Board/Board'

function App() {
  const gameStarted = useGameStore(s => s.gameStarted)

  return (
    <div>
      {!gameStarted && <Setup />}
      {gameStarted && <Board />}
    </div>
  )
}

export default App