const express = require('express');
const controller = require('../controllers/search');
const userValidators = require('../validation/userValidation');

const router = express.Router();
router.get('/', [userValidators.validateUser], controller.searchUsers);
router.get('/questions', controller.searchQuestions);

module.exports = router;
