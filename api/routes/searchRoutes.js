const express = require('express');
const controller = require('../controllers/search');

const userValidators = require('../validation/userValidation');

const router = express.Router();
router.post('/', controller.searchUsers);
router.post('/questions', controller.searchQuestions);

module.exports = router;
