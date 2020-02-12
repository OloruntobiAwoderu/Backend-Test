const express = require('express');
const controller = require('../controllers/search');

const router = express.Router();
router.post('/', controller.searchUsers);
router.post('/questions', controller.searchQuestions);
router.post('/answers', controller.searchAnswers);

module.exports = router;
