import { useState, useEffect } from 'react';
import AddGame from '../components/AddGame';
import GameList from '../components/GameList';
import { v4 } from 'uuid';
import { api } from '../services/api';

type Game = {
  id: string | number;
  title: string;
  genre: string;
  platform: string;
  status: string;
  image: string;
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

  // Carrega a lista do banco na montagem do componente
  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await api.get('/games');
        setGames(res.data);
      } catch (e: any) {
        console.error(e);
        alert('Falha ao carregar jogos do servidor.');
      }
    };

    fetchGames();
  }, []);

  // Função de adicionar jogo
  const onAddGameSubmit = async () => {
    //Validação dos campos
    if (
      !game.title ||
      !game.genre ||
      !game.platform ||
      !game.status ||
      !game.image
    ) {
      return alert('Por favor, preencha todos os campos.');
    }

    try {
      //Envia para o backend
      const response = await api.post('/games', game);

      //Caso criado com sucesso
      if (response.status === 201) {
        const saved = response.data;

        //Atualiza a lista local
        setGames((prev) => [...prev, saved]);

        // Sincroniza com o banco
        const list = await api.get('/games');
        setGames(list.data);

        // Reseta o formulário com um novo id
        setGame({
          id: v4(),
          title: '',
          genre: '',
          platform: '',
          status: '',
          image: '',
        });

        alert('Jogo adicionado com sucesso!');
      } else {
        alert('Falha ao adicionar.');
      }
    } catch (error: any) {
      // Caso de erro
      const msg =
        error.response?.data?.message || error.message || 'Erro desconhecido';
      alert('Erro ao enviar os dados: ' + msg);
    }
  };

  // função de editar os jogos
  // Função de deletar jogo

  return (
    // Container principal da aplicação, ocupando toda a tela
    <div className="w-screen h-screen bg-blue-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <AddGame
          game={game} // passa os valores do formulário
          setGame={setGame} // passa a função para atualizar o formulário
          onAddGameSubmit={onAddGameSubmit} // função para enviar o formulário
        />
        <GameList games={games} />
      </div>
    </div>
  );
}

export default App;
