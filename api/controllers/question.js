const models = require('../../models');
const { successResponse, errorHelper } = require('../helpers/response');

module.exports = {
  async askQuestion(req, res) {
    const { user } = req;
    try {
      const question = await models.Question.create({
        ...req.body,
        userId: user._id
      });
      return successResponse(res, 200, question);
    } catch (error) {
      return errorHelper(res, 500, error);
    }
  },
  async getAllQuestions(req, res) {
    try {
      const questions = await models.Question.find({});
      return successResponse(res, 200, questions);
    } catch (error) {
      return errorHelper(res, 500, error);
    }
  },
  async upVoteQuestion(req, res) {
    const { id } = req.params;
    const { user } = req;

    try {
      const question = await models.Question.findOne({
        _id: id,
        voters: { $all: [user._id] }
      });
      if (question === null) {
        const answer = await models.Question.findOneAndUpdate(
          { _id: id },
          { voters: user._id, $inc: { vote: 1 } },
          { new: true }
        );
        return successResponse(res, 200, answer);
      } else {
        return errorHelper(res, 400, 'You have already voted');
      }
    } catch (error) {
      return errorHelper(res, 500, error);
    }
  },
  async downVoteQuestion(req, res) {
    const { id } = req.params;
    const { user } = req;

    try {
      const question = await models.Question.findOne({
        _id: id,
        voters: { $all: [user._id] }
      });
      if (question !== null) {
        const answer = await models.Question.findOneAndUpdate(
          { _id: id },
          { $pull: { voters: user._id }, $inc: { vote: -1 } },
          { new: true }
        );
        return successResponse(res, 200, answer);
      } else {
        return errorHelper(res, 400, 'You have already downvoted');
      }
    } catch (error) {
      return errorHelper(res, 500, error);
    }
  },
  async answerQuestion(req, res) {
    const { id } = req.params;
    const { user } = req;
    const { description } = req.body;
    try {
      const answeredQuestion = await models.Question.findOneAndUpdate(
        { _id: id },
        {
          $push: { answers: [{ description: description, userId: user._id }] }
        },

        { new: true }
      );
      return successResponse(res, 200, answeredQuestion);
    } catch (error) {
      return errorHelper(res, 500, error);
    }
  }
};
