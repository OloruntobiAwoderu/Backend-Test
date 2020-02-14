const Validator = require('validatorjs');
const models = require('../../models/index');

const { errorHelper } = require('../helpers/response');

module.exports = {
  questionAndAnswerValidation(req, res, next) {
    const validator = new Validator(req.body, {
      description: 'required'
    });

    if (validator.fails()) {
      return errorHelper(res, 400, validator.errors.all());
    }
    return next();
  },
  async validateQuestion(req, res, next) {
    try {
      const { id } = req.params;
      const question = await models.Question.findOne({ _id: id });

      if (!question) {
        return errorHelper(res, 404, 'Question does not exist');
      }
      return next();
    } catch (error) {
      return next({ message: 'Error validating question' });
    }
  }
};
