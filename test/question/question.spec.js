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

  describe('/questions', () => {
    it('should return all questions', async done => {
      try {
        const response = await request(server).get('/questions');

        expect(response.status).toEqual(200);
      } catch (error) {
        expect(error).toHaveProperty('status', 500);
      } finally {
        done();
      }
    });
  });
  describe('/questions/ask', () => {
    it('should not ask question without description body', async done => {
      try {
        const response = await request(server).post('/questions/ask');

        expect(response.status).toEqual(400);
      } catch (error) {
        expect(error).toHaveProperty('status', 500);
      } finally {
        done();
      }
    });
    it('should not ask question without Token', async done => {
      try {
        const response = await request(server)
          .post('/questions/ask')
          .send({
            description: 'Hi there'
          });

        expect(response.status).toEqual(401);
        expect(response.text).toBe('"token required"');
      } catch (error) {
        expect(error).toHaveProperty('status', 500);
      } finally {
        done();
      }
    });
    it('should Return success', async done => {
      try {
        const userInfo = await getUser();
        const token = await generateToken(userInfo);
        const response = await request(server)
          .post('/questions/ask')
          .set('authorization', token)
          .send({
            description: 'Hi there'
          });

        expect(response.status).toEqual(200);
      } catch (error) {
        expect(error).toHaveProperty('status', 500);
      } finally {
        done();
      }
    });

    it('should upvote', async done => {
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
          .post(`/questions/upvote/${response.body._id}`)
          .set('authorization', token);

        expect(response2.status).toEqual(200);
      } catch (error) {
        expect(error).toHaveProperty('status', 500);
      } finally {
        done();
      }
    });
    it('should downvote', async done => {
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
          .post(`/questions/downvote/${response.body._id}`)
          .set('authorization', token);

        expect(response2.status).toEqual(400);
      } catch (error) {
        expect(error).toHaveProperty('status', 500);
      } finally {
        done();
      }
    });
  });
  describe('/questions/answer/:id', () => {
    it('should answer the question', async done => {
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
          .post(`/questions/answer/${response.body._id}`)
          .set('authorization', token)
          .send({
            description: "Here's my answer"
          });

        expect(response2.status).toEqual(200);
      } catch (error) {
        expect(error).toHaveProperty('status', 500);
      } finally {
        done();
      }
    });
  });
});
