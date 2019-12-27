const request = require('supertest');
const { createApp } = require('../server');
const testUtils = require('../testUtils');
const models = require('../models');

testUtils.extend();

// Create a mock base of Task model
jest.mock('../models/task', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  return dbMock.define('Task');
});

describe('/tasks', () => {

  const app = createApp();

  describe('list', () => {
    it('Should return tasks', async () => {
      // Mock Task model
      const data = [
        {
          title: 'A new year comes soon.',
          dueDate: '2019-12-31 23:59',
        },
        {
          title: 'Happy new year!',
          dueDate: '2020-01-01 00:00'
        },
      ];

      models.Task.$queueResult([
        models.Task.build(data[0]),
        models.Task.build(data[1]),
      ]);

      const expected = [
        expect.objectContaining({
          title: data[0].title,
          dueDate: expect.toBeSameDate(data[0].dueDate),
        }),
        expect.objectContaining({
          title: data[1].title,
          dueDate: expect.toBeSameDate(data[1].dueDate),
        }),
      ];

      // Run
      await request(app)
        .get('/tasks')
        .expect(200)
        .then(res => expect(res.body.data).toEqual(expect.arrayContaining(expected)));
    });
  });

});
