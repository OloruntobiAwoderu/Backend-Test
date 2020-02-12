const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'question'
    },
    subscribers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('answer', subscriptionSchema);
