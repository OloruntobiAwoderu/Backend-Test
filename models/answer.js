const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const answerSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, 'answer must have a description']
    },

    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'question'
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('answer', answerSchema);
