import GameInfo from './GameInfo';
import GameActions from './GameActions';

type Game = {
  id: string | number;
  image: string;
  title: string;
  genre: string;
  platform: string;
  status: string;
};

function GameList(props: {
  games: Game[];
  onItemClick?: (game: Game) => void;
}) {
  return (
    <div className="space-y-4 p-6 bg-blue-200 rounded-md shadow">
      <h2 className="text-xl font-bold">Lista de Jogos</h2>

      <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
        {props.games.map((game, index) => (
          <GameInfo key={index} game={game}>
            <GameActions game={game} onDelete={props.onItemClick} />
          </GameInfo>
        ))}
      </ul>
    </div>
  );
}

export default GameList;
