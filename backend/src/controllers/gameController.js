import { Game } from '../models/Game.js';

// Função auxiliar para verificar se o jogo existe
const checkGameExists = (game, res) => {
  if (!game) {
    res.status(404).json({ message: 'Jogo não encontrado' });
    return false;
  }
  return true;
};

// Criar um jogo
export const createGame = async (req, res) => {
  try {
    const { id, titulo, genero, plataforma, status, objetivos, image } =
      req.body;

    // Cria um novo jogo com o id gerado no front e a imagem em base64
    const game = new Game({
      id,
      titulo,
      genero,
      plataforma,
      status,
      objetivos,
      image,
    });

    await game.save();
    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Listar todos os jogos
export const getGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obter um jogo por ID (id gerado no front, não o _id do Mongo)
export const getGameById = async (req, res) => {
  try {
    const game = await Game.findOne({ id: req.params.id }); // <--- busca pelo id do front
    if (!checkGameExists(game, res)) return;
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar um jogo por ID (id gerado no front)
export const updateGame = async (req, res) => {
  try {
    const game = await Game.findOneAndUpdate(
      { id: req.params.id }, // <--- busca pelo id do front
      req.body,
      { new: true } // retorna o objeto já atualizado
    );
    if (!checkGameExists(game, res)) return;
    res.json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Deletar um jogo por ID (id gerado no front)
export const deleteGame = async (req, res) => {
  try {
    const game = await Game.findOneAndDelete({ id: req.params.id }); // <--- busca pelo id do front
    if (!checkGameExists(game, res)) return;
    res.json({ message: 'Jogo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
