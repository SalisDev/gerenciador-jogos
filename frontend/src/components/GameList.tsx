import GameInfo from './GameInfo';
import GameActions from './GameActions';
import { ChevronRightIcon } from 'lucide-react';
import type { Game } from '../services/useGames';
import { useNavigate } from '@tanstack/react-router';
import Button from './Button';

function GameList(props: {
  games: Game[];
  onItemClick?: (game: Game) => void;
  onDeleteGame?: (id: string | number) => void;
}) {
  const navigate = useNavigate();
  return (
    <div className="space-y-4 p-6 bg-blue-200 rounded-md shadow">
      <h2 className="text-xl font-bold">Lista de Jogos</h2>

      <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
        {props.games.map((game, id) => (
          <GameInfo key={id} game={game}>
            <GameActions
              game={game}
              onDelete={(g) => props.onDeleteGame?.(g.id)}>
              <Button
                onClick={() =>
                  navigate({
                    to: '/game/$id',
                    params: { id: game.id.toString() },
                  })
                }>
                <ChevronRightIcon />
              </Button>
            </GameActions>
          </GameInfo>
        ))}
      </ul>
    </div>
  );
}

export default GameList;
