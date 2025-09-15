// Importa os hooks do React Query:
// - useQuery: para buscar dados (GET)
// - useMutation: para criar/editar/deletar dados (POST/PUT/DELETE)
// - useQueryClient: para manipular o cache local do React Query
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Importa o Axios configurado (com baseURL apontando para o backend)
import { api } from '../services/api';

// Define a estrutura (interface) que cada "jogo" deve seguir
export interface Game {
  _id: string; // ID gerado pelo MongoDB
  titulo: string; // Nome do jogo
  genero?: string; // Gênero (opcional)
  plataforma?: string; // Plataforma (opcional)
  status: 'jogando' | 'zerado' | 'wishlist'; // Estado do jogo
}

// Hook personalizado que gerencia os jogos
const useGames = () => {
  const queryClient = useQueryClient(); // Permite invalidar e atualizar cache

  // ---- BUSCAR JOGOS ----
  // useQuery faz uma requisição GET para buscar todos os jogos
  const { data: games, isLoading } = useQuery<Game[]>({
    queryKey: ['games'], // Chave única para armazenar no cache
    queryFn: async () => {
      const res = await api.get('/games'); // Chama GET /games no backend
      return res.data; // Retorna a lista de jogos
    },
  });

  // ---- ADICIONAR JOGO ----
  // useMutation faz uma requisição POST para criar um novo jogo
  const addGame = useMutation({
    mutationFn: async (newGame: Omit<Game, '_id'>) => {
      // Omit<Game, '_id'> significa: usa todos os campos do Game, menos o _id
      const res = await api.post('/games', newGame); // POST /games
      return res.data;
    },
    onSuccess: () => {
      // Quando o POST dá certo, invalida o cache de 'games'
      // Atualiza a lista após adicionar
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });

  // ---- DELETAR JOGO ----
  // useMutation também é usado para DELETE
  const deleteGame = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/games/${id}`); // DELETE /games/:id
    },
    onSuccess: () => {
      // Atualiza a lista após deletar
      queryClient.invalidateQueries({ queryKey: ['games'] });
    },
  });

  // Retorna os dados e as funções para quem usar esse hook
  return { games, isLoading, addGame, deleteGame };
};

// Exporta como padrão, assim quem importar não precisa usar chaves
export default useGames;
