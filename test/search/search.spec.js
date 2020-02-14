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

  describe('/search/question', () => {
    it('should return question', async done => {
      try {
        const userInfo = await getUser();
        const token = await generateToken(userInfo);
        const response = await request(server)
          .post('/questions/ask')
          .set('authorization', token)
          .send({
            description: 'Hi there, lets play'
          });

        const response2 = await request(server)
          .get(`/search/questions?searchQuery=Hi&filter=description`)
          .set('authorization', token);

        expect(response2.status).toEqual(200);
      } catch (error) {
        expect(error).toHaveProperty('status', 500);
      } finally {
        done();
      }
    });
  });
  describe('/search/users', () => {
    it('should return question', async done => {
      try {
        const userInfo = await getUser();
        const token = await generateToken(userInfo);

        const response2 = await request(server)
          .get(
            `/search/questions?searchQuery=${userInfo.firstname}&filter=firstname`
          )
          .set('authorization', token);

        expect(response2.status).toEqual(200);
      } catch (error) {
        expect(error).toHaveProperty('status', 500);
      } finally {
        done();
      }
    });
  });
});
