/**
 * Attention:
 *   The code that using sequelize-mock was moved to `e2e-tests/tasks.test.js`.
 *   This test includes samples of using a test database in memory.
 */

const Umzug = require('umzug');
const sequelize_fixtures = require('sequelize-fixtures');
const testUtils = require('../testUtils');
const models = require('../models');
const tasksService = require('./tasksService');

testUtils.extend();

/**
 * Migrate test database
 * References:
 *   - https://github.com/sequelize/umzug
 *   - https://stackoverflow.com/questions/42811710/sequelize-umzug-migrations
 */
const umzug = new Umzug({
  storage: 'sequelize',
  storageOptions: {
    sequelize: models.sequelize,
  },
  migrations: {
    params: [
      models.sequelize.getQueryInterface(),
      models.Sequelize,
    ],
  }
});

beforeAll(async () => {
  await umzug.up();

  // Seed fixtures
  await sequelize_fixtures.loadFile('fixtures/tasks.yaml', models);
});

afterAll(async () => {
  await umzug.down();
});

describe('tasksService', () => {

  describe('list()', () => {
    it('should return tasks', async () => {
      const expected = [
        expect.objectContaining({
          title: 'A new year comes soon.',
          dueDate: expect.toBeSameDate('2019-12-31 23:59'),
        }),
        expect.objectContaining({
          title: 'Happy new year!',
          dueDate: expect.toBeSameDate('2020-01-01 00:00'),
        }),
      ];

      const tasks = await tasksService.list();
      expect(tasks).toEqual(expect.arrayContaining(expected));
    });
  });

  describe('create()', () => {
    it('should fail with empty data', () => {
      expect.assertions(2);
      const data = {};
      return tasksService.create(data).catch(e => {
        expect(e).toBeInstanceOf(models.Sequelize.ValidationError);
        expect(e.message).toEqual(
          expect.stringMatching(/notNull Violation: Task\.title cannot be null/),
          expect.stringMatching(/notNull Violation: Task\.dueDate cannot be null/),
        );
      });
    })
  })
});
