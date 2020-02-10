/* eslint-disable no-undef */
require('dotenv').config();

module.exports = {
  TEST_DB: process.env.TEST_DB,
  DATA_DB: process.env.MONGODB_URI,
  JWTSecret: process.env.JWT_Secret
};
