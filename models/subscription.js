const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId
    },
    subscribers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        unique: true
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model('subscription', subscriptionSchema);
