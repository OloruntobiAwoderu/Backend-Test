const Validator = require('validatorjs');

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
  }
};
