import { Game } from '../models/Game.js'; // Importa o modelo Game do Mongoose

// Função auxiliar para verificar se o jogo existe
const checkGameExists = (game, res) => {
  if (!game) {
    res.status(404).json({ message: 'Jogo não encontrado' }); // Retorna 404 se não existir
    return false;
  }
  return true;
};

// Criar um jogo
export const createGame = async (req, res) => {
  try {
    const game = new Game(req.body); // Cria um novo documento Game com os dados enviados no corpo da requisição
    await game.save(); // Salva o novo jogo no banco de dados
    res.status(201).json(game); // Retorna o jogo criado com status 201 (Created)
  } catch (error) {
    res.status(400).json({ message: error.message }); // Retorna 400 se houver erro (ex.: campos obrigatórios faltando)
  }
};

// Listar todos os jogos
export const getGames = async (req, res) => {
  try {
    const games = await Game.find(); // Busca todos os jogos na coleção 'games'
    res.json(games); // Retorna os jogos encontrados em formato JSON
  } catch (error) {
    res.status(500).json({ message: error.message }); // Retorna 500 em caso de erro inesperado
  }
};

// Obter um jogo por ID
export const getGameById = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id); // Busca um jogo pelo ID passado na URL
    if (!checkGameExists(game, res)) return; // Verifica se o jogo existe, retorna 404 se não
    res.json(game); // Retorna o jogo encontrado
  } catch (error) {
    res.status(500).json({ message: error.message }); // Retorna 500 em caso de erro inesperado
  }
};

// Atualizar um jogo por ID
export const updateGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }); // Atualiza o jogo pelo ID e retorna o documento atualizado
    if (!checkGameExists(game, res)) return; // Verifica se o jogo existe, retorna 404 se não
    res.json(game); // Retorna o jogo atualizado
  } catch (error) {
    res.status(400).json({ message: error.message }); // Retorna 400 em caso de erro (ex.: dados inválidos)
  }
};

// Deletar um jogo por ID
export const deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id); // Remove o jogo pelo ID
    if (!checkGameExists(game, res)) return; // Verifica se o jogo existia, retorna 404 se não
    res.json({ message: 'Jogo deletado com sucesso' }); // Retorna mensagem de sucesso
  } catch (error) {
    res.status(500).json({ message: error.message }); // Retorna 500 em caso de erro inesperado
  }
};

// Adicionar um objetivo a um jogo
export const addObjective = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id); // Busca o jogo pelo ID
    if (!checkGameExists(game, res)) return; // Verifica se o jogo existe, retorna 404 se não
    game.objetivos.push(req.body); // Adiciona o novo objetivo ao array de objetivos do jogo
    await game.save(); // Salva as alterações no banco
    res.status(201).json(game); // Retorna o jogo atualizado com status 201 (Created)
  } catch (error) {
    res.status(400).json({ message: error.message }); // Retorna 400 em caso de erro (ex.: objetivo inválido)
  }
};

// Remover um objetivo de um jogo
export const removeObjective = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id); // Busca o jogo pelo ID
    if (!checkGameExists(game, res)) return; // Verifica se o jogo existe, retorna 404 se não

    const objective = game.objetivos.id(req.params.objectiveId); // Encontra o objetivo pelo ID dentro do array
    if (!objective) {
      return res.status(404).json({ message: 'Objetivo não encontrado' }); // Retorna 404 se o objetivo não existir
    }

    objective.remove(); // Remove o objetivo do array
    await game.save(); // Salva as alterações no banco
    res.json(game); // Retorna o jogo atualizado
  } catch (error) {
    res.status(400).json({ message: error.message }); // Retorna 400 em caso de erro
  }
};
