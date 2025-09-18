import type { Game } from '../services/useGames';

type GameGameInfoProps = {
  game: Game;
  children?: React.ReactNode;
};

function GameInfo({ game, children }: GameGameInfoProps) {
  return (
    <li className="flex justify-between items-start bg-white p-4 rounded-md shadow">
      <div className="flex gap-4">
        <img
          src={game.image}
          alt="capa"
          className="w-24 h-32 object-cover rounded"
        />
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-lg">Título: {game.title}</h2>
          <p>Gênero: {game.genre}</p>
          <p>Plataforma: {game.platform}</p>
          <p>Status: {game.status}</p>
        </div>
      </div>
      {children}
    </li>
  );
}

export default GameInfo;
