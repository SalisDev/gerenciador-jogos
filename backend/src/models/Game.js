import mongoose from 'mongoose';

const objectiveSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, required: true },
});

const gameSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
    genero: { type: String },
    plataforma: { type: String },
    status: {
      type: String,
      enum: ['jogando', 'zerado', 'wishlist'],
      default: 'jogando',
    },
    capa: 
    objetivos: [objectiveSchema],
  },
  { timestamps: true }
);

export const Game = mongoose.model('Game', gameSchema);
