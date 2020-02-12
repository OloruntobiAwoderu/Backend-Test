const models = require('../../models');
const { successResponse, errorHelper } = require('../helpers/response');

module.exports = {
  async searchUsers(req, res) {
    try {
      const { searchQuery } = req.query;
      const { filter, sortBy, page, pagination } = req.query;
      let { sortType } = req.query;
      sortType = sortType === 'asc' ? 1 : -1;
      const user = await models.User.find({
        [filter]: { $regex: searchQuery, $options: 'i' }
      })
        .sort({ [sortBy]: sortType })
        .skip((page - 1) * pagination)
        .limit(pagination);
      const totalCount = await models.User.countDocuments({});
      successResponse(res, 200, {
        totalCount,
        page,
        itemsInPage: pagination,
        user
      });
    } catch (error) {
      errorHelper(res, 500, error);
    }
  },
  async searchQuestions(req, res) {
    try {
      const { searchQuery } = req.query;
      const { filter, sortBy, page, pagination } = req.query;

      let { sortType } = req.query;
      sortType = sortType === 'asc' ? 1 : -1;
      const questions = await models.Question.find({
        [filter]: { $regex: searchQuery, $options: 'i' }
      })
        .sort({ [sortBy]: sortType })
        .skip((page - 1) * pagination)
        .limit(pagination);
      const totalCount = await models.Question.countDocuments({});
      return successResponse(res, 200, {
        totalCount,
        page,
        itemsInPage: pagination,
        questions
      });
    } catch (error) {
      errorHelper(res, 500, error);
    }
  },
  async searchAnswers(req, res) {
    try {
      const { searchQuery } = req.query;
      models.Question.find({}).then(quest => {
        console.log(quest, 1);
        quest.map(question => {
          console.log(question.answers, 2);

          let answersArray = [];
          if (question.answers.includes(searchQuery)) {
            answersArray.push(question.answers);
          } else {
            return 'No answers found';
          }
          console.log(answersArray, 3);
          return answersArray;
        });
      });
    } catch (error) {
      return errorHelper(res, 500, error);
    }
  }
};
