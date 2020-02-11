const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema(
  {
    description: {
      type: String,
      required: [true, 'question must have a description']
    },
    vote: {
      type: Number,
      default: 0
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    answers: [
      {
        answer: {
          type: String
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('question', questionSchema);
