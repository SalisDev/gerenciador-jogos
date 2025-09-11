import express from 'express';
import { createGame, getGames } from '../controllers/gameController.js';

const router = express.Router();

router.post('/', createGame); // Criar jogo
router.get('/', getGames); // Listar jogos
router.get('/:id', getGameById); // Obter jogo por ID
router.put('/:id', updateGame); // Atualizar jogo por ID
router.delete('/:id', deleteGame); // Deletar jogo por ID
router.post('/:id/objectives', addObjective); // Adicionar objetivo a um jogo
router.delete('/:id/objectives/:objectiveId', removeObjective); // Remover objetivo de um jogo

export default router;
