import { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import { api } from './api';

export type Game = {
  id: string | number;
  title: string;
  genre: string;
  platform: string;
  status: string;
  image: string;
};

export function useGames() {
  // valores do formulário
  const [game, setGame] = useState<Game>({
    id: v4(),
    title: '',
    genre: '',
    platform: '',
    status: '',
    image: '',
  });

  // lista de jogos adicionados
  const [games, setGames] = useState<Game[]>([]);

  // Carrega a lista o banco
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
    // Validação dos campos
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
      // Envia para o backend
      const response = await api.post('/games', game);

      // Caso criado com sucesso
      if (response.status === 201) {
        const saved = response.data;

        // Atualiza a lista local
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

  // Função de deletar jogo
  const onDeleteGame = async (id: string | number) => {
    const prev = games;
    setGames((g) => g.filter((item) => item.id !== id));

    try {
      const res = await api.delete(`/games/${id}`);

      if (res.status >= 200 && res.status < 300) {
        return alert('Jogo deletado com sucesso');
      }
      setGames(prev);
      alert('Falha ao deletar o jogo.');
    } catch (error: any) {
      setGames(prev);
      const msg =
        error.response?.data?.message || error.message || 'Erro desconhecido';
      alert('Erro ao deletar: ' + msg);
    }
  };

  // Função de editar jogo
  const onEditGame = async (id: string | number, updates: Partial<Game>) => {
    if (!updates || Object.keys(updates).length === 0) {
      return alert('Nenhuma alteração para salvar.');
    }

    const prev = games;

    setGames((current) =>
      current.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );

    try {
      const res = await api.patch(`/games/${id}`, updates);

      if (res.status >= 200 && res.status < 300) {
        const saved: Game = res.data;

        setGames((current) =>
          current.map((item) => (item.id === id ? saved : item))
        );

        alert('Jogo atualizado com sucesso!');
      } else {
        setGames(prev);
        alert('Falha ao atualizar o jogo.');
      }
    } catch (error: any) {
      setGames(prev);
      const msg =
        error.response?.data?.message || error.message || 'Erro desconhecido';
      alert('Erro ao atualizar: ' + msg);
    }
  };

  return {
    game,
    setGame,
    games,
    setGames,
    onAddGameSubmit,
    onDeleteGame,
    onEditGame,
  };
}
