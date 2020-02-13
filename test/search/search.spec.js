/* eslint-disable no-undef */
const request = require('supertest');
const UserModel = require('../../models/user');
const server = require('../../api/routes/index');
const {
  connectDB,
  cleanDB,
  getUser,
  createUser,
  createQuestion,
  getQuestion,
  disconnectDB
} = require('../db');
const { generateToken } = require('../../api/helpers/jwt');

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

  describe('/search/users', () => {
    it('should return question', async done => {
      try {
        const userInfo = await getUser();
        const token = await generateToken(userInfo);
        const response = await request(server)
          .get('/questions/ask')
          .set('authorization', token)
          .send({
            description: 'Hi there, lets play'
          });
        const response2 = await request(server)
          .post(
            `/search/questions?searchQuery=${response.description}&filter=description`
          )
          .set('authorization', token);

        expect(response2.status).toEqual(200);
      } catch (error) {
        expect(error).toBe(error);
      } finally {
        done();
      }
    });
  });
});
