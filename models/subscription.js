const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId
    },
    subscribers: [mongoose.Schema.Types.ObjectId]
  },
  { timestamps: true }
);

module.exports = mongoose.model('answer', subscriptionSchema);
