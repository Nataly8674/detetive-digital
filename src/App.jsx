import { useGameStore } from './store/gameStore'
import { Setup } from './components/Setup/Setup'

function App() {
  const gameStarted = useGameStore(s => s.gameStarted)
  const players = useGameStore(s => s.players)
  const envelope = useGameStore(s => s.envelope)

  return (
    <div>
      {!gameStarted && <Setup />}
      {gameStarted && (
        <div style={{ color: 'white', padding: '20px' }}>
          <h2>Jogo iniciado!</h2>
          <h3>Envelope:</h3>
          <p>Suspeito: {envelope.suspect?.name}</p>
          <p>Arma: {envelope.weapon?.name}</p>
          <p>Cômodo: {envelope.room?.name}</p>
          <h3>Jogadores:</h3>
          {players.map(p => (
            <div key={p.id}>
              <strong>{p.name}</strong>: {p.cards.map(c => c.name).join(', ')}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App