import Button from './Button';
import { Trash2Icon } from 'lucide-react';
import type React from 'react';
import type { Game } from '../services/useGames';

type GameActionsProps = {
  game: Game;
  children?: React.ReactNode;
  onDelete?: (game: Game) => void;
};

export default function GameActions({
  game,
  onDelete,
  children,
}: GameActionsProps) {
  return (
    <div className="flex flex-col gap-1">
      {children}

      <Button onClick={() => onDelete?.(game)}>
        <Trash2Icon />
      </Button>
    </div>
  );
}
