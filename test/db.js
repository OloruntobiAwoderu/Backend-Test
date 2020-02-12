/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose');
const db = require('../config/db');

const { User, Question, Subscription } = require('../models/index');

mongoose.Promise = global.Promise;

const userData = {
  firstname: 'John',
  lastname: 'doe',
  email: 'johndoe@gmail.com',
  password: '123456789'
};
const cleanDB = async () => {
  // drop all database here
  const deleteUser = await User.deleteMany({});
  const deleteQuestions = await Question.deleteMany({});
  const deleteSubscriptions = await Subscription.deleteMany({});

  return deleteUser && deleteQuestions && deleteSubscriptions;
};

const connectDB = async () => {
  try {
    const connect = await db();
    return connect;
  } catch (error) {
    return console.error(error);
  }
};

const disconnectDB = async () => {
  try {
    const disconnect = await mongoose.disconnect();
    return disconnect;
  } catch (error) {
    return console.error(error);
  }
};

const createUser = () => {
  return User.create(userData);
};

module.exports = {
  connectDB,
  disconnectDB,
  createUser,
  cleanDB
};
