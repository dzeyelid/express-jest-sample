const task = require('../models/task');
const models = require('../models');
const tasksService = require('./tasksService');

// Create mock base of sequelize
jest.mock('../models/task', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  return dbMock.define('Task', {  // Default data
      title: 'Many days have left in this year yet.',
      dueDate: '2019-11-01 00:00'
    }
  );
});

describe('tasksService', () => {
  describe('list', () => {
    it('Should return tasks', async () => {
      // Mock task model
      const data = [
        {
          title: 'A new year comes soon.',
          dueDate: '2019-12-31 23:59',
        },
        {
          title: 'Happy new year!',
          dueDate: '2020-01-01 00:00'
        }
      ];

      models.Task.$queueResult([
        models.Task.build(data[0]),
        models.Task.build(data[1]),
      ]);

      const tasks = await tasksService.list();
      expect(tasks).toEqual(
        expect.arrayContaining([
          expect.objectContaining(data[0]),
          expect.objectContaining(data[1]),
        ]));
    });
  });
});
