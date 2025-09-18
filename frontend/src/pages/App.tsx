import AddGame from '../components/AddGame';
import GameList from '../components/GameList';
import { useGames } from '../services/useGames';

function App() {
  const { game, setGame, games, onAddGameSubmit, onDeleteGame } = useGames();

  return (
    <div className="w-screen h-screen bg-blue-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <AddGame
          game={game}
          setGame={setGame}
          onAddGameSubmit={onAddGameSubmit}
        />
        <GameList games={games} onDeleteGame={onDeleteGame} />
      </div>
    </div>
  );
}

export default App;
