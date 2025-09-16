import { useState } from 'react';
import AddGame from '../components/AddGame';
import GameList from '../components/GameList';

type Game = {
  title: string;
  genre: string;
  platform: string;
  status: string;
  image: string; // base64
};

function App() {
  // Estado para armazenar os valores do formulário (um único jogo)
  const [game, setGame] = useState({
    title: '', // título do jogo
    genre: '', // gênero do jogo
    platform: '', // plataforma do jogo
    status: '', // status do jogo (ex: novo, usado)
  });

  // Estado para armazenar a lista de jogos adicionados
  const [games, setGames] = useState<
    { title: string; genre: string; platform: string; status: string }[]
  >([]); // inicialmente vazio

  // Função chamada ao enviar o formulário de adicionar jogo
  const onAddGameSubmit = () => {
    // Validação: se algum campo estiver vazio, exibe alerta e não adiciona
    if (!game.title || !game.genre || !game.platform || !game.status) {
      return alert('Por favor, preencha todos os campos.');
    }

    // Cria um novo objeto de jogo com os valores do formulário
    const newGame = { ...game };

    // Adiciona o novo jogo à lista de jogos
    setGames([...games, newGame]);

    // Limpa os campos do formulário para o próximo cadastro
    setGame({
      title: '',
      genre: '',
      platform: '',
      status: '',
    });

    // Mensagem de confirmação
    alert('Jogo adicionado com sucesso!');
  };

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
