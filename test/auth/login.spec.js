/* eslint-disable no-undef */
const request = require('supertest');
const UserModel = require('../../models/user');
const server = require('../../api/routes/index');
const {
  connectDB,
  cleanDB,

  createUser,
  disconnectDB
} = require('../db');

const testUser = {
  email: 'test@artfinder.com',
  password: '12345678'
};

const userData = {
  email: 'johndoe@gmail.com',
  password: '123456789'
};

describe('#Auth', () => {
  beforeAll(() => {
    return connectDB();
  });

  beforeEach(() => {
    return createUser();
  });

  afterEach(() => {
    return cleanDB();
  });

  afterAll(() => {
    return disconnectDB();
  });

  describe('/login', () => {
    it('should return a 400 since body is not provided', async done => {
      try {
        const errorUser = await request(server).post('/users/login');
        expect(errorUser.status).toEqual(400);
      } catch (error) {
        expect(error).toBe(error);
      } finally {
        done();
      }
    });

    it('should return a 401 if user dont exists', async done => {
      try {
        const invalidUser = await request(server)
          .post('/users/login')
          .send(testUser);

        expect(invalidUser.status).toEqual(401);
        expect(invalidUser.body).toBe('Invalid credentials');
      } catch (error) {
        expect(error).toHaveProperty('status', 500);
      } finally {
        done();
      }
    });

    it('should return a 200 if user exists', async done => {
      try {
        const user = await request(server)
          .post('/users/login')
          .send(userData);
        expect(user.status).toBe(200);

        done();
      } catch (error) {
        expect(error).toHaveProperty('status', 500);
      } finally {
        done();
      }
    });
  });
});
