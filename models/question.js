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
    voters: {
      type: [mongoose.Schema.Types.ObjectId]
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'question must have a User id']
    },
    answers: [
      {
        description: {
          type: String
        },
        userId: {
          type: mongoose.Schema.Types.ObjectId
        }
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('question', questionSchema);
