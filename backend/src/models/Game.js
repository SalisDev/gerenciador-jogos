import mongoose from 'mongoose';

const objectiveSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
});

const gameSchema = new mongoose.Schema(
  {
    // Novo ID que vem do front
    id: { type: String, required: true, unique: true },

    title: { type: String, required: true },
    genre: { type: String },
    platform: { type: String },
    status: {
      type: String,
      enum: ['jogando', 'zerado', 'wishlist'],
      default: 'jogando',
    },
    objetivos: [objectiveSchema],

    // Nova capa do jogo em base64
    image: { type: String },
  },
  { timestamps: true }
);

export const Game = mongoose.model('Game', gameSchema);
