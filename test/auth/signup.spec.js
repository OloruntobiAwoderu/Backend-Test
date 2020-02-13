/* eslint-disable no-undef */
const mongoose = require('mongoose');
const request = require('supertest');

const UserModel = require('../../models/user');
const server = require('../../api/routes/index');

const userData = {
  firstname: 'Oloruntobi',
  email: 'Male@gmail.com',
  password: '123456789',
  lastname: 'awoderu'
};
const { connectDB, disconnectDB } = require('../db');

describe('User Model Test', () => {
  beforeAll(done => {
    connectDB();
    return done();
  });
  describe('', () => {
    it('create & save user successfully', async done => {
      try {
        const savedUser = await UserModel.create(userData);
        // eslint-disable-next-line no-underscore-dangle
        expect(savedUser._id).toBeDefined();
        expect(savedUser.email).toBe(userData.email);
      } catch (error) {
        expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
      } finally {
        done();
      }
    });

    it('create user without required field should failed', async done => {
      const userWithoutRequiredField = new UserModel({ firstname: 'TekLoon' });
      let err;
      try {
        const savedUserWithoutRequiredField = await userWithoutRequiredField.save();
        err = savedUserWithoutRequiredField;
      } catch (error) {
        err = error;
      }
      expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
      expect(err.errors.email).toBeDefined();
      done();
    });
  });

  afterAll(() => {
    return disconnectDB();
  });
});
