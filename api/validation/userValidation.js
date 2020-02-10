const Validator = require('validatorjs');
const models = require('../../models/index');

const { errorHelper } = require('../helpers/response');
const { decodeToken } = require('../helpers/jwt');

module.exports = {
  async validateUserOnSignup(req, res, next) {
    const validator = new Validator(req.body, {
      password: 'required|min:8',
      email: 'required|email',
      firstname: 'required',
      lastname: 'required'
    });

    if (validator.fails()) {
      return res.status(400).json({
        errors: validator.errors.all()
      });
    }
    try {
      const user = await models.User.findOne({ email: req.body.email }).exec();
      if (!user) {
        return next();
      }
      return errorHelper(
        res,
        400,
        'User already registered with email provided'
      );
    } catch (error) {
      return next({ message: 'Error validating user signup' });
    }
  },
  loginCredentials(req, res, next) {
    const validator = new Validator(req.body, {
      password: 'required|min:8',
      email: 'required|email'
    });

    if (validator.fails()) {
      return errorHelper(res, 400, validator.errors.all());
    }
    return next();
  },

  async validateUser(req, res, next) {
    const { authorization } = req.headers;
    if (!authorization) {
      return errorHelper(res, 401, 'token required');
    }
    const user = await decodeToken(authorization);
    if (!user) {
      return errorHelper(res, 401, 'invalid user token');
    }
    req.user = user;
    return next();
  }
};
