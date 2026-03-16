import { create } from 'zustand'
import { suspects } from '../data/suspects'
import { weapons } from '../data/weapons'
import { rooms } from '../data/rooms'
import { shuffle } from '../utils/shuffle'

export const useGameStore = create((set, get) => ({

  // --- ESTADO ---
  players: [],
  currentPlayerIndex: 0,
  envelope: { suspect: null, weapon: null, room: null },
  deck: [],
  gameStarted: false,
  winner: null,
  eliminatedPlayers: [],

  // --- ACOES ---

  setupGame: (playerNames) => {
    // 1. Embaralha cada categoria
    const shuffledSuspects = shuffle(suspects).map(s => ({ ...s, type: 'suspect' }))
    const shuffledWeapons  = shuffle(weapons).map(w => ({ ...w, type: 'weapon' }))
    const shuffledRooms    = shuffle(rooms.filter(r => !r.isNeutral)).map(r => ({ ...r, type: 'room' }))

    // 2. Retira uma carta de cada para o envelope
    const envelope = {
      suspect: shuffledSuspects.pop(),
      weapon:  shuffledWeapons.pop(),
      room:    shuffledRooms.pop(),
    }

    // 3. Junta o restante e embaralha tudo junto
    const remaining = shuffle([...shuffledSuspects, ...shuffledWeapons, ...shuffledRooms])

    // 4. Distribui as cartas entre os jogadores
    const players = playerNames.map((name, index) => ({
      id: index,
      name,
      cards: [],
      notes: { suspects: {}, weapons: {}, rooms: {} },
      suspectId: suspects[index % suspects.length].id,
    }))

    remaining.forEach((card, index) => {
      players[index % players.length].cards.push(card)
    })

    set({ players, envelope, gameStarted: true, currentPlayerIndex: 0, winner: null, eliminatedPlayers: [] })
  },

  nextTurn: () => {
    const { players, currentPlayerIndex, eliminatedPlayers } = get()
    let next = (currentPlayerIndex + 1) % players.length
    // Pula jogadores eliminados
    while (eliminatedPlayers.includes(next) && eliminatedPlayers.length < players.length) {
      next = (next + 1) % players.length
    }
    set({ currentPlayerIndex: next })
  },

  makeAccusation: (playerId, suspectId, weaponId, roomId) => {
    const { envelope, eliminatedPlayers } = get()
    const correct =
      envelope.suspect.id === suspectId &&
      envelope.weapon.id  === weaponId  &&
      envelope.room.id    === roomId

    if (correct) {
      set({ winner: playerId })
    } else {
      set({ eliminatedPlayers: [...eliminatedPlayers, playerId] })
    }
    return correct
  },

  updateNote: (playerId, category, itemId, value) => {
    const { players } = get()
    const updated = players.map(p => {
      if (p.id !== playerId) return p
      return {
        ...p,
        notes: {
          ...p.notes,
          [category]: { ...p.notes[category], [itemId]: value }
        }
      }
    })
    set({ players: updated })
  },

  resetGame: () => {
    set({
      players: [],
      currentPlayerIndex: 0,
      envelope: { suspect: null, weapon: null, room: null },
      gameStarted: false,
      winner: null,
      eliminatedPlayers: [],
    })
  },

}))