import { useRef } from 'react';
import Input from './Input';
import Button from './Button';

function AddGame({ game, setGame, onAddGameSubmit }: any) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddGame = () => {
    onAddGameSubmit(); // adiciona o jogo

    // Limpa o input de arquivo
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4 p-6 bg-blue-200 rounded-md shadow flex flex-col">
      <Input
        type="text"
        placeholder="Digite o título do jogo"
        value={game.title}
        onChange={(e: any) => setGame({ ...game, title: e.target.value })}
      />
      <Input
        type="text"
        placeholder="Digite o gênero do jogo"
        value={game.genre}
        onChange={(e: any) => setGame({ ...game, genre: e.target.value })}
      />
      <Input
        type="text"
        placeholder="Digite a plataforma do jogo"
        value={game.platform}
        onChange={(e: any) => setGame({ ...game, platform: e.target.value })}
      />
      <select
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={game.status}
        onChange={(e: any) => setGame({ ...game, status: e.target.value })}>
        <option value="" disabled>
          Selecione o status
        </option>
        <option value="jogando">Jogando</option>
        <option value="zerado">Zerado</option>
        <option value="wishlist">Lista de Desejos</option>
      </select>
      <div className="flex flex-row">
        <Input
          type="file"
          accept="image/*"
          name="capa"
          ref={fileInputRef}
          onChange={(e: any) => {
            const file = e.target.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onloadend = () => {
                setGame((prevGame: any) => ({
                  ...prevGame,
                  image: reader.result,
                }));
              };
              reader.readAsDataURL(file);
            }
          }}
        />
      </div>
      <Button onClick={handleAddGame}>Adicionar Jogo</Button>
    </div>
  );
}

export default AddGame;
