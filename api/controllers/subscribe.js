const models = require('../../models');
const { successResponse, errorHelper } = require('../helpers/response');

module.exports = {
  async subscribeToAQuestion(req, res) {
    try {
      const { id } = req.params;
      const { user } = req;
      const question = await models.Subscription.findOne({ questionId: id });
      if (!question) {
        const isSubscribed = await models.Subscription.create({
          questionId: id,
          subscribers: user._id
        });
        if (isSubscribed)
          successResponse(res, 200, 'You are now subscribed to this question');
      }
      const existingQuestion = await models.Question.updateOne(
        { questionId: id },
        { $push: { subscribers: user._id } },
        { runValidators: true }
      );
      if (existingQuestion)
        successResponse(res, 200, 'You are now subscribed to this question');
    } catch (error) {
      errorHelper(res, 500, error);
    }
  }
};
