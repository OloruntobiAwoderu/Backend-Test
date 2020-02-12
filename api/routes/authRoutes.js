const express = require('express');
const controller = require('../controllers/user');
const userValidators = require('../validation/userValidation');

const router = express.Router();

router.post(
  '/register',
  [userValidators.validateUserOnSignup],
  controller.createUser
);

router.post('/login', [userValidators.loginCredentials], controller.loginUser);

module.exports = router;
