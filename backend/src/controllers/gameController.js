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
    const game = new Game(req.body);
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

// Obter um jogo por ID
export const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!checkGameExists(game, res)) return;
    res.json(game);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Atualizar um jogo por ID
export const updateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!checkGameExists(game, res)) return;
    res.json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Deletar um jogo por ID
export const deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
    if (!checkGameExists(game, res)) return;
    res.json({ message: 'Jogo deletado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
