const express = require('express');
const controller = require('../controllers/question');
const questionvalidators = require('../validation/questionValidation');
const userValidators = require('../validation/userValidation');

const router = express.Router();

router.get('/', controller.getAllQuestions);
router.post(
  '/upvote/:id',

  [userValidators.validateUser],
  [questionvalidators.validateQuestion],
  controller.upVoteQuestion
);
router.post(
  '/downvote/:id',

  [userValidators.validateUser],
  [questionvalidators.validateQuestion],
  controller.downVoteQuestion
);
router.post(
  '/answer/:id',
  [questionvalidators.questionAndAnswerValidation],
  [questionvalidators.validateQuestion],
  [userValidators.validateUser],
  controller.answerQuestion
);
router.post(
  '/ask',
  [questionvalidators.questionAndAnswerValidation],
  [userValidators.validateUser],
  controller.askQuestion
);

module.exports = router;
