const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    content: {
      type: String,
      //required: true
    },
    // rating: {
    //   type: Number,
    //   min: 1,
    //   max: 5,
    //   default: 5
    // },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      //required: true
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
    //timestamps: true
  });

  module.exports = mongoose.model('Match', matchSchema);