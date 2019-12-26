const task = require('../models/task');
const tasksService = require('./tasksService');

// Mock sequelize
jest.mock('../models/task', () => () => {
  const SequelizeMock = require('sequelize-mock');
  const dbMock = new SequelizeMock();
  return dbMock.define('Task', {
      title: 'Happy new year!',
      dueDate: '2020-01-01 00:00'
    }
  );
});

describe('tasksService', () => {
  describe('list', () => {
    it('Should return tasks', async () => {
      const tasks = await tasksService.list();
      expect(tasks).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            title: 'Happy new year!',
            dueDate: '2020-01-01 00:00'
          }),
        ]));
    });
  });
});
