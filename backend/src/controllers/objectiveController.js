import { Game } from '../models/Game.js';

// Função auxiliar para verificar se o jogo existe
const checkGameExists = (game, res) => {
  if (!game) {
    res.status(404).json({ message: 'Jogo não encontrado' });
    return false;
  }
  return true;
};

// Adicionar um objetivo a um jogo
export const addObjective = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!checkGameExists(game, res)) return;

    game.objetivos.push(req.body);
    await game.save();

    res.status(201).json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Atualizar um objetivo dentro de um jogo
export const updateObjective = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!checkGameExists(game, res)) return;

    const objective = game.objetivos.id(req.params.objectiveId);
    if (!objective) {
      return res.status(404).json({ message: 'Objetivo não encontrado' });
    }

    objective.set(req.body); // Atualiza os campos enviados
    await game.save();

    res.json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Remover um objetivo de um jogo
export const removeObjective = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!checkGameExists(game, res)) return;

    const objective = game.objetivos.id(req.params.objectiveId);
    if (!objective) {
      return res.status(404).json({ message: 'Objetivo não encontrado' });
    }

    objective.remove();
    await game.save();

    res.json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Marcar um objetivo como concluído
export const completeObjective = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!checkGameExists(game, res)) return;

    const objective = game.objetivos.id(req.params.objectiveId);
    if (!objective) {
      return res.status(404).json({ message: 'Objetivo não encontrado' });
    }

    objective.concluido = true; // precisa existir esse campo no schema
    await game.save();

    res.json(game);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
