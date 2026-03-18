import { useGameStore } from './store/gameStore'
import { Setup } from './components/Setup/Setup'
import { Scene } from './components/Scene/Scene'

function App() {
  const gameStarted = useGameStore(s => s.gameStarted)

  return (
    <div>
      {!gameStarted && <Setup />}
      {gameStarted && <Scene />}
    </div>
  )
}

export default App