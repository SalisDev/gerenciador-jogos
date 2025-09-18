import { PenLineIcon } from 'lucide-react';
import GameActions from '../components/GameActions';
import GameInfo from '../components/GameInfo';
import { useGames } from '../services/useGames';
import Button from '../components/Button';
import { useParams } from '@tanstack/react-router';

function GamePage() {
  const { game, onDeleteGame, onEditGame } = useGames();
  const { id } = useParams({ from: '/game/$id' });
  return (
    <div>
      <GameInfo key={id} game={game}>
        <GameActions game={game} onDelete={(g) => onDeleteGame?.(g.id)}>
          <Button onClick={() => onEditGame}>
            <PenLineIcon />
          </Button>
        </GameActions>
      </GameInfo>
    </div>
  );
}
export default GamePage;
