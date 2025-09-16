import Button from './Button';
import { ChevronRightIcon, Trash2Icon } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

type Game = {
  id: string | number;
  image: string;
  title: string;
  genre: string;
  platform: string;
  status: string;
};

type GameActionsProps = {
  game: Game;
  onDelete?: (game: Game) => void;
};

export default function GameActions({ game, onDelete }: GameActionsProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-1">
      <Button
        onClick={() =>
          navigate({
            to: '/game/$id',
            params: { id: game.id.toString() },
          })
        }>
        <ChevronRightIcon />
      </Button>

      <Button onClick={() => onDelete?.(game)}>
        <Trash2Icon />
      </Button>
    </div>
  );
}
