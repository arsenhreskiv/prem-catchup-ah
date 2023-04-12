const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
      type: String,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    userName: String,
    userAvatar: String
  }, {
    timestamps: true
  });

  const matchSchema = new Schema({
    homeTeam: { type: String, required: true },
    scoreOne: {
        type: Number,
        min: 0
    },
    scoreTwo: {
        type: Number,
        min: 0
    },
    awayTeam: { type: String, required: true },
    gameWeek: {
      type: Number,
      min: 0,
    },
    comments: [commentSchema]
  }, {
    
  });

  module.exports = mongoose.model('Match', matchSchema);