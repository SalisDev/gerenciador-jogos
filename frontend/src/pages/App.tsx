import { useState } from 'react';
import AddGame from '../components/AddGame';
import GameList from '../components/GameList';
import { v4 } from 'uuid';

type Game = {
  id: string | number;
  title: string;
  genre: string;
  platform: string;
  status: string;
  image: string; // base64
};

function App() {
  // Estado para armazenar os valores do formulário (um único jogo)
  const [game, setGame] = useState<Game>({
    id: v4(),
    title: '',
    genre: '',
    platform: '',
    status: '',
    image: '',
  });
  // Estado para armazenar a lista de jogos adicionados
  const [games, setGames] = useState<Game[]>([]);

  // Função chamada ao enviar o formulário de adicionar jogo
  const onAddGameSubmit = () => {
    // Validação: se algum campo estiver vazio, exibe alerta e não adiciona
    if (
      !game.title ||
      !game.genre ||
      !game.platform ||
      !game.status ||
      !game.image
    ) {
      return alert('Por favor, preencha todos os campos.');
    }

    // Cria um novo objeto de jogo com os valores do formulário
    const newGame = { ...game };

    // Adiciona o novo jogo à lista de jogos
    setGames([...games, newGame]);

    // Limpa os campos do formulário para o próximo cadastro
    setGame({
      id: v4(),
      title: '',
      genre: '',
      platform: '',
      status: '',
      image: '',
    });

    // Mensagem de confirmação
    alert('Jogo adicionado com sucesso!');
  };
  // Função de deletar jogo
  // função de editar os jogos

  return (
    // Container principal da aplicação, ocupando toda a tela
    <div className="w-screen h-screen bg-blue-500 flex justify-center p-6">
      {/* Caixa central com largura fixa e espaçamento entre elementos */}
      <div className="w-[500px] space-y-4">
        {/* Componente do formulário de adicionar jogo */}
        <AddGame
          game={game} // passa os valores do formulário
          setGame={setGame} // passa a função para atualizar o formulário
          onAddGameSubmit={onAddGameSubmit} // função para enviar o formulário
        />
        {/* Componente que lista todos os jogos adicionados */}
        <GameList games={games} /> {/* passa a lista de jogos */}
      </div>
    </div>
  );
}

export default App;
